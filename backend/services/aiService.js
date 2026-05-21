import { aiConfig, getOpenAIClient } from "../config/ai.js";

const systemPrompt =
  "You are an expert Indian campus placement coach. Return concise, practical JSON only, with no markdown fences.";

const hasUsableApiKey = () => {
  const key = process.env.OPENAI_API_KEY?.trim();
  return key && key.startsWith("sk-") && !key.includes("your_") && !key.includes("optional");
};

const callJsonAI = async (prompt, fallback) => {
  if (!hasUsableApiKey()) return fallback;
  const openai = getOpenAIClient();
  if (!openai) return fallback;

  try {
    const response = await openai.chat.completions.create({
      model: aiConfig.model,
      temperature: aiConfig.temperature,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ]
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    return fallback;
  }
};

export const generateInterviewQuestions = async ({ type, targetRole, skills = [], weakTopics = [], resumeText = "" }) =>
  callJsonAI(
    `Generate 8 ${type} placement interview questions for target role ${targetRole}.
Skills: ${skills.join(", ")}. Weak topics: ${weakTopics.join(", ")}.
Resume context: ${resumeText.slice(0, 2500)}.
Return {"questions":["..."],"focusAreas":["..."]}.`,
    {
      questions: [
        `Explain one project that best proves your readiness for ${targetRole || "your target role"}.`,
        "Describe a difficult technical problem you solved and the tradeoffs you considered.",
        "What are your weakest placement topics and how are you improving them?",
        "Walk through your resume in two minutes.",
        "Explain a core data structure with a real use case.",
        "How would you debug a production issue under time pressure?",
        "Why should this company hire you?",
        "Describe a time you learned a new skill quickly."
      ],
      focusAreas: weakTopics.length ? weakTopics : ["communication", "problem solving", "resume clarity"]
    }
  );

export const evaluateAnswer = async ({ question, answer, targetRole }) =>
  callJsonAI(
    `Evaluate this placement interview answer for ${targetRole}.
Question: ${question}
Answer: ${answer}
Return {"score":0-100,"feedback":"...","suggestions":["..."]}.`,
    {
      score: Math.min(85, Math.max(45, answer?.length || 0)),
      feedback: "Answer captured the basic idea. Add clearer structure, measurable outcomes, and role-specific vocabulary.",
      suggestions: ["Use STAR format", "Add quantifiable impact", "Close with what you learned"]
    }
  );

export const analyzeResume = async ({ resumeText = "", targetRole = "", skills = [] }) =>
  callJsonAI(
    `Analyze this resume for campus placements.
Target role: ${targetRole}. Skills: ${skills.join(", ")}.
Resume text/link/notes: ${resumeText.slice(0, 5000)}.
Return {"score":0-100,"summary":"...","strengths":["..."],"gaps":["..."],"improvements":["..."],"resumeQuestions":["..."]}.`,
    {
      score: 68,
      summary: "Resume is usable but should show stronger impact, clearer project outcomes, and better alignment with the target role.",
      strengths: ["Relevant technical profile", "Project experience"],
      gaps: ["Metrics are limited", "Role alignment can improve"],
      improvements: ["Add achievement metrics", "Prioritize placement-relevant projects", "Tighten summary section"],
      resumeQuestions: ["Which project had the most technical depth?", "What measurable result did your work create?"]
    }
  );

export const generateImprovementPlan = async ({ profile, analytics }) =>
  callJsonAI(
    `Create a 7-day placement improvement plan.
Profile: ${JSON.stringify(profile)}.
Analytics: ${JSON.stringify(analytics)}.
Return {"plan":[{"day":"Day 1","tasks":["..."]}],"priorityTopics":["..."]}.`,
    {
      plan: [
        { day: "Day 1", tasks: ["Revise resume headline", "Solve 3 array problems"] },
        { day: "Day 2", tasks: ["Practice HR self-introduction", "Review DBMS joins and indexes"] }
      ],
      priorityTopics: profile?.weakTopics || ["DSA", "DBMS", "communication"]
    }
  );

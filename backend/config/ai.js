import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

export const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
};

export const aiConfig = {
  model: process.env.OPENAI_MODEL || "gpt-4o-mini",
  temperature: 0.4
};

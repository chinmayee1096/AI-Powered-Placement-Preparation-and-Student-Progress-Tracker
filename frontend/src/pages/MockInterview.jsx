import { Bot, Send } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import EmptyState from "../components/EmptyState.jsx";
import Loader from "../components/Loader.jsx";

export default function MockInterview() {
  const [type, setType] = useState("technical");
  const [interviews, setInterviews] = useState([]);
  const [active, setActive] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);

  const load = () => api.get("/interviews").then(({ data }) => setInterviews(data.data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const generate = async () => {
    setWorking(true);
    try {
      const { data } = await api.post("/interviews/generate", { type });
      setActive(data.data);
      load();
    } finally {
      setWorking(false);
    }
  };

  const submit = async () => {
    const payload = active.questions.map((question) => ({ question, answer: answers[question] || "" }));
    const { data } = await api.post(`/interviews/${active._id}/submit`, { answers: payload });
    setActive(data.data);
    load();
  };

  if (loading) return <Loader label="Loading interviews..." />;

  return (
    <div className="stack">
      <div className="page-heading">
        <div><h1>Interview Practice</h1><p>Generate AI questions and receive structured feedback.</p></div>
        <div className="toolbar">
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="technical">Technical</option><option value="aptitude">Aptitude</option><option value="coding">Coding</option><option value="hr">HR</option><option value="resume">Resume</option>
          </select>
          <button className="primary-button" disabled={working} onClick={generate}><Bot size={18} />{working ? "Generating..." : "Generate"}</button>
        </div>
      </div>
      {active ? (
        <section className="panel">
          <h2>{active.type} Interview</h2>
          {active.questions.map((question) => (
            <label className="question-block" key={question}>
              <span>{question}</span>
              <textarea value={answers[question] || ""} onChange={(event) => setAnswers({ ...answers, [question]: event.target.value })} />
            </label>
          ))}
          <button className="primary-button" onClick={submit}><Send size={18} />Submit answers</button>
          {active.status === "evaluated" && <div className="success-banner">Score: {active.score}% - {active.overallFeedback}</div>}
        </section>
      ) : (
        <EmptyState title="No active interview" message="Generate a mock interview to start practicing." />
      )}
      <section className="panel">
        <h2>Recent Interviews</h2>
        <div className="task-list">
          {interviews.map((item) => (
            <article className="task-item" key={item._id}>
              <strong>{item.type}</strong><span>{new Date(item.createdAt).toLocaleString()}</span><span className="pill">{item.status}</span><span>{item.score || 0}%</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

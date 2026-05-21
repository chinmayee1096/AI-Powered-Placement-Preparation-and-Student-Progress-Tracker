import { useEffect, useState } from "react";
import api from "../api/axios.js";
import ConsistencyChart from "../charts/ConsistencyChart.jsx";
import ProgressChart from "../charts/ProgressChart.jsx";
import ReadinessChart from "../charts/ReadinessChart.jsx";
import Loader from "../components/Loader.jsx";

export default function StudentDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/analytics/student")
      .then(({ data }) => setAnalytics(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Preparing dashboard..." />;

  return (
    <div className="stack">
      <div className="page-heading">
        <div>
          <h1>Student Dashboard</h1>
          <p>Readiness, practice, and consistency in one place.</p>
        </div>
      </div>
      <div className="metric-grid">
        <Metric title="Task Completion" value={`${analytics.taskCompletion}%`} />
        <Metric title="Interview Average" value={`${analytics.averageInterviewScore}%`} />
        <Metric title="Resume Score" value={`${analytics.resumeScore}%`} />
        <Metric title="Completed Tasks" value={`${analytics.completedTasks}/${analytics.totalTasks}`} />
      </div>
      <div className="dashboard-grid">
        <ReadinessChart score={analytics.readinessScore} />
        <ConsistencyChart data={analytics.consistency} />
        <ProgressChart data={analytics.consistency} />
      </div>
      <section className="panel">
        <h2>Weak Topics</h2>
        <div className="pill-row">
          {(analytics.weakTopics || []).map((topic) => <span className="pill danger" key={topic}>{topic}</span>)}
        </div>
      </section>
    </div>
  );
}

function Metric({ title, value }) {
  return <article className="metric-card"><span>{title}</span><strong>{value}</strong></article>;
}

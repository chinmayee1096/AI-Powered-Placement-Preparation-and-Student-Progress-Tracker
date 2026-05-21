import { useEffect, useState } from "react";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/analytics/platform").then(({ data }) => setAnalytics(data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading platform analytics..." />;

  return (
    <div className="stack">
      <div className="page-heading"><h1>Admin Dashboard</h1><p>Platform adoption, preparation health, and system overview.</p></div>
      <div className="metric-grid">
        <Metric title="Total Users" value={analytics.totalUsers} />
        <Metric title="Active Users" value={analytics.activeUsers} />
        <Metric title="Students" value={analytics.totalStudents} />
        <Metric title="Avg Readiness" value={`${analytics.averageReadiness}%`} />
        <Metric title="Avg Resume Score" value={`${analytics.averageResumeScore}%`} />
        <Metric title="Interviews Taken" value={analytics.interviewsTaken} />
      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return <article className="metric-card"><span>{title}</span><strong>{value}</strong></article>;
}

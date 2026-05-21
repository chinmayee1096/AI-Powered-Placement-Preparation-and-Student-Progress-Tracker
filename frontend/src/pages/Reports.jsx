import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";

export default function Reports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/reports/weekly").then(({ data }) => setReport(data.data)).finally(() => setLoading(false));
  }, []);

  const download = () => {
    api.get("/reports/weekly/pdf", { responseType: "blob" }).then((response) => {
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "weekly-placement-report.pdf";
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  if (loading) return <Loader label="Building weekly report..." />;

  return (
    <div className="stack">
      <div className="page-heading">
        <div><h1>Reports</h1><p>Weekly placement readiness summary and mentor notes.</p></div>
        <button className="primary-button" onClick={download}><Download size={18} />PDF report</button>
      </div>
      <section className="panel report-panel">
        <h2>Weekly Summary</h2>
        <p>{report.summary}</p>
        <div className="metric-grid">
          <Metric title="Readiness" value={`${report.analytics.readinessScore}%`} />
          <Metric title="Task Completion" value={`${report.analytics.taskCompletion}%`} />
          <Metric title="Interview Avg" value={`${report.analytics.averageInterviewScore}%`} />
          <Metric title="Resume" value={`${report.analytics.resumeScore}%`} />
        </div>
      </section>
    </div>
  );
}

function Metric({ title, value }) {
  return <article className="metric-card"><span>{title}</span><strong>{value}</strong></article>;
}

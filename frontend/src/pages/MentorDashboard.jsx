import { useEffect, useState } from "react";
import api from "../api/axios.js";
import EmptyState from "../components/EmptyState.jsx";
import Loader from "../components/Loader.jsx";

export default function MentorDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/students").then(({ data }) => setStudents(data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading students..." />;

  return (
    <div className="stack">
      <div className="page-heading"><h1>Mentor Dashboard</h1><p>Monitor student readiness and review progress.</p></div>
      <section className="panel">
        <h2>Assigned Students</h2>
        {!students.length ? <EmptyState title="No students found" message="Students appear here after registration." /> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Name</th><th>Department</th><th>Target Role</th><th>Readiness</th><th>Resume</th></tr></thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.userId?.name}</td>
                    <td>{student.department}</td>
                    <td>{student.targetRole || "Not set"}</td>
                    <td>{student.readinessScore}%</td>
                    <td>{student.resumeScore}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

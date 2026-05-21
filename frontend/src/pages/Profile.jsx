import { Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/students/profile").then(({ data }) => setProfile(data.data)).finally(() => setLoading(false));
  }, []);

  const update = (event) => setProfile({ ...profile, [event.target.name]: event.target.value });

  const save = async (event) => {
    event.preventDefault();
    const { data } = await api.put("/students/profile", {
      ...profile,
      skills: String(profile.skills || "").split(",").map((item) => item.trim()).filter(Boolean),
      weakTopics: String(profile.weakTopics || "").split(",").map((item) => item.trim()).filter(Boolean),
      targetCompanies: String(profile.targetCompanies || "").split(",").map((item) => item.trim()).filter(Boolean)
    });
    setProfile(data.data);
    setMessage("Profile saved.");
  };

  const analyze = async () => {
    const { data } = await api.post("/students/resume/analyze", { resumeText });
    setProfile(data.profile);
    setMessage(`AI resume score: ${data.data.score}`);
  };

  if (loading) return <Loader label="Loading profile..." />;

  return (
    <div className="stack">
      <div className="page-heading"><h1>Profile</h1><p>Keep your placement profile aligned with your target role.</p></div>
      {message && <div className="success-banner">{message}</div>}
      <form className="grid-form panel" onSubmit={save}>
        <label>Department<input name="department" value={profile.department || ""} onChange={update} /></label>
        <label>Semester<input name="semester" type="number" value={profile.semester || ""} onChange={update} /></label>
        <label>Target Role<input name="targetRole" value={profile.targetRole || ""} onChange={update} /></label>
        <label>Readiness Score<input disabled value={`${profile.readinessScore || 0}%`} /></label>
        <label className="span-2">Target Companies<input name="targetCompanies" value={(profile.targetCompanies || []).join(", ")} onChange={update} /></label>
        <label className="span-2">Skills<input name="skills" value={(profile.skills || []).join(", ")} onChange={update} /></label>
        <label className="span-2">Weak Topics<input name="weakTopics" value={(profile.weakTopics || []).join(", ")} onChange={update} /></label>
        <label>Resume Link<input name="resumeLink" value={profile.resumeLink || ""} onChange={update} /></label>
        <label>GitHub<input name="githubLink" value={profile.githubLink || ""} onChange={update} /></label>
        <label>LinkedIn<input name="linkedinLink" value={profile.linkedinLink || ""} onChange={update} /></label>
        <button className="primary-button">Save profile</button>
      </form>
      <section className="panel">
        <h2>AI Resume Analysis</h2>
        <textarea className="large-textarea" placeholder="Paste resume text, extracted content, or key resume bullets..." value={resumeText} onChange={(event) => setResumeText(event.target.value)} />
        <button className="primary-button" onClick={analyze}><Wand2 size={18} />Analyze resume</button>
      </section>
    </div>
  );
}

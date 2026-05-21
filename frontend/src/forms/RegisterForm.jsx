import { UserPlus } from "lucide-react";
import { useState } from "react";

export default function RegisterForm({ onSubmit, loading }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    department: "",
    semester: 7
  });
  const update = (event) => setValues({ ...values, [event.target.name]: event.target.value });

  return (
    <form className="auth-form" onSubmit={(event) => { event.preventDefault(); onSubmit(values); }}>
      <label>Name<input name="name" required value={values.name} onChange={update} /></label>
      <label>Email<input name="email" type="email" required value={values.email} onChange={update} /></label>
      <label>Password<input name="password" type="password" required minLength="8" value={values.password} onChange={update} /></label>
      <label>Role<select name="role" value={values.role} onChange={update}><option value="student">Student</option><option value="mentor">Mentor</option></select></label>
      <label>Department<input name="department" required value={values.department} onChange={update} /></label>
      <label>Semester<input name="semester" type="number" min="1" max="12" value={values.semester} onChange={update} /></label>
      <button className="primary-button" disabled={loading}>
        <UserPlus size={18} />
        {loading ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}

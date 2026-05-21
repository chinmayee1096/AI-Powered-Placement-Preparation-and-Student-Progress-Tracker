import { LogIn } from "lucide-react";
import { useState } from "react";

export default function LoginForm({ onSubmit, loading }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const update = (event) => setValues({ ...values, [event.target.name]: event.target.value });

  return (
    <form className="auth-form" onSubmit={(event) => { event.preventDefault(); onSubmit(values); }}>
      <label>Email<input name="email" type="email" required value={values.email} onChange={update} /></label>
      <label>Password<input name="password" type="password" required minLength="8" value={values.password} onChange={update} /></label>
      <button className="primary-button" disabled={loading}>
        <LogIn size={18} />
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

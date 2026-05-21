import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../forms/LoginForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

export default function Login() {
  const { login, loading } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (values) => {
    try {
      setError("");
      await login(values);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <h1>AI Placement Prep Tracker</h1>
        <p>Sign in to continue your placement preparation workspace.</p>
        {error && <div className="form-error">{error}</div>}
        <LoginForm onSubmit={submit} loading={loading} />
        <small>New here? <Link to="/register">Create an account</Link></small>
      </section>
    </main>
  );
}

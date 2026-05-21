import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../forms/RegisterForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

export default function Register() {
  const { register, loading } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (values) => {
    try {
      setError("");
      await register(values);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel wide">
        <h1>Create your workspace</h1>
        <p>Students and mentors can start with a secure account.</p>
        {error && <div className="form-error">{error}</div>}
        <RegisterForm onSubmit={submit} loading={loading} />
        <small>Already registered? <Link to="/login">Sign in</Link></small>
      </section>
    </main>
  );
}

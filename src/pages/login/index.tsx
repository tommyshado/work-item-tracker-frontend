import { useState, type FormEvent } from "react";
import Field from "../../components/field/Field";
import "./login.css";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !password) {
      setError("Name and password are required.");
      return;
    }

    const { success, message } = await login({ name, password });
    
    if (!success) {
        setError(message);
    };
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">Sign in</h1>

        {error && <p className="login-error">{error}</p>}

        <Field label="Name">
          <input
            className="login-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="username"
          />
        </Field>

        <Field label="Password">
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Field>

        <button className="login-button" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
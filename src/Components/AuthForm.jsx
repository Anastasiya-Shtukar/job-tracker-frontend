import { useState } from "react";

const AuthForm = ({ mode, onLogin, onRegister, onToggleMode }) => {
  const isLoginMode = mode === "login";
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buttonText = isSubmitting
    ? isLoginMode
      ? "Logging in..."
      : "Creating account..."
    : isLoginMode
      ? "Login"
      : "Register";

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const formData = new FormData(form);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setIsSubmitting(true);
      if (isLoginMode) {
        await onLogin(email, password);
      } else {
        await onRegister(email, password);
      }
      form.reset();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">
          {isLoginMode ? "Login" : "Create account"}
        </h2>

        <div className="auth-field">
          <label htmlFor="email" className="auth-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="auth-input"
            placeholder="Enter your email"
            onChange={() => setError(null)}
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password" className="auth-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="auth-input"
            placeholder="Enter your password"
            onChange={() => setError(null)}
          />
        </div>
        {error && <div className="auth-error">{error}</div>}

        <button type="submit" className="auth-button" disabled={isSubmitting}>
          {buttonText}
        </button>

        <button
          type="button"
          className="auth-switch-button"
          onClick={onToggleMode}
        >
          {isLoginMode
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;

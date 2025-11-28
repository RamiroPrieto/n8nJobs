import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Rhh({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loggedUser = sessionStorage.getItem("rh_user");
    if (loggedUser) navigate("/offers");
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "rh@gmail.com" && password === "rh123") {
      const userData = { email };

      sessionStorage.setItem("rh_user", JSON.stringify(userData));
      setUser(userData);

      navigate("/candidates");
    } else {
      setErrorMessage("Email o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Login RRHH</h2>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>

        {errorMessage && (
          <p className="login-error">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Offers } from "./components/Offers";
import { Candidates } from "./components/Candidates";
import { Respondidos } from "./components/Respondidos";
import { Rhh } from "./components/rhh";
import { useEffect, useState } from "react";
import "./App.css";

function PrivateRoute({ children }) {
  const loggedUser = sessionStorage.getItem("rh_user");
  return loggedUser ? children : <Navigate to="/login" />;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("rh_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("rh_user");
    setUser(null);
  };

  return (
    <Router>
      <nav className="navbar">
        {/* Pública siempre */}
        <Link to="/offers" className="nav-link">Ofertas</Link>

        {/* Solo mostrar si está logueado */}
        {user && (
          <>
            <Link to="/candidates" className="nav-link">Candidatos</Link>
            <Link to="/respondidos" className="nav-link">Candidatos Contactados</Link>
          </>
        )}

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Indicador y logout si está logueado */}
          {user && (
            <>
              <span className="user-indicator">{user.email}</span>
              <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
            </>
          )}

          {/* Botón login si NO está logueado */}
          {!user && (
            <button
              className="login-btn"
              onClick={() => window.location.href = "/login"}
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/offers" />} />

        {/* Pública */}
        <Route path="/offers" element={<Offers />} />

        {/* Login */}
        <Route path="/login" element={<Rhh setUser={setUser} />} />

        {/* Privadas */}
        <Route
          path="/candidates"
          element={
            <PrivateRoute>
              <Candidates />
            </PrivateRoute>
          }
        />

        <Route
          path="/respondidos"
          element={
            <PrivateRoute>
              <Respondidos />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;

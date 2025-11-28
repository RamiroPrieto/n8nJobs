import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const logged = sessionStorage.getItem("logged");

  return logged ? children : <Navigate to="/login" replace />;
}

import { useEffect, useState } from "react";
import "./Candidates.css";

export const Respondidos = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch("http://concentrix.net.ar:5678/webhook/candidates")
    fetch("http://concentrix.net.ar:5678/webhook/candidates")
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener los candidatos");
        return res.json();
      })
      .then(data => {
        setCandidates(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando candidatos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="candidates-container">
      <h1 className="title">Candidatos Respondidos</h1>
      <ul className="candidates-list">
        {candidates
          .filter(c => c.estado === "aceptado" || c.estado === "declinado")
          .map(c => (
            <li
              key={c.row_number}
              className={`candidate-card ${c.estado}`}
            >
              <h3>{c.nombre} {c.apellido}</h3>
              <p><strong>Email:</strong> {c.email}</p>
              <p><strong>Descripción:</strong> {c.descripcion || "Sin descripción"}</p>
              <p><strong>Experiencia:</strong> {c.resumen_experiencia_laboral || "No especificada"}</p>
              <p><strong>Estado:</strong> {c.estado}</p>
              <p><strong>Salario pretendido:</strong> {c.requestedsalary} USD</p>
              <p><strong>Nota:</strong> {c.nota}</p>
              <p><strong>Explicación nota:</strong> {c.expnota || "No especificada"}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

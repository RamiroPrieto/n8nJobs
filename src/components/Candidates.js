import { useEffect, useState } from "react";
import "./Candidates.css";

export const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionResult, setActionResult] = useState(null); // 👈 nuevo estado

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

  const handleAction = async (candidate, estado) => {
    try {
      // const res = await fetch("http://concentrix.net.ar:5678/webhook/enviar", {
      const res = await fetch("http://concentrix.net.ar:5678/webhook/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...candidate, estado }),
      });
      if (!res.ok) throw new Error("Error al enviar acción");

      // En lugar de alert, mostramos un mensaje en la página
      setActionResult({
        nombre: candidate.nombre,
        estado,
      });
    } catch (err) {
      alert("❌ Hubo un error");
      console.error(err);
    }
  };

  // Mensaje de confirmación
  if (actionResult) {
    return (
      <div className="confirmation-page">
        <h2>
          {actionResult.estado === "aceptado"
            ? `✅ ${actionResult.nombre} ha sido aceptado`
            : `❌ ${actionResult.nombre} ha sido declinado`}
        </h2>
        <button onClick={() => window.location.reload()}  className="back-btn">
          ← Volver a candidatos
        </button>
      </div>
    );
  }

  if (loading) return <p>Cargando candidatos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="candidates-container">
      <h1 className="title">Lista de Candidatos</h1>
      <ul className="candidates-list">
        {candidates
          .filter(c => c.estado === "esperando")
          .map(c => (
            <li key={c.row_number} className="candidate-card">
              <h3>{c.nombre} {c.apellido}</h3>
              <p><strong>Email:</strong> {c.email}</p>
              <p><strong>Descripción:</strong> {c.descripcion || "Sin descripción"}</p>
              <p><strong>Experiencia:</strong> {c.resumen_experiencia_laboral || "No especificada"}</p>
              <p><strong>Salario pretendido:</strong> {c.requestedsalary} USD</p>
              <p><strong>Nota:</strong> {c.nota}</p>
              <p><strong>Explicación nota:</strong> {c.expnota || "No especificada"}</p>
              <div className="buttons-container">
                <button 
                  className="accept-btn" 
                  onClick={() => handleAction(c, "aceptado")}
                >
                  ✅ Aceptar
                </button>
                <button 
                  className="decline-btn" 
                  onClick={() => handleAction(c, "declinado")}
                >
                  ❌ Declinar
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

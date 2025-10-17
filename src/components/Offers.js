import React, { useState, useEffect } from "react";
import "./Offers.css";

export const Offers = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [submitted, setSubmitted] = useState(false); // ✅ nuevo estado

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    file: null
  });

  useEffect(() => {
    fetch("/webhook/jobs")
    // fetch("/webhook/jobs")
      .then(res => res.json())
      .then(data => {
        const jobsList = data[0]?.jobs || [];
        setJobs(jobsList);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData(prev => ({ ...prev, file: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Por favor completá todos los campos del formulario.");
      return;
    }

    const payload = new FormData();
    payload.append("id", selectedJob.id);
    payload.append("title", selectedJob.title);
    payload.append("description", selectedJob.description);
    payload.append("maxSalary", selectedJob.salary);
    payload.append("firstName", formData.firstName);
    payload.append("lastName", formData.lastName);
    payload.append("salary", formData.salary);
    payload.append("email", formData.email);

    if (formData.file) {
      payload.append("file", formData.file);
    }

    // fetch("/webhook/send", {
    fetch("/webhook/send", {
      method: "POST",
      body: payload
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al enviar datos");
        return res.json();
      })
      .then(() => {
        setSubmitted(true); // ✅ mostramos pantalla de éxito
        setFormData({ firstName: "", lastName: "", email: "", salary: "", file: null });
      })
      .catch(err => {
        console.error(err);
        alert("Error al enviar la oferta");
      });
  };

  if (loading) return <p className="center-text">Cargando ofertas...</p>;
  if (error) return <p className="center-text error-text">Error: {error}</p>;

  // ✅ Pantalla de éxito
  if (submitted) {
    return (
      <div className="offer-success">
        <h2>✅ Se ha enviado correctamente</h2>
        <button className="accept-btn" onClick={() => {
          setSubmitted(false);
          setSelectedJob(null);
        }}>
          Volver a las ofertas
        </button>
      </div>
    );
  }

  if (selectedJob) {
    return (
      <div className="offer-details">
        <h2>{selectedJob.title}</h2>
        <p>{selectedJob.description}</p>

        <div className="offer-form">
          <input
            type="text"
            name="firstName"
            placeholder="Nombre"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="salary"
            placeholder="Salario estimado (USD)"
            value={formData.salary}
            onChange={handleChange}
            min="1000"
            max="2000"
          />
          <input
            type="file"
            name="file"
            accept="application/pdf"
            onChange={handleChange}
          />
        </div>

        <button className="accept-btn" onClick={handleSubmit}>
          Enviar esta oferta
        </button>
        <button className="cancel-btn" onClick={() => setSelectedJob(null)}>
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="offers-container">
      <h1 className="title">Ofertas de Trabajo</h1>
      <ul className="offers-list">
        {jobs.map(job => (
          <li key={job.id} className="offer-card">
            <h3>{job.title}</h3>
            <p>{job.short}</p>
            <p>{job.description}</p>
            <button className="accept-btn" onClick={() => setSelectedJob(job)}>
              Ver más
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

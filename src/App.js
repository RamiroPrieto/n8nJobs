// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobsPublicView from './components/JobsPublicView';
import RecruiterDashboard from './components/RecruiterDashboard';
import LoginView from './components/LoginView';
import Navigation from './components/Navigation';

// Componente para proteger rutas (opcional pero recomendado)
const ProtectedRoute = ({ children }) => {
  // Aquí puedes agregar tu lógica de autenticación
  // Por ahora, verificamos si hay un token en localStorage
  const isAuthenticated = localStorage.getItem('authToken');
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          {/* Ruta pública - Vista de trabajos */}
          <Route path="/" element={<JobsPublicView />} />
          
          {/* Ruta de login */}
          <Route path="/login" element={<LoginView />} />
          
          {/* Ruta protegida - Dashboard del reclutador */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <RecruiterDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Ruta 404 - Redirige a home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
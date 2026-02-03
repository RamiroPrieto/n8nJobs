// src/components/LoginView.jsx
import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simular login exitoso
    localStorage.setItem('authToken', 'fake-token-123');
    navigate('/dashboard'); // Redirige al dashboard
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#041E32' }}
            >
              <LogIn className="text-white" size={28} />
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#041E32' }}>
              Iniciar Sesión
            </h2>
            <p className="text-gray-600">Accede al panel de reclutamiento</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': '#24E2CB' }}
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': '#24E2CB' }}
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit"
                className="w-full text-white font-medium py-3 rounded-lg transition-all hover:opacity-90 mt-6"
                style={{ backgroundColor: '#007380' }}
              >
                Iniciar Sesión
              </button>

              <div className="text-center mt-4">
                <button 
                  type="button"
                  className="text-sm font-medium hover:underline"
                  style={{ color: '#007380' }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
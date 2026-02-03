// src/components/Navigation.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-concentrix-dark border-t border-concentrix-teal">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {/* Botón: Vista de Trabajos */}
          <Link
            to="/"
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors ${
              location.pathname === '/'
                ? 'bg-concentrix-teal text-white'
                : 'text-gray-400 hover:text-concentrix-cyan'
            }`}
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">Trabajos</span>
          </Link>

          {/* Botón: Dashboard (solo si está autenticado) */}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/dashboard'
                  ? 'bg-concentrix-teal text-white'
                  : 'text-gray-400 hover:text-concentrix-cyan'
              }`}
            >
              <svg
                className="w-6 h-6 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="text-xs">Dashboard</span>
            </Link>
          )}

          {/* Botón: Login/Logout */}
          {!isAuthenticated ? (
            <Link
              to="/login"
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/login'
                  ? 'bg-concentrix-teal text-white'
                  : 'text-gray-400 hover:text-concentrix-cyan'
              }`}
            >
              <svg
                className="w-6 h-6 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-xs">Login</span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center px-4 py-2 rounded-lg text-gray-400 hover:text-concentrix-cyan transition-colors"
            >
              <svg
                className="w-6 h-6 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-xs">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
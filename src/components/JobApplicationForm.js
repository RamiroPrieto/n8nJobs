// src/components/JobApplicationForm.jsx
import React, { useState } from 'react';
import { X, Upload, CheckCircle, Loader } from 'lucide-react';

const JobApplicationForm = ({ job, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
    file: null
  });
  const [isSending, setIsSending] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, file }));
      setFileName(file ? file.name : '');
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Aquí iría la llamada a tu API
      await onSubmit(formData, job);
      
      // Simulación de envío
      setTimeout(() => {
        setIsSending(false);
        alert('✅ Aplicación enviada exitosamente!');
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error al enviar:', error);
      setIsSending(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="sticky top-0 text-white px-6 py-5 rounded-t-2xl"
          style={{ background: 'linear-gradient(135deg, #041E32 0%, #007380 100%)' }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
              <p className="text-sm opacity-90">{job.company} • {job.location}</p>
            </div>
            <button
              onClick={onClose}
              disabled={isSending}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Descripción del puesto */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            {job.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs text-white font-medium"
                style={{ backgroundColor: '#007380' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#041E32' }}>
            Completa tu aplicación
          </h3>

          <div className="space-y-4">
            {/* Nombre y Apellido */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={isSending}
                  placeholder="Juan"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{ '--tw-ring-color': '#24E2CB' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={isSending}
                  placeholder="Pérez"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{ '--tw-ring-color': '#24E2CB' }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSending}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                style={{ '--tw-ring-color': '#24E2CB' }}
              />
            </div>

            {/* Salario esperado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salario esperado (USD) *
              </label>
              <div className="relative">
                <span 
                  className="absolute left-4 top-3.5 text-gray-500 font-medium"
                >
                  $
                </span>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  disabled={isSending}
                  min="1000"
                  max="200000"
                  placeholder="50000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{ '--tw-ring-color': '#24E2CB' }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Rango del puesto: {job.salary}
              </p>
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Curriculum Vitae (PDF) *
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={handleChange}
                  required
                  disabled={isSending}
                  className="hidden"
                  id="cv-upload"
                />
                <label
                  htmlFor="cv-upload"
                  className={`flex items-center justify-center gap-3 w-full px-4 py-4 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                    isSending 
                      ? 'bg-gray-100 cursor-not-allowed border-gray-300' 
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {fileName ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} style={{ color: '#007380' }} />
                      <span className="text-sm font-medium text-gray-700">{fileName}</span>
                    </div>
                  ) : (
                    <>
                      <Upload size={20} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Haz clic para subir tu CV (PDF)
                      </span>
                    </>
                  )}
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Solo archivos PDF, máximo 5MB
              </p>
            </div>
          </div>

          {/* Estado de envío */}
          {isSending && (
            <div 
              className="mt-6 p-4 rounded-lg flex items-center gap-3"
              style={{ backgroundColor: '#24E2CB20' }}
            >
              <Loader className="animate-spin" size={20} style={{ color: '#007380' }} />
              <p className="text-sm font-medium" style={{ color: '#007380' }}>
                Enviando tu aplicación, por favor espera...
              </p>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSending}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="flex-1 px-6 py-3 text-white rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#007380' }}
            >
              {isSending ? 'Enviando...' : 'Enviar Aplicación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
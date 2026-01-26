// src/components/RecruiterDashboard.jsx
import { useState, useMemo, useEffect } from 'react';
import { Eye, Mail, Download } from 'lucide-react';
import { SearchCandidate } from './SearchCandidate';
import { useNavigate } from 'react-router-dom';
import { useCandidates } from '../hooks/useCandidates';
import { useCandidateState } from '../hooks/useCandidateState';
import { useSearchCandidates } from '../hooks/useSearchCandidates';
import { useDebounce } from '../hooks/useDebounced';
import { useJobs } from '../hooks/useJobs';


const RecruiterDashboard = () => {

  const { data: jobs = [], isLoading: loadingJobs, isError: jobsError} = useJobs();
  const { data: candidates = [], isLoading, isError} = useCandidates();
  const { mutate, isPending} = useCandidateState();

  const [activeTab, setActiveTab] = useState('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [jobOffers, setJobOffers] = useState([]);


  const [text, setText] = useState("");
  const debounced = useDebounce(text, 300);

  const query = debounced.trim();
  const isSearching = query.length >= 2;

  const {data: searchResults = [], isLoading: searching} = useSearchCandidates(query);
  const baseList = isSearching ? searchResults : candidates
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Tiempo completo',
    salary: '',
    description: '',
    tags: ''
  });

    useEffect(() => {
      let jobsList = jobs[0]?.jobs
  
      setJobOffers(jobsList);
  
    }, [jobs])

  const downloadCv = async (candidateId) => {
    try {
      const response = await fetch(
        `https://concentrix.net.ar:8443/webhook/downloadCv?candidateId=${candidateId}`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error('Error descargando el CV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `cv_${candidateId}.pdf`; // o lo que quieras
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('No se pudo descargar el CV');
    }
  };


  const filteredCandidates = useMemo(() => {

  if(activeTab === "todos") return baseList
  return baseList?.filter(candidate => String(candidate.estado || "") === activeTab)

  }, [candidates, activeTab]) 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setFormData({
      title: '',
      location: '',
      type: 'Tiempo completo',
      salary: '',
      description: '',
      tags: ''
    });
  };

  const handleStatusChange = (candidateId, newStatus) => {


    const payload = {
      id: candidateId,
      estado: newStatus
    };
    mutate(payload);

    setSelectedCandidate(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Nuevo':
        return { bg: '#E0E7FF', text: '#3730A3' };
      case 'declinado':
        return { bg: '#FEF3C7', text: '#92400E' };
      case 'aceptado':
        return { bg: '#D1FAE5', text: '#065F46' };
      default:
        return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="text-white" style={{ backgroundColor: '#041E32' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">Panel de Reclutamiento</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm">Reclutador</span>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: '#007380' }}
              >
                R
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title with Button */}
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#041E32' }}>
              Candidatos por puestos
            </h2>
            <p className="text-gray-600">Gestiona y revisa las aplicaciones recibidas</p>
          </div>
          {/* <SearchCandidate
            value={text}
            onChange={setText}
            loading={searching}
          /> */}
          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-lg text-white font-medium transition-all hover:opacity-90 shadow-md flex items-center gap-2"
            style={{ backgroundColor: '#007380' }}
          >
            <span className="text-xl">+</span>
            Nueva Vacante
          </button> */}
        </div>
        {jobOffers?.map(job =>
          <div className="m-4 p-2 w-full border-2 font-medium py-3 rounded-lg transition-all hover:opacity-90">        
              <details className='group'>
                <summary className='flex cursor-pointer flex-row justify-between'>
                    <p>
                      <span 
                      className='transition-transform group-[open]:rotate-180'
                      >
                       ►
                      </span>
                      { job?.title}</p>
                    <p
                        className="px-3 py-1 rounded-full text-xs text-white font-medium"
                        style={{ backgroundColor: '#007380' }}
                      >
                        {job.short}
                    </p>
                </summary>
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex gap-8 px-6">
                    {[
                      { id: 'todos', label: 'Todos los candidatos' },
                      { id: 'aceptado', label: 'Aceptado' },
                      { id: 'declinado', label: 'Declinado' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="py-4 font-medium border-b-2 transition-colors"
                        style={{
                          borderColor: activeTab === tab.id ? '#007380' : 'transparent',
                          color: activeTab === tab.id ? '#007380' : '#6B7280'
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Table */}
              {isLoading ? <div>Cargando...</div>
                :isError ? <div>Error al cargar</div> 
                :<div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Candidato
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Posición
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Experiencia
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Score IA
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredCandidates?.filter(candidates => candidates.
id_propuesta === job.id).map((candidate) => {
                        const statusColor = getStatusColor(candidate.estado);
                        return (
                          <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                                  style={{ backgroundColor: '#24E2CB30', color: '#007380' }}
                                >
                                  {candidate.nombre.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-medium" style={{ color: '#041E32' }}>
                                    {candidate.nombre}
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                    <Mail size={12} />
                                    {candidate.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">{candidate.position}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{candidate.experience}</td>
                            <td className="px-6 py-4">
                              {candidate.nota ? (
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                                    style={{ 
                                      backgroundColor: candidate.nota >= 80 ? '#D1FAE5' : 
                                                    candidate.nota >= 60 ? '#FEF3C7' : '#FEE2E2',
                                      color: candidate.nota >= 80 ? '#065F46' : 
                                            candidate.nota >= 60 ? '#92400E' : '#991B1B'
                                    }}
                                  >
                                    {candidate.nota}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">Pendiente</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">{candidate.appliedDate}</td>
                            <td className="px-6 py-4">
                              <div className="relative">
                                <button
                                  onClick={() => setSelectedCandidate(
                                    selectedCandidate === candidate.id ? null : candidate.id
                                  )}
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium hover:opacity-80 transition-opacity"
                                  style={{ 
                                    backgroundColor: statusColor.bg,
                                    color: statusColor.text
                                  }}
                                >
                                  {statusColor.icon && <span>{statusColor.icon}</span>}
                                  {candidate.status}
                                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                
                                {selectedCandidate === candidate.id && (
                                  <div className="absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1">
                                    <button
                                      onClick={() => handleStatusChange(candidate.id, 'aceptado')}
                                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                                    >
                                      <span className="w-3 h-3 rounded-full bg-green-200"></span>
                                      Aceptado
                                    </button>
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button
                                      onClick={() => handleStatusChange(candidate.id, 'declinado')}
                                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                                    >
                                      <span className="w-3 h-3 rounded-full bg-red-200"></span>
                                      Declinado
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button 
                                  className="p-2 rounded-lg transition-colors"
                                  style={{ color: '#007380' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#24E2CB20'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                  title="Ver perfil completo"
                                >
                                  <Eye size={18} />
                                </button>
                                <button 
                                  className="p-2 rounded-lg transition-colors"
                                  style={{ color: '#007380' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#24E2CB20'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                  title="Descargar CV"
                                  onClick={() => downloadCv(candidate.id)}
                                >
                                  <Download size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              }        
              </details>
            
          </div>      
        )}  
      </div>

      {/* Modal para Nueva Vacante */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-2xl font-bold" style={{ color: '#041E32' }}>
                Publicar Nueva Vacante
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#041E32' }}>
                    Título del puesto *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="ej. Desarrollador Full Stack Senior"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#041E32' }}>
                      Ubicación *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="ej. Buenos Aires, Argentina"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#041E32' }}>
                      Tipo de empleo *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    >
                      <option value="Tiempo completo">Tiempo completo</option>
                      <option value="Medio tiempo">Medio tiempo</option>
                      <option value="Por contrato">Por contrato</option>
                      <option value="Remoto">Remoto</option>
                      <option value="Híbrido">Híbrido</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#041E32' }}>
                    Rango salarial *
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                    placeholder="ej. $80,000 - $120,000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#041E32' }}>
                    Descripción del puesto *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Describe las responsabilidades, requisitos y beneficios del puesto..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#041E32' }}>
                    Habilidades requeridas
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="ej. React, Node.js, MongoDB (separados por comas)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separa las habilidades con comas</p>
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 text-white rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#007380' }}
                >
                  Publicar Vacante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
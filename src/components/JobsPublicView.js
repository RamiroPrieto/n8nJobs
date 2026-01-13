import { useEffect, useState, useMemo } from 'react';
import { Search, MapPin, Briefcase, DollarSign } from 'lucide-react';
import JobApplicationForm from './JobApplicationForm';
import { useJobs } from '../hooks/useJobs';

const JobsPublicView = () => {
  const { data: jobs = [], isLoading, isError} = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobOffers, setJobOffers] = useState([])

  
  useEffect(() => {
    let jobsList = jobs[0]?.jobs

    setJobOffers(jobsList);

  }, [jobs])

  const filteredOffers = useMemo(() => {

    const query = searchTerm !==  null && searchTerm.length >= 3 && searchTerm.trim().toLowerCase();
    if(!query) return jobOffers;

    return jobOffers.filter((job) => {
      const title = (job.title || '').toLowerCase().trim();
      const description = (job.description || '').toLowerCase().trim();
      
      return title.includes(query) || description.includes(query)
    })

  }, [jobOffers , searchTerm])


  const handleApply = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handleSubmitApplication = async (formData, job) => {
    console.log('Aplicación enviada:', {
      job: job.id,
      applicant: formData
    });
    
    // Aquí harías la llamada a tu API
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold" style={{ color: '#041E32' }}>
              Concentrix Jobs
            </h1>
          {/*   <button 
              className="px-4 py-2 rounded-lg hover:opacity-90 transition-all font-medium"
              style={{ 
                border: '1px solid #007380', 
                color: '#007380',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#007380' + '10'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Iniciar Sesión
            </button> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div 
        className="text-white py-20" 
        style={{ background: 'linear-gradient(135deg, #041E32 0%, #007380 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            Encuentra tu próxima oportunidad
          </h2>
          <p className="text-center mb-8 text-lg opacity-90">
            Explora ofertas laborales en las mejores empresas del mundo
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por título, empresa o palabra clave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#24E2CB' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {isLoading ? <div>Cargando...</div>
          :isError ? <div>Error al cargar</div>
          :filteredOffers?.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#041E32' }}>
                  {job.title}
                </h3>
                <p className="text-gray-600 mb-4">{job.company}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-gray-300 text-gray-700">
                    <MapPin size={14} className="mr-1" />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-gray-300 text-gray-700">
                    <Briefcase size={14} className="mr-1" />
                    {job.type}
                  </span>
                  <span 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: '#24E2CB' + '20',
                      color: '#007380',
                      border: '1px solid #24E2CB'
                    }}
                  >
                    <DollarSign size={14} className="mr-1" />
                    {job.salary}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {/* {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs text-white font-medium"
                      style={{ backgroundColor: '#007380' }}
                    >
                      {tag}
                    </span>
                  ))} */}
                  <span
                      className="px-3 py-1 rounded-full text-xs text-white font-medium"
                      style={{ backgroundColor: '#007380' }}
                    >
                      {job.short}
                    </span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button 
                  onClick={() => handleApply(job)}
                  className="w-full text-white font-medium py-3 rounded-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: '#007380' }}
                >
                  Aplicar ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Aplicación */}
      {selectedJob && (
        <JobApplicationForm
          job={selectedJob}
          onClose={handleCloseModal}
          onSubmit={handleSubmitApplication}
        />
      )}
    </div>
  );
};

export default JobsPublicView;
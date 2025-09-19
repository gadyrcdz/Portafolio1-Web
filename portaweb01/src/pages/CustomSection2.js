// src/pages/CustomSection2.js (Proyectos Personales)
import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitBranch, Calendar } from 'lucide-react';
import './CustomSection2.css';

const CustomSection2 = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');

  // Datos de ejemplo para proyectos personales
  const sampleProjects = [
    {
      id: 1,
      title: "Calculadora de Notas TEC",
      description: "Aplicación web para que estudiantes del TEC puedan calcular sus notas finales y planificar qué necesitan en exámenes finales.",
      longDescription: "Esta herramienta permite a los estudiantes ingresar sus notas de tareas, laboratorios y exámenes parciales para calcular automáticamente qué nota necesitan en el examen final para aprobar el curso.",
      technologies: ["JavaScript", "HTML", "CSS", "Local Storage"],
      category: "web",
      status: "completed",
      startDate: "2024-01-15",
      endDate: "2024-02-01",
      githubUrl: "https://github.com/tu-usuario/calculadora-notas-tec",
      liveUrl: "https://tu-usuario.github.io/calculadora-notas-tec",
      features: [
        "Cálculo automático de notas finales",
        "Simulación de escenarios 'qué pasaría si'",
        "Guardado local de datos",
        "Interfaz responsiva"
      ],
      challenges: [
        "Implementar las diferentes modalidades de evaluación del TEC",
        "Crear una interfaz intuitiva para entrada de datos",
        "Manejar casos edge como notas extra o bonus"
      ],
      learned: [
        "Manipulación del DOM con JavaScript",
        "Local Storage para persistencia",
        "Validación de formularios"
      ]
    },
    {
      id: 2,
      title: "Bot de Discord para Estudio",
      description: "Bot personalizado para el servidor de Discord de mi grupo de estudio que ayuda con recordatorios y organización.",
      longDescription: "Un bot que ayuda a coordinar sesiones de estudio, envía recordatorios de entregas, y mantiene un registro de recursos útiles compartidos por el grupo.",
      technologies: ["Python", "Discord.py", "SQLite", "Heroku"],
      category: "automation",
      status: "in-progress",
      startDate: "2024-01-20",
      endDate: null,
      githubUrl: "https://github.com/tu-usuario/discord-study-bot",
      liveUrl: null,
      features: [
        "Comandos para crear recordatorios",
        "Sistema de calendario compartido",
        "Biblioteca de recursos de estudio",
        "Estadísticas de participación"
      ],
      challenges: [
        "Aprender la API de Discord",
        "Manejar múltiples time zones",
        "Diseñar una base de datos eficiente"
      ],
      learned: [
        "Programación con Python async/await",
        "Trabajo con APIs externas",
        "Base de datos SQLite"
      ]
    },
    {
      id: 3,
      title: "Generador de Horarios",
      description: "Script que ayuda a generar horarios de clases optimizados basado en preferencias personales.",
      longDescription: "Herramienta que toma la oferta de cursos del TEC y genera horarios posibles eliminando conflictos, considerando preferencias como no tener clases muy temprano o muy seguidas.",
      technologies: ["Python", "Pandas", "Tkinter"],
      category: "tool",
      status: "completed",
      startDate: "2023-11-01",
      endDate: "2023-12-15",
      githubUrl: "https://github.com/tu-usuario/generador-horarios",
      liveUrl: null,
      features: [
        "Importación de datos de cursos",
        "Filtros por preferencias personales",
        "Exportación a diferentes formatos",
        "Interfaz gráfica simple"
      ],
      challenges: [
        "Algoritmo de optimización de horarios",
        "Parsing de datos complejos",
        "Interface de usuario intuitiva"
      ],
      learned: [
        "Algoritmos de backtracking",
        "Manipulación de datos con Pandas",
        "Creación de GUI con Tkinter"
      ]
    }
  ];

  useEffect(() => {
    setProjects(sampleProjects);
  }, []);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': { label: 'Completado', class: 'status-completed' },
      'in-progress': { label: 'En Desarrollo', class: 'status-in-progress' },
      'planned': { label: 'Planeado', class: 'status-planned' }
    };
    
    const config = statusConfig[status] || { label: status, class: 'status-default' };
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Presente';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="projects-section">
      <div className="container">
        <header className="section-header">
          <h1>Proyectos Personales</h1>
          <p>
            Una colección de proyectos que he desarrollado por iniciativa propia, 
            explorando diferentes tecnologías y resolviendo problemas reales.
          </p>
        </header>

        <div className="projects-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => setFilter('web')}
          >
            Web
          </button>
          <button 
            className={`filter-btn ${filter === 'automation' ? 'active' : ''}`}
            onClick={() => setFilter('automation')}
          >
            Automatización
          </button>
          <button 
            className={`filter-btn ${filter === 'tool' ? 'active' : ''}`}
            onClick={() => setFilter('tool')}
          >
            Herramientas
          </button>
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <div className="project-title-section">
                  <h3>{project.title}</h3>
                  {getStatusBadge(project.status)}
                </div>
                <div className="project-dates">
                  <Calendar size={16} />
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </div>
              </div>

              <p className="project-description">{project.description}</p>
              
              <div className="project-technologies">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="project-details">
                <details>
                  <summary>Ver más detalles</summary>
                  <div className="project-expanded">
                    <div className="project-long-description">
                      <p>{project.longDescription}</p>
                    </div>

                    <div className="project-features">
                      <h4>Características principales:</h4>
                      <ul>
                        {project.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="project-challenges">
                      <h4>Desafíos enfrentados:</h4>
                      <ul>
                        {project.challenges.map((challenge, index) => (
                          <li key={index}>{challenge}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="project-learned">
                      <h4>Aprendizajes clave:</h4>
                      <ul>
                        {project.learned.map((learning, index) => (
                          <li key={index}>{learning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
              </div>

              <div className="project-actions">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <Github size={18} />
                    Código
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <ExternalLink size={18} />
                    Ver proyecto
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="projects-stats">
          <h2>Estadísticas de Proyectos</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <GitBranch size={24} />
              <div>
                <h3>{projects.length}</h3>
                <p>Proyectos totales</p>
              </div>
            </div>
            <div className="stat-item">
              <Star size={24} />
              <div>
                <h3>{projects.filter(p => p.status === 'completed').length}</h3>
                <p>Completados</p>
              </div>
            </div>
            <div className="stat-item">
              <Calendar size={24} />
              <div>
                <h3>{projects.filter(p => p.status === 'in-progress').length}</h3>
                <p>En desarrollo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSection2;
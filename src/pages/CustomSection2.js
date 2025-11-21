// src/pages/CustomSection2.js (Proyectos Open Source)
import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitBranch, Calendar, Code } from 'lucide-react';
import projectsData from '../data/projects.json';
import './CustomSection2.css';

const CustomSection2 = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setProjects(projectsData.openSourceProjects);
  }, []);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.ecosystem === filter);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { label: 'Activo', class: 'status-active' },
      'completed': { label: 'Completado', class: 'status-completed' },
      'archived': { label: 'Archivado', class: 'status-archived' }
    };
    
    const config = statusConfig[status] || { label: status, class: 'status-default' };
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Presente';
    return dateString;
  };

  return (
    <div className="projects-section">
      <div className="container">
        <header className="section-header">
          <h1>Contribuciones Open Source</h1>
          <p>
            Proyectos blockchain en los que he contribuido activamente a través de OnlyDust,
            trabajando en los ecosistemas Starknet y Stellar.
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
            className={`filter-btn ${filter === 'Starknet' ? 'active' : ''}`}
            onClick={() => setFilter('Starknet')}
          >
            Starknet
          </button>
          <button 
            className={`filter-btn ${filter === 'Stellar' ? 'active' : ''}`}
            onClick={() => setFilter('Stellar')}
          >
            Stellar
          </button>
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <div className="project-title-section">
                  <h3>{project.name}</h3>
                  {getStatusBadge(project.status)}
                </div>
                <div className="project-meta">
                  <span className="ecosystem-badge">{project.ecosystem}</span>
                  <span className="contribution-type">{project.contributionType}</span>
                </div>
              </div>

              <p className="project-description">{project.description}</p>
              
              <div className="my-contribution">
                <h4>Mi Contribución:</h4>
                <p>{project.myContribution}</p>
              </div>

              <div className="project-technologies">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>

              {project.achievements && (
                <div className="project-achievements">
                  <details>
                    <summary>Ver logros y detalles</summary>
                    <div className="project-expanded">
                      <div className="achievements-list">
                        <h4>Logros:</h4>
                        <ul>
                          {project.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>

                      {project.features && (
                        <div className="features-list">
                          <h4>Características del Proyecto:</h4>
                          <ul>
                            {project.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="project-period">
                        <Calendar size={16} />
                        <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                      </div>
                    </div>
                  </details>
                </div>
              )}

              <div className="project-actions">
                <a 
                  href={project.repository} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <Github size={18} />
                  Repositorio
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="contribution-stats">
          <h2>Estadísticas de Contribuciones</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <Code size={32} />
              <div>
                <h3>{projectsData.contributionStats.totalContributions}</h3>
                <p>Contribuciones totales</p>
              </div>
            </div>
            <div className="stat-item">
              <GitBranch size={32} />
              <div>
                <h3>{projectsData.contributionStats.totalProjects}</h3>
                <p>Proyectos</p>
              </div>
            </div>
            <div className="stat-item">
              <Star size={32} />
              <div>
                <h3>{projectsData.contributionStats.ecosystems.length}</h3>
                <p>Ecosistemas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="onlydust-section">
          <h2>Perfil OnlyDust</h2>
          <div className="onlydust-card">
            <p>
              Fui contribuidor en OnlyDust, plataforma que conectaba desarrolladores 
              con proyectos blockchain de código abierto.
            </p>
            <div className="onlydust-stats">
              <div className="onlydust-stat">
                <strong>{projectsData.onlyDustProfile.totalPRs}</strong>
                <span>Pull Requests</span>
              </div>
              <div className="onlydust-stat">
                <strong>{projectsData.onlyDustProfile.projectsContributed}</strong>
                <span>Proyectos</span>
              </div>
            </div>
            <a 
              href={projectsData.onlyDustProfile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="onlydust-link btn btn-primary"
            >
              Ver mi perfil en OnlyDust
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <div className="tech-stack">
          <h3>Stack Tecnológico</h3>
          <div className="tech-list">
            {projectsData.contributionStats.languages.map(lang => (
              <span key={lang} className="tech-item">{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSection2;
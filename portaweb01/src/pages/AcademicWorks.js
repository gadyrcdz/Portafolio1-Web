// src/pages/AcademicWorks.js
import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Github, Filter, X, Clock, Tag } from 'lucide-react';
import coursesData from '../data/courses.json';
import './AcademicWorks.css';

const AcademicWorks = () => {
  const [courses, setCourses] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [filters, setFilters] = useState({
    workType: '',
    technology: '',
    semester: '',
    status: ''
  });
  const [showFilters, setShowFilters] = useState(false);


  useEffect(() => {
    setCourses(coursesData.courses);
    // Crear lista plana de todos los trabajos con información del curso
    const allWorks = coursesData.courses.flatMap(course => 
      course.works.map(work => ({
        ...work,
        courseInfo: {
          code: course.code,
          name: course.name,
          semester: course.semester
        }
      }))
    );
    setFilteredWorks(allWorks);
  }, []);

  useEffect(() => {
    filterWorks();
  }, [filters, courses]);

  const filterWorks = () => {
    let filtered = courses.flatMap(course => 
      course.works.map(work => ({
        ...work,
        courseInfo: {
          code: course.code,
          name: course.name,
          semester: course.semester
        }
      }))
    );

    if (filters.workType) {
      filtered = filtered.filter(work => work.type === filters.workType);
    }
    if (filters.technology) {
      filtered = filtered.filter(work => 
        work.technologies.includes(filters.technology)
      );
    }
    if (filters.semester) {
      filtered = filtered.filter(work => 
        work.courseInfo.semester === filters.semester
      );
    }
    if (filters.status) {
      filtered = filtered.filter(work => work.status === filters.status);
    }

    setFilteredWorks(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      workType: '',
      technology: '',
      semester: '',
      status: ''
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': { label: 'Completado', class: 'status-completed' },
      'in-progress': { label: 'En Progreso', class: 'status-in-progress' },
      'pending': { label: 'Pendiente', class: 'status-pending' }
    };
    
    const config = statusConfig[status] || { label: status, class: 'status-default' };
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const getGradeDisplay = (grade) => {
    if (grade === null) return 'Pendiente';
    return `${grade}/100`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="academic-works">
      <div className="container">
        <header className="page-header">
          <h1>Trabajos Académicos</h1>
          <p>
            Aquí encontrarás todos mis trabajos universitarios organizados por curso, 
            incluyendo laboratorios, proyectos, tareas e investigaciones del TEC.
          </p>
        </header>

        <div className="filters-section">
          <button 
            className="filters-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filtros
          </button>

          {showFilters && (
            <div className="filters-panel">
              <div className="filters-grid">
                <select 
                  value={filters.workType}
                  onChange={(e) => handleFilterChange('workType', e.target.value)}
                >
                  <option value="">Todos los tipos</option>
                  {coursesData.workTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <select 
                  value={filters.technology}
                  onChange={(e) => handleFilterChange('technology', e.target.value)}
                >
                  <option value="">Todas las tecnologías</option>
                  {coursesData.technologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>

                <select 
                  value={filters.semester}
                  onChange={(e) => handleFilterChange('semester', e.target.value)}
                >
                  <option value="">Todos los semestres</option>
                  {[...new Set(courses.map(course => course.semester))].map(semester => (
                    <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>

                <select 
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">Todos los estados</option>
                  <option value="completed">Completado</option>
                  <option value="in-progress">En Progreso</option>
                  <option value="pending">Pendiente</option>
                </select>
              </div>

              <button className="clear-filters" onClick={clearFilters}>
                <X size={16} />
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        <div className="works-grid">
          {filteredWorks.map(work => (
            <div key={`${work.courseInfo.code}-${work.id}`} className="work-card">
              <div className="work-header">
                <div className="course-info">
                  <span className="course-code">{work.courseInfo.code}</span>
                  <span className="course-semester">{work.courseInfo.semester}</span>
                </div>
                {getStatusBadge(work.status)}
              </div>

              <h3 className="work-title">{work.name}</h3>
              <p className="work-type">{work.type}</p>
              <p className="work-description">{work.description}</p>

              <div className="work-details">
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>{formatDate(work.deliveryDate)}</span>
                </div>
                {work.grade && (
                  <div className="detail-item">
                    <span className="grade">Nota: {getGradeDisplay(work.grade)}</span>
                  </div>
                )}
              </div>

              <div className="technologies">
                {work.technologies.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="work-actions">
                {work.repositoryLink && (
                  <a 
                    href={work.repositoryLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-link"
                  >
                    <Github size={16} />
                    Repositorio
                  </a>
                )}
                {work.deployedLink && (
                  <a 
                    href={work.deployedLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-link"
                  >
                    <ExternalLink size={16} />
                    Ver proyecto
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="no-results">
            <p>No se encontraron trabajos con los filtros seleccionados.</p>
            <button onClick={clearFilters} className="btn btn-primary">
              Limpiar filtros
            </button>
          </div>
        )}

        <section className="courses-summary">
          <h2>Resumen por Cursos</h2>
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <h3>{course.code} - {course.name}</h3>
                <p className="course-semester">{course.semester}</p>
                <p className="course-description">{course.description}</p>
                <div className="course-stats">
                  <span>{course.works.length} trabajos</span>
                  <span>
                    {course.works.filter(w => w.status === 'completed').length} completados
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AcademicWorks;
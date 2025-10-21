import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, ArrowRight } from 'lucide-react';
import personalData from '../data/personal-info.json';
import './Home.css';

const Home = () => {
  const { basicInfo, links } = personalData;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hola, soy <span className="highlight">{basicInfo.name}</span>
            </h1>
            <h2 className="hero-subtitle">{basicInfo.title}</h2>
            <p className="hero-description">
              {basicInfo.bio}
            </p>
            
            <div className="hero-actions">
              <Link to="/personal-info" className="btn btn-primary">
                Conoce más sobre mí
                <ArrowRight size={20} />
              </Link>
              <Link to="/academic-works" className="btn btn-secondary">
                Ver mis trabajos
              </Link>
            </div>

            <div className="social-links">
              <a 
                href={links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a 
                href={links.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href={links.email}
                className="social-link"
                aria-label="Email"
              >
                📧
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img 
              src={`${process.env.PUBLIC_URL}/${basicInfo.photo}`} 
              alt={`Foto de ${basicInfo.name}`}
              className="profile-photo"
            />
          </div>
        </div>
      </section>

      <section className="about-portfolio">
        <div className="container">
          <h2>Sobre este Portafolio</h2>
          <p>
            Este portafolio web personal fue desarrollado como parte del curso 
            <strong> IC8057 - Introducción al Desarrollo de Páginas Web</strong> del 
            Instituto Tecnológico de Costa Rica. Aquí encontrarás:
          </p>
          
          <div className="portfolio-features">
            <div className="feature">
              <h3>Trabajos Académicos</h3>
              <p>Una recopilación organizada de todos mis proyectos, laboratorios y tareas universitarias.</p>
            </div>
            <div className="feature">
              <h3>Información Profesional</h3>
              <p>Mi perfil técnico, habilidades, certificaciones y experiencia en desarrollo.</p>
            </div>
            <div className="feature">
              <h3>Proyectos Personales</h3>
              <p>Iniciativas propias que demuestran mi pasión por la tecnología y el aprendizaje continuo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="current-focus">
        <div className="container">
          <h2>En qué estoy enfocado actualmente</h2>
          <div className="focus-grid">
            <div className="focus-item">
              <h3>Desarrollo Web</h3>
              <p>Aprendiendo React, Node.js y las mejores prácticas del desarrollo frontend moderno.</p>
            </div>
            <div className="focus-item">
              <h3>Algoritmos</h3>
              <p>Fortaleciendo mis bases en estructuras de datos y algoritmos fundamentales.</p>
            </div>
            <div className="focus-item">
              <h3>Proyectos Colaborativos</h3>
              <p>Participando en proyectos de código abierto y trabajando en equipo.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
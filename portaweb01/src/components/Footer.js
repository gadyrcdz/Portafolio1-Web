import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import personalData from '../data/personal-info.json';
import './Footer.css';

const Footer = () => {
  const { basicInfo, links } = personalData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contacto</h3>
            <div className="contact-links">
              <a href={links.email} className="contact-link">
                <Mail size={18} />
                {basicInfo.email}
              </a>
              <p className="contact-item">
                📍 {basicInfo.location}
              </p>
            </div>
          </div>

          <div className="footer-section">
            <h3>Sígueme</h3>
            <div className="social-links">
              <a 
                href={links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <Github size={20} />
                GitHub
              </a>
              <a 
                href={links.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Sobre este Portafolio</h3>
            <p>
              Desarrollado con React como parte del curso IC8057 - 
              Introducción al Desarrollo de Páginas Web del TEC.
            </p>
            <p className="tech-stack">
              <strong>Stack:</strong> React, CSS3, GitHub Pages
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>
              © {currentYear} {basicInfo.name}. Hecho con{' '}
              <Heart size={16} className="heart-icon" /> para el TEC.
            </p>
            <p className="last-updated">
              Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
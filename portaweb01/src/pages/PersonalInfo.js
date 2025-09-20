import React from 'react';
import { Download, Mail, Github, Linkedin, ExternalLink, Award } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import personalData from '../data/personal-info.json';
import './PersonalInfo.css';

const PersonalInfo = () => {
  const { basicInfo, skills, links, certifications } = personalData;

  const generatePDF = async () => {
    const element = document.getElementById('cv-content');
    
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`CV_${basicInfo.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el PDF. Por favor intenta de nuevo.');
    }
  };

  const getSkillLevel = (level) => {
    return {
      width: `${level}%`,
      backgroundColor: level >= 80 ? '#22c55e' : level >= 60 ? '#f59e0b' : '#ef4444'
    };
  };

  return (
    <div className="personal-info">
      <div className="container">
        <header className="page-header">
          <h1>Información Personal y Profesional</h1>
          <button onClick={generatePDF} className="btn btn-primary">
            <Download size={20} />
            Descargar CV en PDF
          </button>
        </header>

        <div id="cv-content" className="cv-content">
          <section className="profile-section">
            <div className="profile-card">
              <div className="profile-image">
                <img 
                  src={`${process.env.PUBLIC_URL}/${basicInfo.photo}`} 
                  alt={`Foto de ${basicInfo.name}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x200?text=Foto';
                  }}
                />
              </div>
              <div className="profile-info">
                <h2>{basicInfo.name}</h2>
                <h3>{basicInfo.title}</h3>
                <p className="location">{basicInfo.location}</p>
                
                <div className="contact-info">
                  <a href={links.email} className="contact-item">
                    <Mail size={18} />
                    {basicInfo.email}
                  </a>
                  <span className="contact-item">
                    📱 {basicInfo.phone}
                  </span>
                </div>

                <div className="social-links">
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="social-link">
                    <Github size={20} />
                    GitHub
                  </a>
                  <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                    <Linkedin size={20} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="biography-section">
            <h2>Biografía Profesional</h2>
            <div className="biography-content">
              <p>{basicInfo.bio}</p>
              <p>
                Como estudiante de Ingeniería en Computación en el Instituto Tecnológico de Costa Rica, 
                me enfoco en el desarrollo de habilidades técnicas sólidas y la aplicación práctica de 
                conocimientos en proyectos reales. Mi objetivo es contribuir al desarrollo tecnológico 
                del país mientras continúo mi crecimiento profesional.
              </p>
            </div>
          </section>

          <section className="skills-section">
            <h2>Habilidades Técnicas</h2>
            
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Lenguajes de Programación</h3>
                <div className="skills-list">
                  {skills.programming.map(skill => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          style={getSkillLevel(skill.level)}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="skill-category">
                <h3>Herramientas y Tecnologías</h3>
                <div className="skills-list">
                  {skills.tools.map(skill => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          style={getSkillLevel(skill.level)}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="certifications-section">
            <h2>Certificaciones y Formación</h2>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                  <Award size={24} className="cert-icon" />
                  <div className="cert-info">
                    <h4>{cert.name}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <p className="cert-date">{cert.date}</p>
                    {cert.link && (
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cert-link"
                      >
                        <ExternalLink size={16} />
                        Ver certificación
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="additional-info">
            <h2>Información Adicional</h2>
            <div className="info-grid">
              <div className="info-item">
                <h4>Idiomas</h4>
                <ul>
                  <li>Español - Nativo</li>
                  <li>Inglés - Intermedio</li>
                </ul>
              </div>
              <div className="info-item">
                <h4>Intereses Técnicos</h4>
                <ul>
                  <li>Desarrollo Web Full Stack</li>
                  <li>Inteligencia Artificial</li>
                  <li>Desarrollo de Software</li>
                  <li>Código Abierto</li>
                </ul>
              </div>
              <div className="info-item">
                <h4>Objetivos Profesionales</h4>
                <ul>
                  <li>Contribuir a proyectos de impacto social</li>
                  <li>Especializarme en tecnologías emergentes</li>
                  <li>Participar en comunidades tech de Costa Rica</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <footer className="page-footer">
          <p>
            Este portafolio fue desarrollado como parte del curso IC8057 - 
            Introducción al Desarrollo de Páginas Web del TEC.
          </p>
          <p>
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PersonalInfo;
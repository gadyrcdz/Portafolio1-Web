import React from 'react';

const AcademicWorks = () => {
  return (
    <div style={{ padding: '2rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Trabajos Académicos</h1>
        <p>Aquí se mostrarán todos mis trabajos universitarios organizados por curso.</p>
        
        <div style={{ marginTop: '2rem' }}>
          <h2>IC8057 - Introducción al Desarrollo de Páginas Web</h2>
          <p>I Semestre 2025</p>
          
          <div style={{ 
            background: '#f8fafc', 
            padding: '1.5rem', 
            borderRadius: '0.5rem', 
            marginTop: '1rem' 
          }}>
            <h3>Portafolio Personal</h3>
            <p><strong>Tipo:</strong> Proyecto</p>
            <p><strong>Descripción:</strong> Desarrollo de un portafolio web personal con React</p>
            <p><strong>Tecnologías:</strong> React, CSS, JavaScript, GitHub Pages</p>
            <p><strong>Estado:</strong> En desarrollo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicWorks;
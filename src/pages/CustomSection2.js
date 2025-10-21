// src/pages/CustomSection2.jsx
import React from 'react';
import './WorkInProgress.css';

function CustomSection2() {
  return (
    <div className="work-in-progress">
      <div className="content">
        <div className="icon-wrapper">
          <span className="tool-icon">⚙️</span>
        </div>
        <h1>Proyectos</h1>
        <p className="message">
          Trabajando en ello<span className="dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </p>
        <p className="sub-message">Esta sección estará disponible pronto</p>
      </div>
    </div>
  );
}

export default CustomSection2;
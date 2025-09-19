import React, { useState, useEffect } from 'react';
import { MessageCircle, User, Calendar, Star } from 'lucide-react';
import './Recommendations.css';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [newRecommendation, setNewRecommendation] = useState({
    name: '',
    email: '',
    relationship: '',
    message: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedRecommendations = localStorage.getItem('portfolio-recommendations');
    if (savedRecommendations) {
      setRecommendations(JSON.parse(savedRecommendations));
    } else {
      const exampleRecommendations = [
        {
          id: 1,
          name: "María González",
          email: "maria.gonzalez@estudiantec.cr",
          relationship: "Compañera de clase",
          message: "Excelente compañero de equipo. Siempre dispuesto a ayudar y con gran capacidad para resolver problemas técnicos.",
          rating: 5,
          date: "2024-02-15"
        },
        {
          id: 2,
          name: "Carlos Rodríguez",
          email: "carlos.rodriguez@estudiantec.cr", 
          relationship: "Compañero de laboratorio",
          message: "Muy responsable y organizado. Sus aportes en los proyectos grupales siempre son de gran calidad.",
          rating: 5,
          date: "2024-02-10"
        }
      ];
      setRecommendations(exampleRecommendations);
      localStorage.setItem('portfolio-recommendations', JSON.stringify(exampleRecommendations));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecommendation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validación básica
    if (!newRecommendation.name || !newRecommendation.message) {
      alert('Por favor completa al menos tu nombre y mensaje.');
      setIsSubmitting(false);
      return;
    }

    const recommendation = {
      id: Date.now(),
      ...newRecommendation,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedRecommendations = [...recommendations, recommendation];
    setRecommendations(updatedRecommendations);
    localStorage.setItem('portfolio-recommendations', JSON.stringify(updatedRecommendations));

    setNewRecommendation({
      name: '',
      email: '',
      relationship: '',
      message: '',
      rating: 5
    });

    setIsSubmitting(false);
    alert('¡Gracias por tu recomendación!');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="recommendations">
      <div className="container">
        <header className="page-header">
          <h1>Recomendaciones de Compañeros</h1>
          <p>
            Este es un espacio donde mis compañeros de estudio pueden compartir 
            sus experiencias trabajando conmigo. ¡Agradezco mucho sus comentarios!
          </p>
        </header>

        <div className="recommendations-content">
          <div className="recommendations-list">
            <h2>
              <MessageCircle size={24} />
              Recomendaciones ({recommendations.length})
            </h2>

            {recommendations.length === 0 ? (
              <div className="no-recommendations">
                <p>Aún no hay recomendaciones. ¡Sé el primero en dejar una!</p>
              </div>
            ) : (
              <div className="recommendations-grid">
                {recommendations.map(recommendation => (
                  <div key={recommendation.id} className="recommendation-card">
                    <div className="recommendation-header">
                      <div className="author-info">
                        <User size={20} className="author-avatar" />
                        <div>
                          <h4>{recommendation.name}</h4>
                          <p className="relationship">{recommendation.relationship}</p>
                        </div>
                      </div>
                      <div className="recommendation-meta">
                        <div className="rating">
                          {renderStars(recommendation.rating)}
                        </div>
                        <div className="date">
                          <Calendar size={14} />
                          {formatDate(recommendation.date)}
                        </div>
                      </div>
                    </div>
                    <div className="recommendation-message">
                      <p>"{recommendation.message}"</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="recommendation-form-section">
            <h2>Deja tu Recomendación</h2>
            <p>
              Si has trabajado conmigo en algún proyecto o clase, me encantaría 
              conocer tu experiencia. Tu recomendación es muy valiosa para mí.
            </p>

            <form onSubmit={handleSubmit} className="recommendation-form">
              <div className="form-group">
                <label htmlFor="name">Nombre *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newRecommendation.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newRecommendation.email}
                  onChange={handleInputChange}
                  placeholder="tu.email@estudiantec.cr"
                />
              </div>

              <div className="form-group">
                <label htmlFor="relationship">Relación</label>
                <select
                  id="relationship"
                  name="relationship"
                  value={newRecommendation.relationship}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Compañero de clase">Compañero de clase</option>
                  <option value="Compañero de laboratorio">Compañero de laboratorio</option>
                  <option value="Compañero de proyecto">Compañero de proyecto</option>
                  <option value="Compañero de estudio">Compañero de estudio</option>
                  <option value="Amigo">Amigo</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rating">Calificación</label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`star-button ${star <= newRecommendation.rating ? 'active' : ''}`}
                      onClick={() => handleInputChange({ target: { name: 'rating', value: star } })}
                    >
                      <Star size={20} />
                    </button>
                  ))}
                  <span className="rating-text">({newRecommendation.rating}/5)</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={newRecommendation.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="Comparte tu experiencia trabajando conmigo. ¿Qué destacarías? ¿Cómo fue la colaboración?"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Recomendación'}
              </button>
            </form>
          </div>
        </div>

        <div className="recommendation-guidelines">
          <h3>Pautas para Recomendaciones</h3>
          <ul>
            <li>Sé honesto y constructivo en tus comentarios</li>
            <li>Comparte experiencias específicas de trabajo en equipo</li>
            <li>Menciona habilidades técnicas o blandas que hayas observado</li>
            <li>Mantén un tono profesional y respetuoso</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
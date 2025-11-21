import React, { useState, useEffect } from 'react';
import { MessageCircle, User, Calendar, Star, Loader, RefreshCw, CheckCircle, X, AlertCircle } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // Configuración: usa variables de entorno o valores por defecto
  const JSONBIN_API_KEY = process.env.REACT_APP_JSONBIN_API_KEY || '$2a$10$0A84o7quX1c5KEyvficp5uCod9xF78sflx17g6tnL/1wB/ZDxSQY.';
  const JSONBIN_BIN_ID = process.env.REACT_APP_JSONBIN_BIN_ID || '6920d246ae596e708f68352a';

  const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

  console.log(JSONBIN_URL);
  // Función para mostrar toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000); // Desaparece después de 4 segundos
  };

  // Verificar configuración
  useEffect(() => {
    if (JSONBIN_API_KEY === 'TU_API_KEY_AQUI' || JSONBIN_BIN_ID === 'TU_BIN_ID_AQUI') {
      console.error('JSONBin.io no está configurado correctamente.');
      console.error('Por favor, configura REACT_APP_JSONBIN_API_KEY y REACT_APP_JSONBIN_BIN_ID');
      setError('El sistema de recomendaciones no está configurado. Contacta al administrador.');
      setIsLoading(false);
    }
  }, [JSONBIN_API_KEY, JSONBIN_BIN_ID]);

  useEffect(() => {
    if (JSONBIN_API_KEY !== 'TU_API_KEY_AQUI' && JSONBIN_BIN_ID !== 'TU_BIN_ID_AQUI') {
      fetchRecommendations();
    }
  }, []);

  // Función para obtener recomendaciones desde JSONBin
  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(JSONBIN_URL + '/latest', {
        method: 'GET',
        headers: {
          'X-Master-Key': JSONBIN_API_KEY,
          'X-Bin-Meta': 'false'
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Ordenar por fecha más reciente primero
      const sortedRecommendations = (data || []).sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      
      setRecommendations(sortedRecommendations);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('No se pudieron cargar las recomendaciones. Intenta recargar la página.');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para guardar recomendaciones en JSONBin
  const saveRecommendations = async (updatedRecommendations) => {
    try {
      const response = await fetch(JSONBIN_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY
        },
        body: JSON.stringify(updatedRecommendations)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al guardar la recomendación');
      }

      return true;
    } catch (err) {
      console.error('Error saving recommendations:', err);
      throw err;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecommendation(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validación
    if (!newRecommendation.name.trim()) {
      showToast('Por favor ingresa tu nombre', 'error');
      setIsSubmitting(false);
      return;
    }

    if (!newRecommendation.message.trim() || newRecommendation.message.trim().length < 10) {
      showToast('El mensaje debe tener al menos 10 caracteres', 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      const recommendation = {
        id: Date.now(),
        name: newRecommendation.name.trim(),
        email: newRecommendation.email.trim(),
        relationship: newRecommendation.relationship || 'No especificado',
        message: newRecommendation.message.trim(),
        rating: newRecommendation.rating,
        date: new Date().toISOString().split('T')[0]
      };

      const updatedRecommendations = [recommendation, ...recommendations];
      
      await saveRecommendations(updatedRecommendations);
      
      setRecommendations(updatedRecommendations);

      setNewRecommendation({
        name: '',
        email: '',
        relationship: '',
        message: '',
        rating: 5
      });

      showToast('¡Gracias por tu recomendación! Se ha guardado exitosamente', 'success');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submit error:', err);
      showToast('Error al enviar la recomendación. Intenta de nuevo', 'error');
    } finally {
      setIsSubmitting(false);
    }
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
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (err) {
      return dateString;
    }
  };

  return (
    <div className="recommendations">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
          </div>
          <p className="toast-message">{toast.message}</p>
          <button 
            className="toast-close" 
            onClick={() => setToast(null)}
            aria-label="Cerrar notificación"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="container">
        <header className="page-header">
          <h1>Recomendaciones de Compañeros</h1>
          <p>
            Este es un espacio donde mis compañeros de estudio pueden compartir 
            sus experiencias trabajando conmigo. ¡Agradezco mucho sus comentarios!
          </p>
        </header>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchRecommendations} className="btn-retry">
              <RefreshCw size={16} />
              Reintentar
            </button>
          </div>
        )}

        <div className="recommendations-content">
          <div className="recommendations-list">
            <div className="section-header">
              <h2>
                <MessageCircle size={24} />
                Recomendaciones ({recommendations.length})
              </h2>
            </div>

            {isLoading ? (
              <div className="loading-state">
                <Loader className="spinner" size={32} />
                <p>Cargando recomendaciones...</p>
              </div>
            ) : recommendations.length === 0 ? (
              <div className="no-recommendations">
                <MessageCircle size={48} />
                <p>Aún no hay recomendaciones.</p>
                <p>¡Sé el primero en dejar una!</p>
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
                          {recommendation.relationship && (
                            <p className="relationship">{recommendation.relationship}</p>
                          )}
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
                  maxLength="100"
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
                  placeholder="tu.email@estudiantec.cr (opcional)"
                  maxLength="100"
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
                      aria-label={`${star} estrellas`}
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
                  minLength="10"
                  maxLength="500"
                />
                <small className="char-count">
                  {newRecommendation.message.length}/500 caracteres
                </small>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting || JSONBIN_API_KEY === 'TU_API_KEY_AQUI'}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="spinner" size={16} />
                    Enviando...
                  </>
                ) : (
                  'Enviar Recomendación'
                )}
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
// src/pages/CustomSection3.js (Hobbies e Intereses)
import React, { useState } from 'react';
import { Camera, Music, Book, Gamepad2, Mountain, Code, Heart } from 'lucide-react';
import './CustomSection3.css';

const CustomSection3 = () => {
  const [selectedHobby, setSelectedHobby] = useState(null);

  const hobbies = [
    {
      id: 1,
      title: "Fotografía",
      icon: <Camera size={32} />,
      description: "Capturando momentos y paisajes de Costa Rica",
      longDescription: "La fotografía me permite explorar la belleza natural de Costa Rica mientras desarrollo mi ojo artístico. Me especializo en fotografía de paisajes y arquitectura.",
      gallery: [
        "/images/photo1.jpg",
        "/images/photo2.jpg",
        "/images/photo3.jpg"
      ],
      skills: ["Composición", "Edición digital", "Fotografía nocturna"],
      equipment: ["Canon EOS 250D", "Lente 18-55mm", "Adobe Lightroom"],
      achievements: [
        "Participé en concurso de fotografía del TEC 2023",
        "Instagram con 500+ seguidores",
        "Fotografías publicadas en revista estudiantil"
      ]
    },
    {
      id: 2,
      title: "Música",
      icon: <Music size={32} />,
      description: "Guitarra acústica y producción musical digital",
      longDescription: "Toco guitarra desde hace 5 años y recientemente me he interesado en la producción musical digital, combinando mi pasión por la música con la tecnología.",
      gallery: [],
      skills: ["Guitarra acústica", "Producción en DAW", "Teoría musical"],
      equipment: ["Guitarra Yamaha F310", "Audio interface", "FL Studio"],
      achievements: [
        "3 años de clases formales de guitarra",
        "Produje 2 covers instrumentales",
        "Participé en noches de talentos del TEC"
      ]
    },
    {
      id: 3,
      title: "Lectura",
      icon: <Book size={32} />,
      description: "Ciencia ficción, tecnología y desarrollo personal",
      longDescription: "Soy un ávido lector, especialmente de ciencia ficción y libros sobre tecnología. También disfruto libros de desarrollo personal y biografías de personas influyentes en tech.",
      gallery: [],
      skills: ["Análisis crítico", "Velocidad de lectura", "Síntesis de información"],
      equipment: ["Kindle Paperwhite", "Biblioteca personal", "Audible"],
      achievements: [
        "40+ libros leídos en 2023",
        "Reseñas en Goodreads",
        "Club de lectura TEC member"
      ],
      currentlyReading: [
        "Clean Code - Robert C. Martin",
        "Dune - Frank Herbert",
        "The Pragmatic Programmer - David Thomas"
      ],
      favoriteBooks: [
        "The Martian - Andy Weir",
        "Steve Jobs - Walter Isaacson", 
        "Atomic Habits - James Clear"
      ]
    },
    {
      id: 4,
      title: "Gaming",
      icon: <Gamepad2 size={32} />,
      description: "Estrategia, puzzles y desarrollo de juegos indie",
      longDescription: "Los videojuegos han sido una pasión desde la infancia. Me interesan especialmente los juegos de estrategia y puzzles, y estoy explorando el desarrollo de juegos como hobby.",
      gallery: [],
      skills: ["Pensamiento estratégico", "Resolución de problemas", "Game design basics"],
      equipment: ["PC Gaming", "Nintendo Switch", "Steam Deck"],
      achievements: [
        "Rank Diamond en varios juegos competitivos",
        "Prototipo de juego en desarrollo",
        "Comunidad local de gaming"
      ],
      favoriteGames: [
        "Civilization VI",
        "Portal series",
        "The Legend of Zelda",
        "Factorio"
      ]
    },
    {
      id: 5,
      title: "Senderismo",
      icon: <Mountain size={32} />,
      description: "Explorando montañas y volcanes de Costa Rica",
      longDescription: "Costa Rica ofrece increíbles oportunidades para el senderismo. He explorado varios volcanes y montañas, combinando ejercicio con fotografía de naturaleza.",
      gallery: [],
      skills: ["Orientación", "Preparación física", "Supervivencia básica"],
      equipment: ["Botas de montaña", "Mochila 40L", "GPS Garmin"],
      achievements: [
        "Ascenso al Chirripó (2 veces)",
        "Volcán Poás, Irazú, Arenal visitados",
        "15+ rutas completadas"
      ],
      plannedTrips: [
        "Caminata nocturna Monteverde",
        "Sendero Los Quetzales",
        "Parque Nacional Corcovado"
      ]
    },
    {
      id: 6,
      title: "Programación Recreativa",
      icon: <Code size={32} />,
      description: "Coding challenges, algoritmos y proyectos experimentales",
      longDescription: "Más allá de las tareas académicas, disfruto resolviendo problemas de programación, participando en coding challenges y experimentando con nuevas tecnologías.",
      gallery: [],
      skills: ["Problem solving", "Algoritmos", "Multiple languages"],
      equipment: ["Multiple IDEs", "GitHub account", "LeetCode Premium"],
      achievements: [
        "100+ problemas resueltos en LeetCode",
        "Participé en hackathon local",
        "Contribuciones a proyectos open source"
      ],
      platforms: [
        "LeetCode",
        "HackerRank", 
        "Codewars",
        "Project Euler"
      ]
    }
  ];

  const interests = [
    {
      category: "Tecnología",
      items: [
        "Inteligencia Artificial y Machine Learning",
        "Desarrollo de aplicaciones móviles",
        "Blockchain y criptomonedas",
        "Internet of Things (IoT)",
        "Realidad Virtual y Aumentada"
      ]
    },
    {
      category: "Ciencias",
      items: [
        "Astronomía y exploración espacial",
        "Física cuántica",
        "Neurociencia cognitiva",
        "Biotecnología",
        "Energías renovables"
      ]
    },
    {
      category: "Cultura",
      items: [
        "Historia de la tecnología",
        "Filosofía de la ciencia",
        "Arte digital y generativo",
        "Documentales científicos",
        "Podcasts de tecnología"
      ]
    }
  ];

  return (
    <div className="hobbies-section">
      <div className="container">
        <header className="section-header">
          <h1>Hobbies e Intereses</h1>
          <p>
            Más allá de la programación, tengo diversas pasiones que enriquecen mi perspectiva 
            y me ayudan a mantener un equilibrio saludable entre trabajo y vida personal.
          </p>
        </header>

        <section className="hobbies-grid">
          <h2>Mis Hobbies Principales</h2>
          <div className="hobbies-cards">
            {hobbies.map(hobby => (
              <div 
                key={hobby.id} 
                className={`hobby-card ${selectedHobby === hobby.id ? 'expanded' : ''}`}
                onClick={() => setSelectedHobby(selectedHobby === hobby.id ? null : hobby.id)}
              >
                <div className="hobby-header">
                  <div className="hobby-icon">{hobby.icon}</div>
                  <div className="hobby-info">
                    <h3>{hobby.title}</h3>
                    <p>{hobby.description}</p>
                  </div>
                </div>

                {selectedHobby === hobby.id && (
                  <div className="hobby-details">
                    <p className="hobby-long-description">{hobby.longDescription}</p>
                    
                    <div className="hobby-sections">
                      <div className="hobby-section">
                        <h4>Habilidades Desarrolladas</h4>
                        <ul>
                          {hobby.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="hobby-section">
                        <h4>Equipo/Herramientas</h4>
                        <ul>
                          {hobby.equipment.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="hobby-section">
                        <h4>Logros Destacados</h4>
                        <ul>
                          {hobby.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>

                      {hobby.favoriteBooks && (
                        <div className="hobby-section">
                          <h4>Libros Favoritos</h4>
                          <ul>
                            {hobby.favoriteBooks.map((book, index) => (
                              <li key={index}>{book}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {hobby.favoriteGames && (
                        <div className="hobby-section">
                          <h4>Juegos Favoritos</h4>
                          <ul>
                            {hobby.favoriteGames.map((game, index) => (
                              <li key={index}>{game}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {hobby.platforms && (
                        <div className="hobby-section">
                          <h4>Plataformas de Práctica</h4>
                          <ul>
                            {hobby.platforms.map((platform, index) => (
                              <li key={index}>{platform}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="interests-section">
          <h2>Áreas de Interés</h2>
          <p>Temas que me fascinan y sobre los que me gusta aprender continuamente:</p>
          
          <div className="interests-grid">
            {interests.map((category, index) => (
              <div key={index} className="interest-category">
                <h3>{category.category}</h3>
                <ul>
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Heart size={16} className="interest-icon" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="balance-section">
          <h2>¿Por qué estos hobbies?</h2>
          <div className="balance-content">
            <p>
              Creo firmemente en la importancia del equilibrio entre vida académica/profesional 
              y personal. Cada uno de estos hobbies me aporta algo diferente:
            </p>
            
            <div className="balance-benefits">
              <div className="benefit-item">
                <h4>Creatividad</h4>
                <p>La fotografía y música estimulan mi lado creativo, esencial para resolver problemas de programación de formas innovadoras.</p>
              </div>
              
              <div className="benefit-item">
                <h4>Concentración</h4>
                <p>La lectura y los puzzles en videojuegos mejoran mi capacidad de concentración y análisis profundo.</p>
              </div>
              
              <div className="benefit-item">
                <h4>Bienestar Físico</h4>
                <p>El senderismo me mantiene activo y me conecta con la naturaleza, reduciendo el estrés del estudio.</p>
              </div>
              
              <div className="benefit-item">
                <h4>Aprendizaje Continuo</h4>
                <p>Todos estos hobbies involucran aprendizaje constante, manteniendo mi mente curiosa y abierta.</p>
              </div>
            </div>
            
            <div className="future-goals">
              <h3>Metas Futuras</h3>
              <ul>
                <li>Crear un blog combinando fotografía y tecnología</li>
                <li>Desarrollar un videojuego simple como proyecto personal</li>
                <li>Completar el ascenso a todos los volcanes de Costa Rica</li>
                <li>Leer 50 libros en 2024</li>
                <li>Aprender producción musical avanzada</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="community-section">
          <h2>Comunidad y Colaboración</h2>
          <p>
            Muchos de estos hobbies los disfruto tanto en solitario como en comunidad. 
            Participar en grupos y comunidades ha enriquecido significativamente mis experiencias:
          </p>
          
          <div className="community-grid">
            <div className="community-item">
              <h4>Club de Fotografía TEC</h4>
              <p>Salidas grupales y retroalimentación constructiva</p>
            </div>
            
            <div className="community-item">
              <h4>Grupo de Senderismo</h4>
              <p>Exploración segura y compartir conocimientos de montañismo</p>
            </div>
            
            <div className="community-item">
              <h4>Gaming Community</h4>
              <p>Torneos locales y discusiones sobre game design</p>
            </div>
            
            <div className="community-item">
              <h4>Club de Lectura</h4>
              <p>Análisis de libros tech y discusiones filosóficas</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomSection3;
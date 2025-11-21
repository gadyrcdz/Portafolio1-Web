// src/pages/CustomSection3.js (Hobbies e Intereses)
import React, { useState } from 'react';
import { Icon } from "lucide-react";
import { soccerBall } from "@lucide/lab";
import { Gamepad2, Mountain, Code, Heart } from 'lucide-react';
import './CustomSection3.css';

const CustomSection3 = () => {
  const [selectedHobby, setSelectedHobby] = useState(null);

  const hobbies = [
    {
      id: 1,
      title: "Futbol",
      icon: <Icon iconNode={soccerBall} size={32} />,
      description: "Haciendo deporte y participando en torneos",
      longDescription:
        "El jugar futbol me relaja, desde que estoy pequeño he jugado futbol, tanto de manera de torneos como lo clasico de las 'mejengas', desde que empece la universidad y me generó ese estrés universitario, el entrenar, jugar y correr. Hace que todo ese estrés salga.",
      skills: ["Pivot en futsal", "Delantero en futbol 11"],
      equipment: [],
      achievements: [
        "Participé en torneos con la universidad",
        "Represento al TEC de Limón",
        "Entrené con Saprissa en la menor"
      ]
    },
    {
      id: 2,
      title: "Gaming",
      icon: <Gamepad2 size={32} />,
      description: "Juegos de shooter, FIFA, GTA",
      longDescription: "Los videojuegos han sido una pasión desde la infancia. Me interesan especialmente los juegos de estrategia, y estoy explorando el desarrollo de juegos como hobby.",
      gallery: [],
      skills: ["Pensamiento estratégico", "Resolución de problemas", "Game design basics"],
      equipment: ["PC Gaming", "Play Station", "PSP"],
      achievements: [
        "Rank Diamond en varios juegos competitivos",
        "Prototipo de juego en desarrollo",
        "Comunidad local de gaming"
      ],
      favoriteGames: [
        "Call of Duty",
        "FIFA",
        "Rainbow Six",
        "Counter-Strike"
      ]
    },
    {
      id: 3,
      title: "Senderismo",
      icon: <Mountain size={32} />,
      description: "Explorando montañas y volcanes de Costa Rica",
      longDescription: "Trabajo en la empresa familiar como guía turistico, haciendo tanto tours de senderos como de canopy. He explorado varios volcanes y montañas, tanto en Costa Rica como en otros países.",
      gallery: [],
      skills: ["Orientación", "Preparación física", "Supervivencia básica"],
      equipment: ["Zapatos de montaña", "Bolso", "Agua"],
      achievements: [
        "Ascenso al Chirripó ",
        "Volcán Poás, Cerro negro, Arenal visitados",
        "5 rutas completadas"
      ],
      plannedTrips: [
        "Caminata nocturna Monteverde",
        "Sendero Los Quetzales",
        "Parque Nacional Corcovado"
      ]
    },
    {
      id: 4,
      title: "Programación Recreativa",
      icon: <Code size={32} />,
      description: "Coding challenges, algoritmos y proyectos experimentales",
      longDescription: "Más allá de las tareas académicas, me gusta hacer ejercicios de programación y hackatons participando en coding challenges y experimentando con nuevas tecnologías.",
      gallery: [],
      skills: ["Problem solving", "Algoritmos", "Multiple languages"],
      equipment: ["Multiple IDEs", "GitHub account", "LeetCode Premium"],
      achievements: [
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
      category: "Cultura",
      items: [
        "Historia de la tecnología",
        "Podcasts de tecnología",
        "Historia del mundo",
        "Historia sobre Limón"
      ]
    }
  ];

  const handleHobbyClick = (hobbyId) => {
    console.log(hobbyId);
    if (selectedHobby === hobbyId) {
      console.log("Hobby", hobbyId);
      console.log("Selected",selectedHobby);

      setSelectedHobby(null);
    } else {
      setSelectedHobby(hobbyId);
    }
  };

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
                onClick={() => handleHobbyClick(hobby.id)}
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

                      {hobby.plannedTrips && (
                        <div className="hobby-section">
                          <h4>Viajes Planeados</h4>
                          <ul>
                            {hobby.plannedTrips.map((trip, index) => (
                              <li key={index}>{trip}</li>
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
                <h4>Proactivo</h4>
                <p>Ser una persona proactiva a la hora de estudiar y aprender, estar en constante aprendizaje de lo que se mueve en el mercado además de las tecnologías.</p>
              </div>
              
              <div className="benefit-item">
                <h4>Concentración</h4>
                <p>El escuchar música constantemente me mantiene relajado y me ayuda a trabajar mejor, además de quitarme el aburrimiento.</p>
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
                <li>Crear una aplicación utilizando una blockchain y Smart Contracts combinando tecnologías</li>
                <li>Desarrollar un videojuego simple como proyecto personal</li>
                <li>Completar el ascenso a todos los volcanes de Costa Rica</li>
                <li>Tener una YAMAHA R1</li>
                <li>Ser un empresario exitoso</li>
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
              <h4>Comunidad DojoCoding</h4>
              <p>Comunidad de Dojo Coding, una comunidad directa del WEB3 y blockchain en Costa Rica</p>
            </div>
            
            <div className="community-item">
              <h4>Guía de Senderismo</h4>
              <p>Trabajar con cruceros en temporada alta</p>
            </div>
            
            <div className="community-item">
              <h4>Gaming Community</h4>
              <p>Torneos locales y discusiones sobre game design</p>
            </div>
            
            <div className="community-item">
              <h4>Motocicletas</h4>
              <p>Salir en rodadas con amigos y participar en giras</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomSection3;
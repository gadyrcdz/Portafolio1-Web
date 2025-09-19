import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Tag, ExternalLink } from 'lucide-react';
import './CustomSection1.css';

const CustomSection1 = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  // Datos de ejemplo para el blog (en producción vendrían de un archivo JSON)
  const samplePosts = [
    {
      id: 1,
      title: "Mi Primera Experiencia con React",
      excerpt: "Reflexiones sobre aprender React como framework para desarrollo web moderno...",
      content: `
        Al comenzar mi journey con React, me di cuenta de que el paradigma de componentes 
        cambia completamente la forma de pensar sobre el desarrollo web. En este artículo 
        comparto mis primeras impresiones y los conceptos que más me costaron entender.

        ## Conceptos Clave
        - JSX y la sintaxis híbrida
        - Estado y props
        - Ciclo de vida de componentes
        - Hooks básicos (useState, useEffect)

        ## Desafíos Iniciales
        El concepto que más me costó al inicio fue entender el flujo de datos unidireccional...
      `,
      date: "2024-02-20",
      readTime: "5 min",
      tags: ["React", "JavaScript", "Aprendizaje"],
      published: true
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox: ¿Cuándo usar cada uno?",
      excerpt: "Una comparación práctica de estas dos tecnologías de layout modernas...",
      content: `
        Después de trabajar en varios proyectos, he desarrollado una comprensión más clara 
        de cuándo usar CSS Grid vs Flexbox. Aquí comparto mis criterios de decisión.

        ## CSS Grid: Para layouts bidimensionales
        - Diseños complejos con filas y columnas
        - Alineación precisa de elementos
        - Responsive design con áreas nombradas

        ## Flexbox: Para layouts unidimensionales
        - Distribución de elementos en una dirección
        - Alineación de contenido dentro de contenedores
        - Navegaciones y barras de herramientas
      `,
      date: "2024-02-15",
      readTime: "7 min",
      tags: ["CSS", "Layout", "Web Design"],
      published: true
    },
    {
      id: 3,
      title: "Configurando mi Primer Proyecto con Vite",
      excerpt: "Tutorial paso a paso para configurar un entorno de desarrollo moderno...",
      content: `
        Vite ha revolutionado la forma en que configuramos proyectos de frontend. 
        En este tutorial muestro cómo configurar un proyecto desde cero.

        ## ¿Por qué Vite?
        - Desarrollo ultra-rápido con Hot Module Replacement
        - Configuración mínima out-of-the-box
        - Soporte nativo para TypeScript, JSX, CSS modules

        ## Pasos de configuración
        1. Instalación inicial
        2. Configuración de plugins
        3. Estructura de carpetas recomendada
      `,
      date: "2024-02-10",
      readTime: "4 min",
      tags: ["Vite", "Tooling", "JavaScript"],
      published: true
    }
  ];

  useEffect(() => {
    setBlogPosts(samplePosts);
  }, []);

  const filteredPosts = selectedTag 
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-section">
      <div className="container">
        <header className="blog-header">
          <h1>Blog Técnico</h1>
          <p>
            Aquí comparto mis experiencias, aprendizajes y reflexiones sobre 
            desarrollo web, programación y tecnología en general.
          </p>
        </header>

        <div className="blog-filters">
          <div className="tags-filter">
            <button 
              className={`tag-button ${!selectedTag ? 'active' : ''}`}
              onClick={() => setSelectedTag('')}
            >
              Todos
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-grid">
          {filteredPosts.map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-header">
                <h2>{post.title}</h2>
                <div className="blog-meta">
                  <span className="meta-item">
                    <Calendar size={16} />
                    {formatDate(post.date)}
                  </span>
                  <span className="meta-item">
                    <Clock size={16} />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <p className="blog-excerpt">{post.excerpt}</p>

              <div className="blog-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="blog-tag">
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="blog-content">
                <div dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n/g, '<br>').replace(/## (.*)/g, '<h3>$1</h3>')
                }} />
              </div>

              <div className="blog-actions">
                <button className="read-more-btn">
                  Leer más
                  <ExternalLink size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="no-posts">
            <p>No hay artículos con la etiqueta "{selectedTag}"</p>
            <button onClick={() => setSelectedTag('')} className="btn btn-primary">
              Ver todos los artículos
            </button>
          </div>
        )}

        <div className="blog-footer">
          <h3>Sobre este Blog</h3>
          <p>
            Este blog documenta mi journey como estudiante de Ingeniería en Computación. 
            Aquí comparto code snippets, tutoriales, reflexiones sobre tecnologías que 
            estoy aprendiendo y proyectos en los que estoy trabajando.
          </p>
          <p>
            Si tienes preguntas o sugerencias sobre algún artículo, no dudes en 
            contactarme a través de mis redes sociales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomSection1;
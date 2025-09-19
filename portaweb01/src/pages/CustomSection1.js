import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Tag, User } from 'lucide-react';
import blogData from '../data/blog-posts.json';
import './CustomSection1.css';

const CustomSection1 = () => {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    setPosts(blogData.posts.filter(post => post.published));
  }, []);

  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  const allTags = blogData.tags;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content) => {
    // Convertir markdown básico a HTML
    let html = content
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/## (.*?)(?=<)/g, '<h3>$1</h3>')
      .replace(/### (.*?)(?=<)/g, '<h4>$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```(\w+)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
    
    return `<p>${html}</p>`;
  };

  const togglePost = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <div className="blog-section">
      <div className="container">
        <header className="blog-header">
          <h1>Blog Técnico</h1>
          <p>
            Reflexiones, aprendizajes y experiencias sobre desarrollo web, blockchain 
            y tecnologías emergentes. Comparto mi journey como desarrollador y contribuidor 
            open source.
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

        <div className="blog-posts">
          {filteredPosts.map(post => (
            <article key={post.id} className="blog-post">
              <div className="post-header">
                <h2>{post.title}</h2>
                <div className="post-meta">
                  <span className="meta-item">
                    <Calendar size={16} />
                    {formatDate(post.date)}
                  </span>
                  <span className="meta-item">
                    <Clock size={16} />
                    {post.readTime}
                  </span>
                  <span className="meta-item">
                    <User size={16} />
                    {post.author}
                  </span>
                </div>
              </div>

              <p className="post-excerpt">{post.excerpt}</p>

              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="post-tag">
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>

              {expandedPost === post.id ? (
                <div className="post-content">
                  <div 
                    className="content-html"
                    dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                  />
                  <button 
                    className="read-more-btn collapsed"
                    onClick={() => togglePost(post.id)}
                  >
                    Leer menos
                  </button>
                </div>
              ) : (
                <button 
                  className="read-more-btn"
                  onClick={() => togglePost(post.id)}
                >
                  Leer artículo completo
                </button>
              )}
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
            En este blog comparto mi experiencia como desarrollador full stack y contribuidor 
            en proyectos blockchain. Encontrarás artículos sobre mis contribuciones en OnlyDust, 
            experiencias con Starknet y Stellar, tutoriales prácticos y reflexiones sobre el 
            ecosistema tecnológico en Costa Rica.
          </p>
          <p>
            Los artículos reflejan mi journey de aprendizaje continuo en el mundo del desarrollo 
            web y blockchain. Si tienes preguntas o sugerencias sobre algún tema, no dudes en 
            contactarme a través de mis redes sociales.
          </p>
          
          <div className="blog-stats">
            <div className="stat">
              <strong>{posts.length}</strong>
              <span>Artículos publicados</span>
            </div>
            <div className="stat">
              <strong>{allTags.length}</strong>
              <span>Temas cubiertos</span>
            </div>
            <div className="stat">
              <strong>2025</strong>
              <span>Año de inicio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSection1;
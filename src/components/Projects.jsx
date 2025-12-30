import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const projects = [
  {
    id: 1,
    title: "Tamil Character Recognition",
    category: "Deep Learning",
    tech: ["CNN", "PyTorch", "NumPy"],
    desc: "Custom CNN to recognize ancient Tamil characters with 91.8% accuracy.",
    size: "large",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: "🔮",
    stats: { accuracy: "91.8%", samples: "50K+" }
  },
  {
    id: 2,
    title: "LiDAR Scene Understanding",
    category: "Computer Vision",
    tech: ["3D Point Clouds", "PCL", "ROS"],
    desc: "Processing raw LiDAR into semantic representations for urban infrastructure.",
    size: "medium",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    icon: "🌐",
    stats: { precision: "94.2%", fps: "30+" }
  },
  {
    id: 3,
    title: "AI Legal Co-Pilot",
    category: "NLP / LLMs",
    tech: ["Transformers", "RAG", "LangChain"],
    desc: "Verified citation workflows and document drafting aids for lawyers.",
    size: "small",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    icon: "⚖️",
    stats: { citations: "99.1%", docs: "1M+" }
  },
  {
    id: 4,
    title: "Heart Disease Detection",
    category: "Healthcare AI",
    tech: ["LSTM", "CNN", "TensorFlow"],
    desc: "Hybrid architecture combining LSTM and CNN for risk prediction.",
    size: "small",
    gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    icon: "❤️",
    stats: { auc: "0.96", patients: "10K+" }
  },
  {
    id: 5,
    title: "Precision Agriculture",
    category: "IoT & AI",
    tech: ["Satellite", "ML", "IoT"],
    desc: "Optimizing crop planning using satellite data and on-field sensors.",
    size: "medium",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    icon: "🌾",
    stats: { yield: "+23%", acres: "500+" }
  }
];

// Random gradient colors for border glow
const gradientColors = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
  'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
  'linear-gradient(135deg, #14b8a6 0%, #22d3ee 100%)',
  'linear-gradient(135deg, #facc15 0%, #84cc16 100%)',
  'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
];

const ProjectCard = ({ project, index, onClick }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentGradient, setCurrentGradient] = useState(project.gradient);
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    // Cancel any pending RAF to avoid stacking
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });

      // 3D tilt effect - reduced intensity for performance
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      
      cardRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${-rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Pick a random gradient color on each hover
    const randomGradient = gradientColors[Math.floor(Math.random() * gradientColors.length)];
    setCurrentGradient(randomGradient);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`project-card-modern ${project.size}`}
      onClick={() => onClick(project)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--gradient': currentGradient,
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`,
        animationDelay: `${index * 0.1}s`
      }}
    >
      {/* Animated gradient border */}
      <div className="card-border-glow" />
      
      {/* Spotlight effect */}
      <div className="card-spotlight" />
      
      {/* Content */}
      <div className="card-inner">
        {/* Header with icon and category */}
        <div className="card-top">
          <div className="card-icon">{project.icon}</div>
          <span className="card-category">{project.category}</span>
          <div className={`card-arrow ${isHovered ? 'visible' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </div>
        </div>

        {/* Title and description */}
        <div className="card-main">
          <h3 className="card-title">{project.title}</h3>
          <p className="card-desc">{project.desc}</p>
        </div>

        {/* Stats */}
        <div className="card-stats">
          {Object.entries(project.stats).map(([key, value]) => (
            <div key={key} className="project-stat-item">
              <span className="project-stat-value">{value}</span>
              <span className="project-stat-label">{key}</span>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="card-tags">
          {project.tech.map((t, i) => (
            <span key={i} className="tech-pill">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { viewMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="container">
        {/* Section header */}
        <div className="section-header">
          <span className="section-label">{viewMode === 'visual' ? '// Featured Projects' : '// PROJECT_MANIFEST'}</span>
          <h2 className="section-title">{viewMode === 'visual' ? 'Selected Work' : 'PROJECT_MANIFEST'}</h2>
          <p className="section-subtitle">A curated collection of AI/ML projects and research</p>
        </div>

        {viewMode === 'visual' ? (
          <div className={`bento-grid-modern ${isVisible ? 'visible' : ''}`}>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          <div className="technical-projects">
            <table className="tech-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>PROJECT_NAME</th>
                  <th>STACK</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id}>
                    <td>0x0{p.id}</td>
                    <td>{p.title}</td>
                    <td>[{p.tech.join(', ')}]</td>
                    <td style={{ color: 'var(--accent-cyan)' }}>DEPLOYED</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal (Visual Mode Only) */}
      {selectedProject && viewMode === 'visual' && (
        <div className="modal-overlay-modern" onClick={() => setSelectedProject(null)}>
          <div className="modal-content-modern" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            
            <div className="modal-icon">{selectedProject.icon}</div>
            <span className="modal-category">{selectedProject.category}</span>
            <h2 className="modal-title">{selectedProject.title}</h2>
            
            <div className="modal-stats-row">
              {Object.entries(selectedProject.stats).map(([key, value]) => (
                <div key={key} className="modal-stat">
                  <span className="modal-stat-value">{value}</span>
                  <span className="modal-stat-label">{key}</span>
                </div>
              ))}
            </div>
            
            <div className="modal-body-modern">
              <p>{selectedProject.desc}</p>
              <p style={{ marginTop: '1rem', opacity: 0.7 }}>More detailed case study content would go here...</p>
            </div>
            
            <div className="modal-tags">
              {selectedProject.tech.map((t, i) => (
                <span key={i} className="modal-tag">{t}</span>
              ))}
            </div>
            
            <div className="modal-actions-modern">
              <a href="#" className="modal-btn primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                View Code
              </a>
              <a href="#" className="modal-btn secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10 8 16 12 10 16 10 8"/>
                </svg>
                Live Demo
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Section Header */
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-label {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--accent-cyan);
          margin-bottom: 0.5rem;
          opacity: 0.8;
        }
        
        .section-title {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--fg-primary) 0%, var(--fg-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }
        
        .section-subtitle {
          font-size: 1.1rem;
          color: var(--fg-secondary);
          max-width: 500px;
          margin: 0 auto;
        }

        /* Modern Bento Grid */
        .bento-grid-modern {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 260px;
          gap: 1.5rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .bento-grid-modern.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Project Card Modern */
        .project-card-modern {
          position: relative;
          border-radius: 20px;
          cursor: pointer;
          overflow: hidden;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          transition: transform 0.2s ease, box-shadow 0.3s ease;
          transform-style: preserve-3d;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .project-card-modern.large { 
          grid-column: span 2; 
          grid-row: span 2; 
        }
        .project-card-modern.medium { 
          grid-column: span 2; 
        }
        .project-card-modern.small { 
          grid-column: span 1;
          min-height: 280px;
        }

        /* Animated Border Glow */
        .card-border-glow {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 1px;
          background: var(--gradient);
          opacity: 0;
          transition: opacity 0.4s ease;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        
        .project-card-modern:hover .card-border-glow {
          opacity: 1;
        }

        /* Spotlight Effect */
        .card-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.06),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .project-card-modern:hover .card-spotlight {
          opacity: 1;
        }

        /* Card Inner Content */
        .card-inner {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
        }

        /* Card Top */
        .card-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: auto;
        }
        
        .card-icon {
          font-size: 1.5rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
        
        .card-category {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--fg-secondary);
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          background: rgba(255,255,255,0.05);
          border-radius: 99px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        
        .card-arrow {
          margin-left: auto;
          opacity: 0;
          transform: translate(-10px, 10px);
          transition: all 0.3s ease;
          color: var(--fg-primary);
        }
        
        .card-arrow.visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* Card Main */
        .card-main {
          margin-top: auto;
          margin-bottom: 1rem;
        }
        
        .card-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--fg-primary);
          line-height: 1.3;
        }
        
        .project-card-modern.large .card-title {
          font-size: 1.8rem;
        }
        
        .card-desc {
          font-size: 0.9rem;
          color: var(--fg-secondary);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .project-card-modern.large .card-desc {
          -webkit-line-clamp: 3;
        }

        /* Card Stats */
        .card-stats {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .project-stat-item {
          display: flex;
          flex-direction: column;
        }
        
        .project-stat-value {
          font-size: 1.2rem;
          font-weight: 800;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }
        
        .project-stat-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #cbd5e1;
          -webkit-text-fill-color: #cbd5e1;
          font-weight: 600;
          margin-top: 0.25rem;
          background: none;
        }

        /* Light mode stat label */
        html.light-mode .project-stat-label {
          color: #64748b;
          -webkit-text-fill-color: #64748b;
        }

        /* Card Tags */
        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .tech-pill {
          font-size: 0.7rem;
          padding: 0.3rem 0.7rem;
          border-radius: 99px;
          background: rgba(255,255,255,0.05);
          color: var(--fg-secondary);
          border: 1px solid rgba(255,255,255,0.1);
          font-weight: 500;
          backdrop-filter: blur(4px);
          transition: all 0.2s ease;
        }
        
        .project-card-modern:hover .tech-pill {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
        }

        /* Modern Modal */
        .modal-overlay-modern {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-content-modern {
          width: 100%;
          max-width: 500px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 2.5rem;
          position: relative;
          animation: modalSlideUp 0.4s cubic-bezier(0.32, 0.72, 0, 1);
          backdrop-filter: blur(20px);
        }
        
        @keyframes modalSlideUp {
          from { 
            opacity: 0; 
            transform: translateY(50px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255,255,255,0.1);
          border: none;
          color: var(--fg-secondary);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .modal-close:hover {
          background: rgba(255,255,255,0.2);
          color: var(--fg-primary);
        }
        
        .modal-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .modal-category {
          display: inline-block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-cyan);
          margin-bottom: 0.5rem;
        }
        
        .modal-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        
        .modal-stats-row {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
        }
        
        .modal-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .modal-stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-cyan);
        }
        
        .modal-stat-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--fg-tertiary);
        }
        
        .modal-body-modern {
          color: var(--fg-secondary);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        
        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        
        .modal-tag {
          font-size: 0.8rem;
          padding: 0.4rem 1rem;
          border-radius: 99px;
          background: rgba(255,255,255,0.05);
          color: var(--fg-secondary);
          border: 1px solid rgba(255,255,255,0.1);
        }
        
        .modal-actions-modern {
          display: flex;
          gap: 1rem;
        }
        
        .modal-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .modal-btn.primary {
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-violet));
          color: white;
        }
        
        .modal-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(6, 182, 212, 0.3);
        }
        
        .modal-btn.secondary {
          background: rgba(255,255,255,0.05);
          color: var(--fg-primary);
          border: 1px solid rgba(255,255,255,0.1);
        }
        
        .modal-btn.secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
        }

        /* Technical Mode */
        .tech-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'JetBrains Mono', monospace;
          color: var(--fg-secondary);
        }

        .tech-table th, .tech-table td {
          border: 1px solid var(--fg-tertiary);
          padding: 1rem;
          text-align: left;
        }

        .tech-table th {
          color: var(--fg-primary);
          background: rgba(0, 20, 0, 0.5);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .bento-grid-modern {
            grid-template-columns: repeat(2, 1fr);
          }
          .project-card-modern.large {
            grid-column: span 2;
            grid-row: span 2;
          }
        }
        
        @media (max-width: 768px) {
          .section-header {
            margin-bottom: 2.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .section-subtitle {
            font-size: 0.95rem;
            padding: 0 0.5rem;
          }
          
          .bento-grid-modern {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
            gap: 1rem;
          }
          
          .project-card-modern.large, 
          .project-card-modern.medium, 
          .project-card-modern.small {
            grid-column: span 1;
            grid-row: auto;
            min-height: auto;
          }
          
          .project-card-modern {
            transform: none !important;
          }
          
          .card-inner {
            padding: 1.25rem;
          }
          
          .card-title {
            font-size: 1.2rem;
          }
          
          .project-card-modern.large .card-title {
            font-size: 1.3rem;
          }
          
          .card-desc {
            font-size: 0.85rem;
            -webkit-line-clamp: 3 !important;
          }
          
          .card-stats {
            gap: 1rem;
          }
          
          .project-stat-value {
            font-size: 1rem;
          }
          
          .project-stat-label {
            font-size: 0.65rem;
          }
          
          .card-tags {
            gap: 0.35rem;
          }
          
          .tech-pill {
            font-size: 0.65rem;
            padding: 0.25rem 0.5rem;
          }
          
          /* Modal Mobile */
          .modal-overlay-modern {
            padding: 1rem;
            align-items: flex-end;
          }
          
          .modal-content-modern {
            padding: 1.5rem;
            border-radius: 20px 20px 0 0;
            max-height: 85vh;
            overflow-y: auto;
          }
          
          .modal-icon {
            font-size: 2.5rem;
          }
          
          .modal-title {
            font-size: 1.5rem;
          }
          
          .modal-stats-row {
            gap: 1rem;
            padding: 0.75rem;
          }
          
          .modal-stat-value {
            font-size: 1.2rem;
          }
          
          .modal-actions-modern {
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .modal-btn {
            width: 100%;
          }
          
          .tech-table {
            font-size: 0.7rem;
          }
          
          .tech-table th, .tech-table td {
            padding: 0.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .card-title {
            font-size: 1.1rem;
          }
          
          .card-stats {
            flex-wrap: wrap;
          }
        }

        /* Light Mode */
        html.light-mode .project-card-modern {
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(0, 0, 0, 0.06);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        
        html.light-mode .card-spotlight {
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(0, 0, 0, 0.03),
            transparent 40%
          );
        }
        
        html.light-mode .card-category {
          background: rgba(0, 0, 0, 0.05);
          border-color: rgba(0, 0, 0, 0.1);
          color: var(--fg-secondary);
        }
        
        html.light-mode .tech-pill {
          background: rgba(0, 0, 0, 0.05);
          border-color: rgba(0, 0, 0, 0.1);
        }
        
        html.light-mode .modal-overlay-modern {
          background: rgba(255, 255, 255, 0.85);
        }
        
        html.light-mode .modal-content-modern {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(0, 0, 0, 0.1);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
        }
        
        html.light-mode .modal-close {
          background: rgba(0, 0, 0, 0.05);
        }
        
        html.light-mode .modal-close:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        
        html.light-mode .modal-stats-row {
          background: rgba(0, 0, 0, 0.03);
        }
        
        html.light-mode .modal-tag {
          background: rgba(0, 0, 0, 0.05);
          border-color: rgba(0, 0, 0, 0.1);
        }
        
        html.light-mode .modal-btn.secondary {
          background: rgba(0, 0, 0, 0.05);
          border-color: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
};

export default Projects;

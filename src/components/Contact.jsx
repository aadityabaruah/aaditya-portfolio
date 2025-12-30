import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const socialLinks = [
  {
    name: 'Email',
    handle: 'abb2237@columbia.edu',
    url: 'mailto:abb2237@columbia.edu',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M22 7l-10 7L2 7"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    color: '#f59e0b'
  },
  {
    name: 'LinkedIn',
    handle: '/in/aaditya-baruah',
    url: 'https://linkedin.com/in/aaditya-baruah',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #0077b5 0%, #00a0dc 100%)',
    color: '#0077b5'
  },
  {
    name: 'GitHub',
    handle: '@aaditya-baruah',
    url: 'https://github.com/aaditya-baruah',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #333 0%, #6e5494 100%)',
    color: '#6e5494'
  },
  {
    name: 'Twitter',
    handle: '@aaditya_ai',
    url: 'https://twitter.com/aaditya_ai',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)',
    color: '#1da1f2'
  }
];

const SocialCard = ({ social, index }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <a
      ref={cardRef}
      href={social.url}
      target={social.name !== 'Email' ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="social-card"
      onMouseMove={handleMouseMove}
      style={{
        '--gradient': social.gradient,
        '--accent-color': social.color,
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`,
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="social-card-glow" />
      <div className="social-card-spotlight" />
      <div className="social-card-content">
        <div className="social-icon">{social.icon}</div>
        <div className="social-info">
          <span className="social-name">{social.name}</span>
          <span className="social-handle">{social.handle}</span>
        </div>
        <div className="social-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </div>
      </div>
    </a>
  );
};

const Contact = () => {
  const { viewMode } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
    <section id="contact" className="section" ref={sectionRef}>
      {/* Decorative background elements */}
      <div className="contact-bg-decoration">
        <div className="decoration-orb orb-1" />
        <div className="decoration-orb orb-2" />
        <div className="decoration-orb orb-3" />
      </div>

      <div className="container">
        {viewMode === 'visual' ? (
          <div className={`contact-wrapper ${isVisible ? 'visible' : ''}`}>
            {/* Header */}
            <div className="contact-header">
              <span className="contact-label">// Get In Touch</span>
              <h2 className="contact-title">
                Let's Build<br/>
                <span className="gradient-text-animated">Something Amazing</span>
              </h2>
              <p className="contact-subtitle">
                I'm currently looking for Summer 2026 opportunities in ML Engineering and Research.
                If you're building something interesting, I'd love to chat.
              </p>
            </div>

            {/* Social Cards Grid */}
            <div className="social-cards-grid">
              {socialLinks.map((social, index) => (
                <SocialCard key={social.name} social={social} index={index} />
              ))}
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-card">
                <div className="form-card-glow" />
                <div className="form-header">
                  <h3>Send a Message</h3>
                  <p>Or drop me an email directly</p>
                </div>
                
                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      placeholder="Hey, I'd love to discuss..."
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="submit-btn">
                    <span>Send Message</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="technical-contact">
            <h2 style={{ marginBottom: '2rem' }}>COMMUNICATION_UPLINK</h2>
            <div className="console-input">
              <span className="prompt">root@aaditya:~$</span>
              <span className="command">mail -s "Opportunity" abb2237@columbia.edu</span>
            </div>
            <div className="console-output">
              <p>&gt; Initiating SMTP handshake...</p>
              <p>&gt; Connected to mail.columbia.edu</p>
              <p>&gt; 220 Ready to accept mail</p>
              <p>&gt; <a href="mailto:abb2237@columbia.edu" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>CLICK_TO_COMPOSE</a></p>
            </div>
          </div>
        )}

        <footer className="footer">
          <div className="footer-content">
            <p>© 2025 Aaditya Bhaskar Baruah</p>
            <p className="footer-sub">{viewMode === 'visual' ? 'Built with React, Vite & ☕' : 'System.Exit(0)'}</p>
          </div>
        </footer>
      </div>

      <style>{`
        #contact {
          position: relative;
          overflow: hidden;
        }

        /* Background Decorations - Optimized with will-change */
        .contact-bg-decoration {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .decoration-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.2;
          will-change: transform, opacity;
          contain: strict;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: var(--accent-cyan);
          top: 10%;
          right: -100px;
          animation: float 12s ease-in-out infinite;
        }

        .orb-2 {
          width: 250px;
          height: 250px;
          background: var(--accent-violet);
          bottom: 5%;
          left: -80px;
          animation: float 15s ease-in-out infinite reverse;
        }

        .orb-3 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse-orb 10s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-orb {
          0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.05); }
        }

        /* Contact Wrapper */
        .contact-wrapper {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .contact-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Header */
        .contact-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .contact-label {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--accent-cyan);
          margin-bottom: 1rem;
        }

        .contact-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .gradient-text-animated {
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-violet), #f59e0b, var(--accent-cyan));
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 5s ease infinite;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .contact-subtitle {
          font-size: 1.15rem;
          color: var(--fg-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Social Cards Grid */
        .social-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 4rem;
        }

        .social-card {
          position: relative;
          display: block;
          padding: 1.5rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          text-decoration: none;
          color: var(--fg-primary);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .social-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .social-card-glow {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 1px;
          background: var(--gradient);
          opacity: 0;
          transition: opacity 0.3s ease;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .social-card:hover .social-card-glow {
          opacity: 1;
        }

        .social-card-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            300px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.08),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .social-card:hover .social-card-spotlight {
          opacity: 1;
        }

        .social-card-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .social-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          color: var(--accent-color);
          transition: all 0.3s ease;
        }

        .social-card:hover .social-icon {
          background: var(--gradient);
          color: white;
          transform: scale(1.05);
        }

        .social-info {
          flex: 1;
          min-width: 0;
        }

        .social-name {
          display: block;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .social-handle {
          display: block;
          font-size: 0.8rem;
          color: var(--fg-tertiary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .social-arrow {
          opacity: 0;
          transform: translate(-10px, 10px);
          transition: all 0.3s ease;
          color: var(--fg-secondary);
        }

        .social-card:hover .social-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* Contact Form */
        .contact-form-container {
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .form-card {
          position: relative;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 2.5rem;
          overflow: hidden;
        }

        .form-card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            from 0deg,
            transparent,
            var(--accent-cyan),
            transparent,
            var(--accent-violet),
            transparent
          );
          opacity: 0.05;
          animation: rotate 10s linear infinite;
          pointer-events: none;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .form-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: var(--fg-tertiary);
          font-size: 0.9rem;
        }

        .contact-form {
          position: relative;
          z-index: 2;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--fg-secondary);
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--fg-primary);
          font-size: 0.95rem;
          font-family: inherit;
          transition: all 0.3s ease;
          resize: none;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.05);
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: var(--fg-tertiary);
        }

        .submit-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(6, 182, 212, 0.3);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        /* Availability Badge */
        .availability-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 99px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
        }

        .pulse-dot {
          width: 10px;
          height: 10px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { opacity: 0.8; box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
        }

        .availability-badge span {
          color: #10b981;
          font-weight: 500;
          font-size: 0.9rem;
        }

        /* Footer */
        .footer {
          text-align: center;
          padding-top: 4rem;
          margin-top: 4rem;
          border-top: 1px solid var(--glass-border);
        }

        .footer-content p {
          color: var(--fg-secondary);
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .footer-sub {
          color: var(--fg-tertiary);
          font-size: 0.8rem;
        }

        /* Technical Mode */
        .technical-contact {
          font-family: 'JetBrains Mono', monospace;
          max-width: 600px;
          margin: 0 auto 4rem auto;
          background: rgba(0, 20, 0, 0.8);
          padding: 2rem;
          border: 1px solid var(--fg-secondary);
          border-radius: 8px;
        }

        .console-input { margin-bottom: 1rem; }
        .prompt { color: var(--accent-violet); margin-right: 0.5rem; }
        .command { color: var(--fg-primary); }
        .console-output p { color: var(--fg-secondary); margin-bottom: 0.5rem; }

        /* Responsive */
        @media (max-width: 1024px) {
          .social-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .contact-header {
            margin-bottom: 2.5rem;
          }
          
          .contact-title {
            font-size: 2rem;
            line-height: 1.2;
          }
          
          .contact-title br {
            display: none;
          }
          
          .contact-subtitle {
            font-size: 0.95rem;
            padding: 0 0.5rem;
          }
          
          .social-cards-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            margin-bottom: 2.5rem;
          }
          
          .social-card {
            padding: 1rem 1.25rem;
          }
          
          .social-icon {
            width: 42px;
            height: 42px;
          }
          
          .social-name {
            font-size: 0.95rem;
          }
          
          .social-handle {
            font-size: 0.75rem;
          }
          
          .contact-form-container {
            margin-bottom: 2rem;
          }
          
          .form-card {
            padding: 1.25rem;
            border-radius: 16px;
          }
          
          .form-header {
            margin-bottom: 1.5rem;
          }
          
          .form-header h3 {
            font-size: 1.25rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          
          .form-group input,
          .form-group textarea {
            padding: 0.75rem;
            font-size: 16px; /* Prevents iOS zoom */
          }
          
          .submit-btn {
            padding: 0.875rem;
          }
          
          /* Orb adjustments */
          .orb-1 {
            width: 200px;
            height: 200px;
            right: -80px;
          }
          
          .orb-2 {
            width: 180px;
            height: 180px;
            left: -60px;
          }
          
          .orb-3 {
            width: 100px;
            height: 100px;
          }
          
          .technical-contact {
            padding: 1rem;
            font-size: 0.75rem;
          }
          
          .footer {
            padding-top: 2rem;
            margin-top: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .contact-title {
            font-size: 1.75rem;
          }
          
          .social-card {
            padding: 0.875rem 1rem;
          }
          
          .social-icon {
            width: 38px;
            height: 38px;
          }
        }

        /* Light Mode */
        html.light-mode .social-card {
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(0, 0, 0, 0.06);
        }

        html.light-mode .social-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        html.light-mode .social-icon {
          background: rgba(0, 0, 0, 0.05);
        }

        html.light-mode .form-card {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(0, 0, 0, 0.08);
        }

        html.light-mode .form-group input,
        html.light-mode .form-group textarea {
          background: rgba(0, 0, 0, 0.02);
          border-color: rgba(0, 0, 0, 0.1);
        }

        html.light-mode .form-group input:focus,
        html.light-mode .form-group textarea:focus {
          background: rgba(8, 145, 178, 0.05);
          border-color: #0891b2;
        }

        html.light-mode .decoration-orb {
          opacity: 0.15;
        }

        html.light-mode .footer {
          border-color: rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </section>
  );
};

export default Contact;

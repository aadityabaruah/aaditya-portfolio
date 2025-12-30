import React from 'react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { viewMode } = useTheme();

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          {viewMode === 'visual' ? (
            <>
              <div className="about-visual">
                <div className="glass-panel profile-card">
                  <div className="profile-image-container">
                    <img src="/assets/ai-network.png" alt="Profile" className="profile-image" />
                  </div>
                  <div className="profile-info">
                    <h3>Aaditya B. Baruah</h3>
                    <p>M.S. CS @ Columbia</p>
                    <div className="status-badge">
                      <span className="dot"></span> Open for Summer 2026
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-content">
                <h2>About Me</h2>
                <p className="lead">
                  I bridge the gap between <span className="highlight">Deep Learning</span> and <span className="highlight">Production Engineering</span>.
                </p>
                <p>
                  My work focuses on building practical, ethical AI systems that are safe, verifiable, and useful.
                  Currently pursuing my Master's at Columbia University, I've previously built systems at Microsoft, Adobe, and IBM.
                </p>

                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-value">3+</span>
                    <span className="stat-label">Years Exp</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">5+</span>
                    <span className="stat-label">Papers</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">EB-1</span>
                    <span className="stat-label">Recipient</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="technical-about">
              <pre className="man-page">
                {`NAME
    aaditya - full stack machine learning engineer

SYNOPSIS
    aaditya [--research] [--engineering] [--systems]

DESCRIPTION
    Aaditya bridges the gap between Deep Learning and Production Engineering.
    Focuses on building practical, ethical AI systems that are safe, verifiable, and useful.

EDUCATION
    Columbia University
        M.S. Computer Science (2025-2027)
    
    SRM Institute
        B.Tech Computer Science (Gold Medalist)

FLAGS
    --eb1-recipient    Extraordinary Ability Green Card Pathway
    --published        IEEE ICCCI, IEEE ITS
    --open-to-work     Summer 2026 Internships

AUTHOR
    Written by Aaditya B. Baruah.`}
              </pre>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 4rem;
          align-items: center;
        }

        .profile-card {
          padding: 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .profile-image-container {
          width: 150px;
          height: 150px;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--accent-cyan);
          box-shadow: 0 0 20px var(--accent-cyan-dim);
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-info h3 {
          margin-bottom: 0.5rem;
        }

        .profile-info p {
          color: var(--fg-secondary);
          margin-bottom: 1.5rem;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border-radius: 99px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: currentColor;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .about-content h2 {
          margin-bottom: 1.5rem;
        }

        .lead {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          color: var(--fg-primary);
        }

        .highlight {
          color: var(--accent-cyan);
          font-weight: 600;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
          border-top: 1px solid var(--glass-border);
          padding-top: 2rem;
        }

        .stat-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent-violet);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--fg-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Technical Mode Styles */
        .technical-about {
          grid-column: 1 / -1;
          font-family: 'JetBrains Mono', monospace;
        }

        .man-page {
          color: var(--fg-secondary);
          white-space: pre-wrap;
          line-height: 1.5;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        @media (max-width: 768px) {
          .about-grid { 
            grid-template-columns: 1fr; 
            gap: 2rem; 
          }
          
          .profile-card {
            padding: 1.5rem;
          }
          
          .profile-image-container {
            width: 120px;
            height: 120px;
          }
          
          .about-content h2 {
            text-align: center;
          }
          
          .lead {
            font-size: 1.1rem;
            text-align: center;
          }
          
          .about-content p {
            text-align: center;
          }
          
          .stats-grid { 
            gap: 0.75rem; 
            grid-template-columns: repeat(3, 1fr);
          }
          
          .stat-item {
            text-align: center;
          }
          
          .stat-value { 
            font-size: 1.75rem; 
          }
          
          .stat-label {
            font-size: 0.7rem;
          }
          
          .man-page {
            font-size: 0.75rem;
            overflow-x: auto;
          }
        }
        
        @media (max-width: 480px) {
          .stat-value {
            font-size: 1.5rem;
          }
          
          .stat-label {
            font-size: 0.65rem;
          }
        }

        /* Light Mode */
        html.light-mode .profile-image-container {
          border-color: #0891b2;
          box-shadow: 0 0 20px rgba(8, 145, 178, 0.15);
        }
        
        html.light-mode .status-badge {
          background: rgba(16, 185, 129, 0.1);
        }
        
        html.light-mode .highlight {
          color: #0891b2;
        }
        
        html.light-mode .stat-value {
          color: #7c3aed;
        }
        
        html.light-mode .stat-label {
          color: #64748b;
        }
        
        html.light-mode .lead {
          color: #1e293b;
        }
      `}</style>
    </section>
  );
};

export default About;

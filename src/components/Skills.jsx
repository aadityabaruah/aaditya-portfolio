import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const skillsData = {
  "Languages": [
    { name: "Python", level: 95 },
    { name: "C++", level: 85 },
    { name: "JavaScript", level: 90 },
    { name: "OCaml", level: 75 }
  ],
  "AI/ML": [
    { name: "PyTorch", level: 95 },
    { name: "TensorFlow", level: 80 },
    { name: "Transformers", level: 90 },
    { name: "OpenCV", level: 85 }
  ],
  "Systems": [
    { name: "Docker", level: 85 },
    { name: "Kubernetes", level: 70 },
    { name: "AWS", level: 80 },
    { name: "Linux", level: 90 }
  ]
};

const Skills = () => {
  const { viewMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState("Languages");

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 style={{ marginBottom: '3rem' }}>{viewMode === 'visual' ? 'Skills & Stack' : 'DEPENDENCIES'}</h2>

        {viewMode === 'visual' ? (
          <div className="skills-container">
            <div className="category-tabs">
              {Object.keys(skillsData).map(cat => (
                <button
                  key={cat}
                  className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="skills-grid glass-panel">
              {skillsData[activeCategory].map(skill => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-info">
                    <span>{skill.name}</span>
                    <span className="skill-pct">{skill.level}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ticker-wrap">
              <div className="ticker">
                <div className="ticker-item">Currently Exploring: Generative Adversarial Networks • Reinforcement Learning from Human Feedback • Rust for ML •</div>
                <div className="ticker-item">Currently Exploring: Generative Adversarial Networks • Reinforcement Learning from Human Feedback • Rust for ML •</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="technical-skills">
            <pre className="json-block">
              {`{
  "dependencies": {
    "languages": {
      "python": "^3.11.0",
      "cpp": "^20.0.0",
      "javascript": "ES2022",
      "ocaml": "^4.14.0"
    },
    "ml_frameworks": {
      "pytorch": "^2.1.0",
      "tensorflow": "^2.14.0",
      "transformers": "^4.35.0"
    },
    "infrastructure": {
      "docker": "latest",
      "k8s": "stable",
      "aws_sdk": "v3"
    }
  }
}`}
            </pre>
          </div>
        )}
      </div>

      <style>{`
        .skills-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .category-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          justify-content: center;
        }

        .tab-btn {
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--fg-secondary);
          padding: 0.5rem 1.5rem;
          border-radius: 99px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .tab-btn.active {
          background: var(--accent-cyan-dim);
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
        }

        .skills-grid {
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .skill-item {
          margin-bottom: 1rem;
        }

        .skill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .progress-bar-bg {
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--accent-cyan);
          border-radius: 3px;
          transition: width 1s ease-out;
        }

        .ticker-wrap {
          margin-top: 4rem;
          overflow: hidden;
          white-space: nowrap;
          opacity: 0.5;
          contain: content;
        }

        .ticker {
          display: inline-block;
          animation: ticker 40s linear infinite;
          will-change: transform;
        }

        .ticker-item {
          display: inline-block;
          padding-right: 2rem;
          font-family: var(--font-display);
        }

        /* Technical Mode Styles */
        .technical-skills {
          font-family: 'JetBrains Mono', monospace;
          max-width: 800px;
          margin: 0 auto;
        }

        .json-block {
          background: rgba(0, 20, 0, 0.8);
          padding: 2rem;
          border: 1px solid var(--fg-secondary);
          color: var(--fg-primary);
          font-size: 0.9rem;
        }

        @keyframes ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }

        @media (max-width: 768px) {
          .skills-container {
            padding: 0 0.5rem;
          }
          
          .category-tabs {
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          
          .tab-btn {
            padding: 0.4rem 1rem;
            font-size: 0.85rem;
          }
          
          .skills-grid { 
            grid-template-columns: 1fr; 
            padding: 1.25rem;
            gap: 1.5rem;
          }
          
          .skill-info {
            font-size: 0.85rem;
          }
          
          .ticker-wrap {
            margin-top: 2rem;
          }
          
          .ticker-item {
            font-size: 0.85rem;
          }
          
          .json-block {
            font-size: 0.7rem;
            padding: 1rem;
            overflow-x: auto;
          }
        }
        
        @media (max-width: 480px) {
          .tab-btn {
            padding: 0.35rem 0.8rem;
            font-size: 0.8rem;
          }
        }

        /* Light Mode */
        html.light-mode .tab-btn {
          border-color: rgba(0, 0, 0, 0.1);
          color: #64748b;
        }
        
        html.light-mode .tab-btn:hover {
          background: rgba(0, 0, 0, 0.03);
          color: #1e293b;
        }
        
        html.light-mode .tab-btn.active {
          background: rgba(8, 145, 178, 0.1);
          color: #0891b2;
          border-color: #0891b2;
        }
        
        html.light-mode .skill-info span {
          color: #1e293b;
        }
        
        html.light-mode .skill-pct {
          color: #64748b !important;
        }
        
        html.light-mode .progress-bar-bg {
          background: rgba(0, 0, 0, 0.08);
        }
        
        html.light-mode .progress-bar-fill {
          background: #0891b2;
        }
        
        html.light-mode .ticker-wrap {
          opacity: 0.6;
          color: #64748b;
        }
      `}</style>
    </section>
  );
};

export default Skills;

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const experiences = [
  {
    id: 1,
    role: "M.S. Computer Science",
    company: "Columbia University",
    period: "2025 - Present",
    desc: "Specializing in ML Systems and Generative AI Safety.",
    sys_desc: ">> PROC: MS_CS_DEGREE\n>> STATUS: RUNNING...",
    icon: "🎓",
    color: "#06b6d4"
  },
  {
    id: 2,
    role: "Research Engineer",
    company: "University of Alberta",
    period: "Jun 2024 - Sep 2024",
    desc: "Developed LiDAR pipelines for urban infrastructure analysis.",
    sys_desc: ">> EXEC: POINT_CLOUD_SEG\n>> OUT: IEEE_PAPER_SUBMITTED",
    icon: "🔬",
    color: "#8b5cf6"
  },
  {
    id: 3,
    role: "Software Engineer Intern",
    company: "IBM",
    period: "Jan 2024 - Mar 2024",
    desc: "Built guardrails for WatsonX LLMs using Python & React.",
    sys_desc: ">> MOD: WATSONX_GUARDIAN\n>> ACTION: SAFETY_LAYER_INIT",
    icon: "💼",
    color: "#3b82f6"
  },
  {
    id: 4,
    role: "ML Engineer Intern",
    company: "Microsoft",
    period: "Jun 2023 - Oct 2023",
    desc: "Optimized Transformers (2.2% acc gain) via arch search.",
    sys_desc: ">> OPTIMIZE: TRANSFORMER\n>> DELTA: +2.21%_ACCURACY",
    icon: "🚀",
    color: "#10b981"
  }
];

const Experience = () => {
  const { viewMode } = useTheme();
  const sectionRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (viewMode !== 'visual') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.id);
            setVisibleItems(prev => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const items = document.querySelectorAll('.exp-card');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [viewMode]);

  return (
    <section id="experience" className="section experience-section" ref={sectionRef}>
      <div className="container">
        <div className="exp-header">
          <span className="exp-label">Career Journey</span>
          <h2 className="exp-title">
            {viewMode === 'visual' ? 'Experience' : 'EXECUTION_LOG'}
          </h2>
          <p className="exp-subtitle">Building the future, one commit at a time</p>
        </div>

        {viewMode === 'visual' ? (
          <div className="exp-timeline">
            {/* Animated vertical line */}
            <div className="timeline-track">
              <div 
                className="timeline-progress" 
                style={{ 
                  height: `${(visibleItems.size / experiences.length) * 100}%` 
                }}
              />
            </div>

            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`exp-card ${visibleItems.has(exp.id) ? 'visible' : ''} ${index % 2 === 0 ? 'left' : 'right'}`}
                data-id={exp.id}
                onMouseEnter={() => setHoveredId(exp.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ 
                  transitionDelay: `${index * 0.15}s`,
                  '--accent-color': exp.color 
                }}
              >
                {/* Timeline node */}
                <div className={`exp-node ${visibleItems.has(exp.id) ? 'pulse' : ''}`}>
                  <div className="node-ring" />
                  <div className="node-core" style={{ background: exp.color }} />
                </div>

                {/* Card content */}
                <div className={`exp-content ${hoveredId === exp.id ? 'hovered' : ''}`}>
                  {/* Glow effect */}
                  <div className="exp-glow" style={{ background: `radial-gradient(circle at center, ${exp.color}20 0%, transparent 70%)` }} />
                  
                  {/* Icon badge */}
                  <div className="exp-icon" style={{ background: `${exp.color}15`, borderColor: `${exp.color}40` }}>
                    <span>{exp.icon}</span>
                  </div>

                  {/* Period tag */}
                  <div className="exp-period" style={{ color: exp.color }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                    {exp.period}
                  </div>

                  {/* Company & Role */}
                  <h3 className="exp-company">{exp.company}</h3>
                  <h4 className="exp-role">{exp.role}</h4>

                  {/* Description with reveal animation */}
                  <p className="exp-desc">{exp.desc}</p>

                  {/* Decorative corner */}
                  <div className="exp-corner" style={{ borderColor: exp.color }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="technical-experience">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="log-entry">
                <span className="log-time">[{exp.period}]</span>
                <span className="log-user">root@aaditya:~/work#</span>
                <span className="log-cmd">./{exp.company.replace(/\s+/g, '_').toLowerCase()}.sh</span>
                <pre className="log-output">{exp.sys_desc}</pre>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .experience-section {
          position: relative;
          overflow: hidden;
        }

        .exp-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .exp-label {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-cyan);
          margin-bottom: 1rem;
          padding: 0.5rem 1rem;
          background: rgba(6, 182, 212, 0.1);
          border-radius: 20px;
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .exp-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--fg-primary), var(--accent-cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .exp-subtitle {
          font-size: 1.1rem;
          color: var(--fg-secondary);
          max-width: 500px;
          margin: 0 auto;
        }

        .exp-timeline {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        /* Animated timeline track */
        .timeline-track {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(-50%);
          border-radius: 3px;
          overflow: hidden;
        }

        .timeline-progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(180deg, #06b6d4, #8b5cf6, #3b82f6, #10b981);
          border-radius: 3px;
          transition: height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Experience card */
        .exp-card {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(60px);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .exp-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .exp-card.left {
          flex-direction: row;
          padding-right: calc(50% + 40px);
        }

        .exp-card.right {
          flex-direction: row-reverse;
          padding-left: calc(50% + 40px);
        }

        .exp-card.left .exp-content {
          text-align: right;
        }

        .exp-card.right .exp-content {
          text-align: left;
        }

        /* Timeline node */
        .exp-node {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
          z-index: 3;
        }

        .node-ring {
          position: absolute;
          inset: -6px;
          border: 2px solid var(--accent-color);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.4s ease;
        }

        .exp-node.pulse .node-ring {
          opacity: 0.5;
          transform: scale(1);
          animation: nodePulse 2s infinite;
        }

        @keyframes nodePulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0; }
        }

        .node-core {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          box-shadow: 0 0 20px var(--accent-color);
        }

        /* Card content */
        .exp-content {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 2rem;
          width: 100%;
          max-width: 450px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .exp-content:hover {
          transform: translateY(-5px);
          border-color: var(--accent-color);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }

        .exp-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .exp-content:hover .exp-glow {
          opacity: 1;
        }

        .exp-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: 1px solid;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          transition: transform 0.3s ease;
        }

        .exp-content:hover .exp-icon {
          transform: scale(1.1) rotate(-5deg);
        }

        .exp-period {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .exp-company {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: var(--fg-primary);
        }

        .exp-role {
          font-size: 1rem;
          font-weight: 500;
          color: var(--fg-secondary);
          margin-bottom: 1rem;
        }

        .exp-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--fg-tertiary);
        }

        .exp-corner {
          position: absolute;
          bottom: 0;
          width: 60px;
          height: 60px;
          border-bottom: 2px solid;
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }

        .exp-card.left .exp-corner {
          right: 0;
          border-right: 2px solid;
          border-bottom-right-radius: 20px;
        }

        .exp-card.right .exp-corner {
          left: 0;
          border-left: 2px solid;
          border-bottom-left-radius: 20px;
        }

        .exp-content:hover .exp-corner {
          opacity: 0.8;
        }

        /* Technical Mode Styles */
        .technical-experience {
          font-family: 'JetBrains Mono', monospace;
          max-width: 800px;
          margin: 0 auto;
        }

        .log-entry {
          margin-bottom: 2rem;
          border-left: 2px solid var(--fg-tertiary);
          padding-left: 1rem;
        }

        .log-time { color: var(--fg-secondary); margin-right: 1rem; }
        .log-user { color: var(--accent-violet); margin-right: 0.5rem; }
        .log-cmd { color: var(--accent-cyan); }
        .log-output { 
          color: var(--fg-primary); 
          margin-top: 0.5rem; 
          opacity: 0.8;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .exp-header {
            margin-bottom: 3rem;
          }
          
          .exp-label {
            font-size: 0.75rem;
            padding: 0.4rem 0.8rem;
          }
          
          .exp-title {
            font-size: 2rem;
          }
          
          .exp-subtitle {
            font-size: 0.95rem;
          }
          
          .exp-timeline {
            padding: 1rem 0;
          }
          
          .timeline-track {
            left: 16px;
          }

          .exp-card {
            margin-bottom: 2rem;
          }

          .exp-card,
          .exp-card.left,
          .exp-card.right {
            flex-direction: row;
            padding-left: 45px;
            padding-right: 0;
          }

          .exp-card.left .exp-content,
          .exp-card.right .exp-content {
            text-align: left;
          }

          .exp-node {
            left: 16px;
            width: 16px;
            height: 16px;
          }
          
          .node-ring {
            inset: -4px;
          }

          .exp-content {
            max-width: 100%;
            padding: 1.25rem;
            border-radius: 16px;
          }
          
          .exp-content:hover {
            transform: none;
          }
          
          .exp-icon {
            width: 40px;
            height: 40px;
            font-size: 1.25rem;
            border-radius: 10px;
          }
          
          .exp-period {
            font-size: 0.75rem;
          }
          
          .exp-company {
            font-size: 1.2rem;
          }
          
          .exp-role {
            font-size: 0.9rem;
          }
          
          .exp-desc {
            font-size: 0.85rem;
          }
          
          .exp-corner {
            width: 40px;
            height: 40px;
          }

          .exp-card.left .exp-corner,
          .exp-card.right .exp-corner {
            left: 0;
            right: auto;
            border-left: 2px solid;
            border-right: none;
            border-bottom-left-radius: 16px;
            border-bottom-right-radius: 0;
          }
          
          /* Technical mode mobile */
          .technical-experience {
            padding: 0 0.5rem;
          }
          
          .log-entry {
            margin-bottom: 1.5rem;
            padding-left: 0.75rem;
            font-size: 0.8rem;
          }
          
          .log-time {
            display: block;
            margin-bottom: 0.25rem;
          }
          
          .log-output {
            font-size: 0.75rem;
          }
        }
        
        @media (max-width: 480px) {
          .exp-card,
          .exp-card.left,
          .exp-card.right {
            padding-left: 40px;
          }
          
          .timeline-track {
            left: 12px;
          }
          
          .exp-node {
            left: 12px;
            width: 14px;
            height: 14px;
          }
          
          .exp-content {
            padding: 1rem;
          }
          
          .exp-company {
            font-size: 1.1rem;
          }
        }

        /* Light Mode */
        html.light-mode .exp-label {
          background: rgba(8, 145, 178, 0.1);
          border-color: rgba(8, 145, 178, 0.2);
          color: #0891b2;
        }

        html.light-mode .exp-title {
          background: linear-gradient(135deg, #0f172a, #0891b2);
          -webkit-background-clip: text;
          background-clip: text;
        }

        html.light-mode .exp-subtitle {
          color: #64748b;
        }

        html.light-mode .timeline-track {
          background: rgba(0, 0, 0, 0.1);
        }

        html.light-mode .exp-content {
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(0, 0, 0, 0.08);
        }

        html.light-mode .exp-content:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }

        html.light-mode .exp-company {
          color: #0f172a;
        }

        html.light-mode .exp-role {
          color: #475569;
        }

        html.light-mode .exp-desc {
          color: #64748b;
        }
      `}</style>
    </section>
  );
};

export default Experience;

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
    const { viewMode } = useTheme();
    const [displayText, setDisplayText] = useState('');
    const fullText = "Aaditya Bhaskar Baruah";
    const [subText, setSubText] = useState('');
    const fullSubText = "AI & ML Engineer · Research & Product";

    // Technical Mode Typewriter
    const [techText, setTechText] = useState('');
    const techFullText = "class Developer extends Human {\n  focus: ['NLP', 'LiDAR', 'Ethical AI'];\n  stack: ['PyTorch', 'OCaml', 'System Design'];\n  status: 'M.S. Candidate @ Columbia';\n}";

    const titleRef = useRef(null);

    useEffect(() => {
        // Reset and run typewriter animation
        if (viewMode === 'visual') {
            setDisplayText('');
            setSubText('');
            
            let i = 0;
            let subIntervalId = null;
            
            const interval = setInterval(() => {
                if (i <= fullText.length) {
                    setDisplayText(fullText.slice(0, i));
                    i++;
                } else {
                    clearInterval(interval);
                    // Start subtext
                    let j = 0;
                    subIntervalId = setInterval(() => {
                        if (j <= fullSubText.length) {
                            setSubText(fullSubText.slice(0, j));
                            j++;
                        } else {
                            clearInterval(subIntervalId);
                        }
                    }, 30);
                }
            }, 40);
            
            return () => {
                clearInterval(interval);
                if (subIntervalId) clearInterval(subIntervalId);
            };
        } else {
            setTechText('');
            
            let i = 0;
            const interval = setInterval(() => {
                if (i <= techFullText.length) {
                    setTechText(techFullText.slice(0, i));
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 15);
            
            return () => clearInterval(interval);
        }
    }, [viewMode]);

    // 3D Tilt Effect Logic
    const handleMouseMove = (e) => {
        if (!titleRef.current || viewMode !== 'visual') return;
        const { left, top, width, height } = titleRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        titleRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    };

    const handleMouseLeave = () => {
        if (titleRef.current) {
            titleRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        }
    };

    return (
        <section id="hero" className="section hero-section">
            <div className="aurora-bg"></div>

            <div className="container hero-content">
                {viewMode === 'visual' ? (
                    <div className="visual-hero">
                        <div
                            className="tilt-wrapper"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            ref={titleRef}
                        >
                            <h1 className="hero-title">
                                <span className="gradient-text">{displayText}</span>
                                <span className="cursor">|</span>
                            </h1>
                            <p className="hero-subtitle">{subText}</p>
                        </div>

                        <div className="hero-actions">
                            <a 
                                href="#projects" 
                                className="btn btn-primary magnetic-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <span>View Projects</span>
                            </a>
                            <a href="/resume.pdf" target="_blank" className="btn btn-outline magnetic-btn">
                                <span>Download Resume</span>
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="technical-hero">
                        <pre className="code-block">
                            <code>{techText}</code>
                            <span className="cursor">_</span>
                        </pre>
                        <div className="sys-status">
                            <p>&gt;&gt; SYSTEM: ONLINE</p>
                            <p>&gt;&gt; LOCATION: NEW_YORK_USA</p>
                            <p>&gt;&gt; MODE: ENGINEER_VIEW</p>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .aurora-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at 50% 30%, rgba(76, 29, 149, 0.12), transparent 60%),
                      radial-gradient(ellipse at 80% 60%, rgba(14, 165, 233, 0.08), transparent 50%);
          z-index: 0;
          pointer-events: none;
          will-change: opacity;
          animation: aurora-fade 8s ease-in-out infinite alternate;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .tilt-wrapper {
          transition: transform 0.1s ease-out;
          display: inline-block;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--fg-primary) 0%, var(--fg-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cursor {
          display: inline-block;
          animation: blink 1s step-end infinite;
          color: var(--accent-cyan);
          margin-left: 5px;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: var(--fg-secondary);
          margin-bottom: 3rem;
          font-weight: 300;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }

        /* Technical Mode Styles */
        .technical-hero {
          text-align: left;
          font-family: 'JetBrains Mono', monospace;
          max-width: 800px;
          margin: 0 auto;
        }

        .code-block {
          background: rgba(0, 20, 0, 0.8);
          padding: 2rem;
          border: 1px solid var(--fg-secondary);
          color: var(--fg-primary);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .sys-status {
          color: var(--fg-secondary);
          font-size: 0.9rem;
          border-top: 1px solid var(--fg-tertiary);
          padding-top: 1rem;
        }

        @keyframes aurora-fade {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: calc(100vh - 80px);
            padding-top: 2rem;
          }
          
          .hero-title { 
            font-size: 2.25rem; 
            line-height: 1.2;
          }
          
          .hero-subtitle { 
            font-size: 1rem; 
            margin-bottom: 2rem;
            padding: 0 0.5rem;
          }
          
          .hero-actions { 
            flex-direction: column; 
            gap: 1rem;
            width: 100%;
            padding: 0 1rem;
          }
          
          .hero-actions .btn {
            width: 100%;
            padding: 1rem;
          }
          
          .tilt-wrapper {
            transform: none !important;
          }
          
          /* Disable 3D tilt on mobile */
          .visual-hero {
            padding: 0 0.5rem;
          }
          
          .code-block {
            font-size: 0.8rem;
            padding: 1rem;
            overflow-x: auto;
          }
          
          .sys-status {
            font-size: 0.75rem;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.85rem;
          }
          
          .hero-subtitle {
            font-size: 0.9rem;
          }
        }

        /* Light Mode */
        html.light-mode .aurora-bg {
          background: radial-gradient(circle at 50% 50%, rgba(8, 145, 178, 0.08), transparent 60%),
                      radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.06), transparent 50%);
        }
        
        html.light-mode .gradient-text {
          background: linear-gradient(135deg, #0f172a 0%, #475569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        html.light-mode .hero-subtitle {
          color: #64748b;
        }
        
        html.light-mode .cursor {
          color: #0891b2;
        }
        
        html.light-mode .btn-primary {
          background: #0891b2;
          color: #ffffff;
        }
        
        html.light-mode .btn-outline {
          border-color: rgba(0, 0, 0, 0.15);
          color: #1e293b;
        }
        
        html.light-mode .btn-outline:hover {
          border-color: #0891b2;
          background: rgba(8, 145, 178, 0.05);
        }
      `}</style>
        </section>
    );
};

export default Hero;

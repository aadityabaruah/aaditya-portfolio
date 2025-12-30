import React, { useState, useEffect, useRef, useCallback } from 'react';

const FloatingDock = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);
    const isNavigating = useRef(false); // Flag to prevent hiding during navigation

    const navItems = [
        { id: 'hero', label: 'Home', icon: '🏠' },
        { id: 'about', label: 'About', icon: '👤' },
        { id: 'experience', label: 'Exp', icon: '💼' },
        { id: 'projects', label: 'Work', icon: '🚀' },
        { id: 'skills', label: 'Skills', icon: '⚡' },
        { id: 'contact', label: 'Contact', icon: '✉️' },
    ];

    const updateScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        // Don't hide if we're navigating via click
        if (!isNavigating.current) {
            // Determine visibility (hide on scroll down, show on scroll up)
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }
        }
        lastScrollY.current = currentScrollY;

        // Active section detection
        const scrollPosition = currentScrollY + window.innerHeight / 3;

        for (const item of navItems) {
            const section = document.getElementById(item.id);
            if (section) {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollPosition >= top && scrollPosition < top + height) {
                    setActiveSection(item.id);
                    break;
                }
            }
        }
        ticking.current = false;
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(updateScroll);
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [updateScroll]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Set navigating flag to prevent hiding
            isNavigating.current = true;
            setVisible(true);
            
            const navHeight = 80; // Height of nav + some padding
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Reset the flag after scroll animation completes
            setTimeout(() => {
                isNavigating.current = false;
                lastScrollY.current = window.scrollY; // Update last scroll position
            }, 1000); // Smooth scroll typically takes ~500-800ms
        }
    };

    return (
        <nav className={`floating-dock ${!visible ? 'hidden' : ''}`}>
            {navItems.map((item) => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setVisible(true); // Keep dock visible after click
                        scrollToSection(item.id);
                        setActiveSection(item.id);
                    }}
                    className={`dock-item ${activeSection === item.id ? 'active' : ''}`}
                >
                    <span>{item.icon}</span>
                    <span className="dock-label">{item.label}</span>
                </a>
            ))}
            <style>{`
        .floating-dock {
          position: fixed;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 999px;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          transition: all 0.3s var(--ease-main);
        }

        .floating-dock.hidden {
          transform: translate(-50%, -150%); /* Move up to hide */
        }

        .dock-item {
          position: relative;
          padding: 0.5rem 1rem;
          color: var(--fg-secondary);
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dock-item:hover {
          color: var(--fg-primary);
          background: rgba(255,255,255,0.1);
        }

        .dock-item.active {
          color: var(--bg-dark);
          background: var(--fg-primary);
        }

        /* Light Mode */
        html.light-mode .floating-dock {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        html.light-mode .dock-item {
          color: #64748b;
        }
        
        html.light-mode .dock-item:hover {
          color: #1e293b;
          background: rgba(0, 0, 0, 0.05);
        }
        
        html.light-mode .dock-item.active {
          color: #ffffff;
          background: #0891b2;
        }

        @media (max-width: 768px) {
          .floating-dock {
            top: 1rem;
            bottom: auto;
            left: 50%;
            transform: translateX(-50%);
            padding: 0.35rem;
            gap: 0.2rem;
            max-width: calc(100vw - 2rem);
          }
          
          .floating-dock.hidden {
            transform: translate(-50%, -150%);
          }
          
          .dock-item {
            padding: 0.5rem 0.65rem;
            font-size: 1rem;
          }
          
          .dock-label {
            display: none;
          }
        }
        
        @media (max-width: 380px) {
          .dock-item {
            padding: 0.4rem 0.5rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
        </nav>
    );
};

export default FloatingDock;

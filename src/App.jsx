import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import FloatingDock from './components/FloatingDock';
import CommandPalette from './components/CommandPalette';
import FloatingChatInput from './components/FloatingChatInput';
import Cursor from './components/Cursor';
import FluidCursor from './components/FluidCursor';

function AppContent() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let rafId = null;
    let lastX = 0;
    let lastY = 0;
    
    const handleMouseMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      
      // Use RAF to batch DOM updates
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setMousePos({ x: lastX, y: lastY });
          document.documentElement.style.setProperty('--mouse-x', `${lastX}px`);
          document.documentElement.style.setProperty('--mouse-y', `${lastY}px`);
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="app-container">
      {/* Cursor effects - Fluid for light mode, regular for dark */}
      {theme === 'light' ? <FluidCursor /> : <Cursor />}

      {/* Dynamic Background */}
      <div className="bg-grid"></div>
      <div className="bg-gradient"></div>

      {/* Global Spotlight Effect */}
      <div
        className="spotlight-overlay"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="theme-toggle-btn"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <FloatingDock />
      <CommandPalette />
      <FloatingChatInput />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [viewMode, setViewMode] = useState('visual'); // 'visual' | 'technical'
    const [theme, setTheme] = useState(() => {
        // Check localStorage first, then system preference
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    });
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

    const toggleViewMode = () => {
        setViewMode(prev => prev === 'visual' ? 'technical' : 'visual');
    };

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = prev === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    // Apply theme class to document element
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'light') {
            root.classList.add('light-mode');
            root.classList.remove('dark-mode');
        } else {
            root.classList.add('dark-mode');
            root.classList.remove('light-mode');
        }
    }, [theme]);

    // Apply view mode class to document element
    useEffect(() => {
        const root = document.documentElement;
        if (viewMode === 'technical') {
            root.classList.add('technical-mode');
            root.classList.remove('visual-mode');
        } else {
            root.classList.add('visual-mode');
            root.classList.remove('technical-mode');
        }
    }, [viewMode]);

    const togglePalette = () => {
        setIsPaletteOpen(prev => !prev);
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Cmd+K or Ctrl+K to toggle palette
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                togglePalette();
            }
            // Esc to close palette
            if (e.key === 'Escape') {
                setIsPaletteOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <ThemeContext.Provider value={{
            viewMode,
            setViewMode,
            toggleViewMode,
            theme,
            toggleTheme,
            isPaletteOpen,
            setIsPaletteOpen,
            togglePalette
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

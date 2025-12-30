import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const KNOWLEDGE_BASE = [
    {
        id: 'about',
        keywords: ['who', 'about', 'aaditya', 'profile', 'bio'],
        response: "Aaditya is a M.S. CS student at Columbia University, specializing in ML Systems and Generative AI Safety. Ex-Microsoft, Adobe, IBM."
    },
    {
        id: 'skills',
        keywords: ['stack', 'tech', 'skills', 'python', 'react', 'ml', 'ai'],
        response: "Core stack: Python, PyTorch, React, OCaml. Specialized in NLP, LiDAR processing, and Ethical AI systems."
    },
    {
        id: 'contact',
        keywords: ['email', 'contact', 'hire', 'reach', 'job'],
        response: "You can reach Aaditya at abb2237@columbia.edu. He is open to Summer 2026 opportunities."
    },
    {
        id: 'status',
        keywords: ['visa', 'citizenship', 'work', 'auth'],
        response: "Aaditya is an EB-1 Recipient (Extraordinary Ability), on a direct path to US Residency. No H1-B hurdles."
    }
];

const CommandPalette = () => {
    const { isPaletteOpen, setIsPaletteOpen, toggleViewMode, viewMode, toggleTheme } = useTheme();
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isPaletteOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setInput('');
            setResults(INITIAL_ACTIONS);
        }
    }, [isPaletteOpen]);

    const INITIAL_ACTIONS = [
        { type: 'nav', label: 'Go to Projects', action: () => scrollTo('projects') },
        { type: 'nav', label: 'Go to Experience', action: () => scrollTo('experience') },
        { type: 'nav', label: 'Go to About', action: () => scrollTo('about') },
        { type: 'nav', label: 'Go to Contact', action: () => scrollTo('contact') },
        { type: 'action', label: viewMode === 'visual' ? 'Switch to Technical Mode' : 'Switch to Visual Mode', action: toggleViewMode },
        { type: 'action', label: 'Toggle Light/Dark Theme', action: toggleTheme },
        { type: 'link', label: 'Download Resume', action: () => window.open('/resume.pdf', '_blank') },
    ];

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setIsPaletteOpen(false);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setInput(query);
        setSelectedIndex(0);

        if (!query) {
            setResults(INITIAL_ACTIONS);
            return;
        }

        // Filter Actions
        const filteredActions = INITIAL_ACTIONS.filter(action =>
            action.label.toLowerCase().includes(query.toLowerCase())
        );

        // AI Knowledge Search
        const aiResponse = KNOWLEDGE_BASE.find(k =>
            k.keywords.some(word => query.toLowerCase().includes(word))
        );

        if (aiResponse) {
            setResults([
                { type: 'ai', label: 'Ask AI', content: aiResponse.response },
                ...filteredActions
            ]);
        } else {
            setResults(filteredActions);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex(prev => (prev + 1) % results.length);
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        } else if (e.key === 'Enter') {
            const selected = results[selectedIndex];
            if (selected && selected.action) {
                selected.action();
                if (selected.type !== 'nav') setIsPaletteOpen(false); // Keep open for nav? No, close it.
            }
        }
    };

    if (!isPaletteOpen) return null;

    return (
        <div className="palette-overlay" onClick={() => setIsPaletteOpen(false)}>
            <div className="palette-modal" onClick={e => e.stopPropagation()}>
                <div className="palette-search">
                    <span className="search-icon">⌘</span>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type a command or ask a question..."
                        value={input}
                        onChange={handleSearch}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="close-btn" onClick={() => setIsPaletteOpen(false)}>Esc</button>
                </div>

                <div className="palette-results">
                    {results.length === 0 && (
                        <div className="no-results">No results found.</div>
                    )}

                    {results.map((item, index) => (
                        <div
                            key={index}
                            className={`result-item ${index === selectedIndex ? 'selected' : ''} ${item.type}`}
                            onClick={() => {
                                if (item.action) item.action();
                                else setIsPaletteOpen(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            {item.type === 'ai' ? (
                                <div className="ai-response">
                                    <span className="ai-label">AI Answer:</span>
                                    <p>{item.content}</p>
                                </div>
                            ) : (
                                <>
                                    <span className="result-icon">
                                        {item.type === 'nav' && '→'}
                                        {item.type === 'action' && '⚡'}
                                        {item.type === 'link' && '🔗'}
                                    </span>
                                    <span className="result-label">{item.label}</span>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <div className="palette-footer">
                    <span>Use <b>↑↓</b> to navigate</span>
                    <span><b>↵</b> to select</span>
                </div>
            </div>

            <style>{`
        .palette-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 15vh;
          animation: fadeIn 0.2s ease-out;
        }

        .palette-modal {
          width: 100%;
          max-width: 600px;
          background: var(--bg-dark);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .palette-search {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .search-icon {
          color: var(--fg-tertiary);
          margin-right: 1rem;
          font-size: 1.2rem;
        }

        .palette-search input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--fg-primary);
          font-size: 1.1rem;
          outline: none;
          font-family: var(--font-body);
        }

        .close-btn {
          background: rgba(255,255,255,0.1);
          border: none;
          color: var(--fg-secondary);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .palette-results {
          max-height: 400px;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .result-item {
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--fg-secondary);
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.1s;
        }

        .result-item.selected {
          background: var(--accent-cyan-dim);
          color: var(--accent-cyan);
        }

        .result-item.ai {
          background: rgba(var(--accent-violet-rgb), 0.1);
          border: 1px solid var(--accent-violet);
          align-items: flex-start;
        }

        .ai-response {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .ai-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent-violet);
          font-weight: bold;
        }

        .palette-footer {
          padding: 0.75rem 1.5rem;
          background: rgba(0,0,0,0.2);
          border-top: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
          color: var(--fg-tertiary);
          font-size: 0.8rem;
        }

        .no-results {
          padding: 2rem;
          text-align: center;
          color: var(--fg-tertiary);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Light Mode */
        html.light-mode .palette-overlay {
          background: rgba(255, 255, 255, 0.8);
        }
        
        html.light-mode .palette-modal {
          background: #ffffff;
          border-color: rgba(0, 0, 0, 0.1);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }
        
        html.light-mode .palette-search {
          border-color: rgba(0, 0, 0, 0.08);
        }
        
        html.light-mode .search-icon {
          color: #94a3b8;
        }
        
        html.light-mode .palette-search input {
          color: #1e293b;
        }
        
        html.light-mode .palette-search input::placeholder {
          color: #94a3b8;
        }
        
        html.light-mode .close-btn {
          background: rgba(0, 0, 0, 0.05);
          color: #64748b;
        }
        
        html.light-mode .result-item {
          color: #475569;
        }
        
        html.light-mode .result-item.selected {
          background: rgba(8, 145, 178, 0.1);
          color: #0891b2;
        }
        
        html.light-mode .result-item.ai {
          background: rgba(124, 58, 237, 0.08);
          border-color: #7c3aed;
        }
        
        html.light-mode .ai-label {
          color: #7c3aed;
        }
        
        html.light-mode .palette-footer {
          background: #f8fafc;
          border-color: rgba(0, 0, 0, 0.08);
          color: #94a3b8;
        }
        
        html.light-mode .no-results {
          color: #94a3b8;
        }
      `}</style>
        </div>
    );
};

export default CommandPalette;

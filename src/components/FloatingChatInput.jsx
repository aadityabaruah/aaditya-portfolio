import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { askGemini } from '../services/gemini';
import { useTheme } from '../context/ThemeContext';

const FloatingChatInput = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const { viewMode, theme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isExpanded]);

  // Close on click outside when no messages
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isExpanded && messages.length === 0 && containerRef.current && !containerRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded, messages.length]);

  // Simulate streaming effect for AI responses
  const streamResponse = async (text) => {
    setStreamingText('');
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setStreamingText(prev => prev + (i === 0 ? '' : ' ') + words[i]);
    }
    setStreamingText('');
    setMessages(prev => [...prev, { role: 'assistant', text }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    
    if (!isExpanded) {
      setIsExpanded(true);
    }
    
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const answer = await askGemini(userMessage);
      await streamResponse(answer);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  return (
    <>
      {/* SVG Filter for Liquid Glass Effect */}
      <svg style={{ display: 'none' }}>
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="150"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div 
        ref={containerRef}
        className={`chat-container ${isExpanded ? 'expanded' : ''} ${theme === 'light' ? 'light' : ''} ${viewMode === 'technical' ? 'technical' : ''}`}
      >
        
        {/* Backdrop with blur - only visible when expanded with messages */}
        <div 
          className={`chat-backdrop ${isExpanded && messages.length > 0 ? 'visible' : ''}`} 
          onClick={handleClose} 
        />
        
        {/* Liquid Glass Container */}
        <div 
          className={`liquidGlass-wrapper ${isExpanded ? 'expanded' : 'collapsed'}`}
          onClick={!isExpanded ? handleExpand : undefined}
          onMouseLeave={() => {
            if (isExpanded && messages.length === 0 && !isLoading) {
              setIsExpanded(false);
            }
          }}
        >
          {/* Glass Effect Layer */}
          <div className="liquidGlass-effect" />
          {/* Tint Layer */}
          <div className="liquidGlass-tint" />
          {/* Shine Layer */}
          <div className="liquidGlass-shine" />
          
          {/* Content Layer */}
          <div className="liquidGlass-content">
            
            {/* Collapsed State - Expanding Pill Button */}
            <div className={`collapsed-state ${isExpanded ? 'hidden' : ''}`}>
              <div className="ai-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor"/>
                  <path d="M18 14L18.75 16.25L21 17L18.75 17.75L18 20L17.25 17.75L15 17L17.25 16.25L18 14Z" fill="currentColor" opacity="0.6"/>
                </svg>
              </div>
              <span className="collapsed-text">Ask AI anything...</span>
            </div>
            
            {/* Expanded State */}
            <div className={`expanded-state ${isExpanded ? 'visible' : ''}`}>
              
              {/* Close Button - Only visible when there are messages */}
              {messages.length > 0 && (
                <button className="close-btn" onClick={handleClose} aria-label="Close">
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
              
              {/* Messages Panel */}
              <div className={`messages-panel ${messages.length > 0 || isLoading ? 'has-messages' : ''}`}>
                {/* Header */}
                <div className="panel-header">
                  <div className="header-left">
                    <div className="ai-indicator">
                      <span className="pulse-ring" />
                      <span className="pulse-dot" />
                    </div>
                    <span className="header-title">AI Assistant</span>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="messages-scroll">
                  {messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`message ${msg.role}`}
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      {msg.role === 'assistant' && (
                        <div className="avatar">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                          </svg>
                        </div>
                      )}
                      <div className="bubble">
                        {msg.role === 'assistant' ? (
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        ) : (
                          <span>{msg.text}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Streaming Response */}
                  {streamingText && (
                    <div className="message assistant streaming">
                      <div className="avatar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div className="bubble">
                        <ReactMarkdown>{streamingText}</ReactMarkdown>
                        <span className="cursor-blink">|</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Loading Indicator */}
                  {isLoading && !streamingText && (
                    <div className="message assistant">
                      <div className="avatar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div className="bubble loading">
                        <div className="typing-indicator">
                          <span /><span /><span />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Input Area */}
              <form onSubmit={handleSubmit} className="input-area">
                <div className="input-container">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message AI Assistant..."
                    disabled={isLoading}
                    className={isLoading ? 'disabled' : ''}
                  />
                  <button 
                    type="submit" 
                    className={`send-btn ${input.trim() ? 'active' : ''}`}
                    disabled={!input.trim() || isLoading}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <style>{`
          .chat-container {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
          }

          /* Backdrop */
          .chat-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0);
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
            pointer-events: none;
            transition: all 0.5s cubic-bezier(0.32, 0.72, 0, 1);
            z-index: -1;
          }

          .chat-backdrop.visible {
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            pointer-events: auto;
          }

          /* ========== LIQUID GLASS WRAPPER ========== */
          .liquidGlass-wrapper {
            position: relative;
            display: flex;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          }

          /* Collapsed State - Expanding Pill */
          .liquidGlass-wrapper.collapsed {
            width: 56px;
            height: 56px;
            padding: 0;
            border-radius: 28px;
            justify-content: center;
            align-items: center;
            transition: width 0.3s ease, height 0.3s ease, border-radius 0.3s ease, box-shadow 0.3s ease;
          }

          .liquidGlass-wrapper.collapsed:hover {
            width: 200px;
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(0, 0, 0, 0.15);
          }

          /* Expanded State */
          .liquidGlass-wrapper.expanded {
            width: 580px;
            max-width: 92vw;
            padding: 0;
            border-radius: 1.5rem;
            cursor: default;
            flex-direction: column;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35), 0 0 60px rgba(0, 0, 0, 0.15);
            transition: width 0.35s ease, border-radius 0.3s ease, box-shadow 0.3s ease;
          }

          /* Glass Effect Layer - just blur, no filter */
          .liquidGlass-effect {
            position: absolute;
            z-index: 0;
            inset: 0;
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            overflow: hidden;
            isolation: isolate;
            border-radius: inherit;
          }

          /* Tint Layer */
          .liquidGlass-tint {
            z-index: 1;
            position: absolute;
            inset: 0;
            background: rgba(255, 255, 255, 0.15);
            border-radius: inherit;
          }

          /* Shine Layer */
          .liquidGlass-shine {
            position: absolute;
            inset: 0;
            z-index: 2;
            overflow: hidden;
            border-radius: inherit;
            box-shadow: 
              inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5),
              inset -1px -1px 1px 1px rgba(255, 255, 255, 0.3);
          }

          /* Content Layer */
          .liquidGlass-content {
            position: relative;
            z-index: 3;
            display: flex;
            align-items: center;
            width: 100%;
          }

          .liquidGlass-wrapper.expanded .liquidGlass-content {
            flex-direction: column;
          }

          /* ========== COLLAPSED STATE - Expanding Pill ========== */
          .collapsed-state {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 100%;
            height: 100%;
            transition: all 0.5s cubic-bezier(0.32, 0.72, 0, 1);
            opacity: 1;
          }

          .collapsed-state.hidden {
            opacity: 0;
            position: absolute;
            pointer-events: none;
          }

          .ai-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: transparent;
            border-radius: 12px;
            color: rgba(255, 255, 255, 0.95);
            flex-shrink: 0;
            position: absolute;
            opacity: 1;
            transition: opacity 0.5s ease;
          }

          .liquidGlass-wrapper.collapsed:hover .ai-icon {
            opacity: 0;
          }

          .collapsed-text {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap;
            position: absolute;
            opacity: 0;
            transition: opacity 0.5s ease;
          }

          .liquidGlass-wrapper.collapsed:hover .collapsed-text {
            opacity: 1;
          }

          /* ========== EXPANDED STATE ========== */
          .expanded-state {
            display: flex;
            flex-direction: column;
            width: 100%;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            position: absolute;
          }

          .expanded-state.visible {
            opacity: 1;
            pointer-events: auto;
            position: relative;
          }

          /* Messages Panel */
          .messages-panel {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.4s cubic-bezier(0.32, 0.72, 0, 1);
          }

          .messages-panel.has-messages {
            grid-template-rows: 1fr;
          }

          .messages-panel > .panel-header,
          .messages-panel > .messages-scroll {
            overflow: hidden;
          }

          .messages-panel.has-messages .panel-header {
            padding: 12px 14px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .messages-panel.has-messages .messages-scroll {
            max-height: 50vh;
            overflow-y: auto;
            padding: 8px 12px;
          }

          /* Header */
          .panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0;
            transition: padding 0.3s ease;
          }

          .header-left {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .ai-indicator {
            position: relative;
            width: 10px;
            height: 10px;
            flex-shrink: 0;
          }

          .pulse-dot {
            position: absolute;
            width: 10px;
            height: 10px;
            background: #34d399;
            border-radius: 50%;
          }

          .pulse-ring {
            position: absolute;
            width: 10px;
            height: 10px;
            background: #34d399;
            border-radius: 50%;
            animation: pulse-ring 2s ease-out infinite;
          }

          @keyframes pulse-ring {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(2.5); opacity: 0; }
          }

          .header-title {
            font-size: 14px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.95);
            letter-spacing: -0.01em;
          }

          .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border: none;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            transition: all 0.2s ease;
            z-index: 10;
          }

          .close-btn:hover {
            background: rgba(255, 255, 255, 0.25);
            color: rgba(255, 255, 255, 1);
          }

          /* Messages Scroll */
          .messages-scroll {
            display: flex;
            flex-direction: column;
            gap: 8px;
            scroll-behavior: smooth;
            overflow-x: hidden;
            padding: 0;
            max-height: 0;
            transition: all 0.4s ease;
          }

          .messages-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .messages-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .messages-scroll::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 3px;
          }

          /* Messages */
          .message {
            display: flex;
            gap: 10px;
            animation: messageIn 0.4s cubic-bezier(0.32, 0.72, 0, 1) backwards;
            width: 100%;
            box-sizing: border-box;
          }

          @keyframes messageIn {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .message.user {
            flex-direction: row-reverse;
            justify-content: flex-start;
          }

          .avatar {
            flex-shrink: 0;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgba(120, 119, 198, 0.3), rgba(120, 119, 198, 0.1));
            border: 1px solid rgba(120, 119, 198, 0.3);
            border-radius: 10px;
            color: rgba(167, 139, 250, 0.9);
          }

          .bubble {
            padding: 10px 14px;
            border-radius: 16px;
            font-size: 14px;
            line-height: 1.45;
            max-width: 85%;
            position: relative;
          }

          .message.assistant .bubble {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.06);
            color: rgba(255, 255, 255, 0.92);
            border-bottom-left-radius: 6px;
          }

          .message.user .bubble {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.85) 0%, rgba(139, 92, 246, 0.85) 100%);
            color: white;
            border-bottom-right-radius: 6px;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.25);
          }

          .bubble p { margin: 0 0 6px 0; }
          .bubble p:last-child { margin: 0; }
          .bubble > span { display: block; }
          
          .bubble code {
            background: rgba(0, 0, 0, 0.3);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 13px;
            font-family: 'SF Mono', 'JetBrains Mono', monospace;
          }

          .bubble.loading {
            padding: 16px 20px;
          }

          /* Typing Indicator */
          .typing-indicator {
            display: flex;
            gap: 5px;
          }

          .typing-indicator span {
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            animation: typing 1.4s ease-in-out infinite;
          }

          .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
          .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

          @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
            30% { transform: translateY(-8px); opacity: 1; }
          }

          /* Streaming cursor */
          .cursor-blink {
            animation: blink 1s step-end infinite;
            color: rgba(167, 139, 250, 0.8);
            font-weight: 300;
          }

          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          /* Input Area */
          .input-area {
            padding: 12px;
          }

          .input-container {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 16px;
            padding: 6px 8px 6px 18px;
            transition: all 0.3s ease;
          }

          .input-container:focus-within {
            border-color: rgba(167, 139, 250, 0.4);
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.1);
          }

          .input-container input {
            flex: 1;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.95);
            font-size: 15px;
            outline: none;
            font-family: inherit;
            min-width: 0;
          }

          .input-container input::placeholder {
            color: rgba(255, 255, 255, 0.4);
          }

          .input-container input.disabled {
            opacity: 0.5;
          }

          .send-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border: none;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            color: rgba(255, 255, 255, 0.4);
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.32, 0.72, 0, 1);
            flex-shrink: 0;
          }

          .send-btn.active {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
          }

          .send-btn:disabled {
            cursor: not-allowed;
          }

          .send-btn.active:hover:not(:disabled) {
            transform: scale(1.08);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
          }

          /* ========== LIGHT MODE ========== */
          .chat-container.light .liquidGlass-tint {
            background: rgba(255, 255, 255, 0.35);
          }

          .chat-container.light .liquidGlass-shine {
            box-shadow: 
              inset 2px 2px 1px 0 rgba(255, 255, 255, 0.8),
              inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5);
          }

          .chat-container.light .ai-icon {
            color: #6366f1;
          }

          .chat-container.light .collapsed-text {
            color: rgba(0, 0, 0, 0.6);
          }

          .chat-container.light .chat-backdrop.visible {
            background: rgba(255, 255, 255, 0.6);
          }

          .chat-container.light .panel-header {
            border-color: rgba(0, 0, 0, 0.08);
          }

          .chat-container.light .header-title {
            color: rgba(0, 0, 0, 0.85);
          }

          .chat-container.light .close-btn {
            background: rgba(0, 0, 0, 0.08);
            color: rgba(0, 0, 0, 0.5);
          }

          .chat-container.light .close-btn:hover {
            background: rgba(0, 0, 0, 0.15);
            color: rgba(0, 0, 0, 0.8);
          }

          .chat-container.light .avatar {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(99, 102, 241, 0.05));
            border-color: rgba(99, 102, 241, 0.2);
            color: #6366f1;
          }

          .chat-container.light .message.assistant .bubble {
            background: rgba(0, 0, 0, 0.05);
            border-color: rgba(0, 0, 0, 0.08);
            color: rgba(0, 0, 0, 0.85);
          }

          .chat-container.light .bubble code {
            background: rgba(0, 0, 0, 0.08);
          }

          .chat-container.light .typing-indicator span {
            background: rgba(0, 0, 0, 0.3);
          }

          .chat-container.light .input-container {
            background: rgba(0, 0, 0, 0.05);
            border-color: rgba(0, 0, 0, 0.1);
          }

          .chat-container.light .input-container:focus-within {
            border-color: rgba(99, 102, 241, 0.4);
            background: rgba(0, 0, 0, 0.03);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
          }

          .chat-container.light .input-container input {
            color: rgba(0, 0, 0, 0.9);
          }

          .chat-container.light .input-container input::placeholder {
            color: rgba(0, 0, 0, 0.4);
          }

          .chat-container.light .send-btn {
            background: rgba(0, 0, 0, 0.06);
            color: rgba(0, 0, 0, 0.3);
          }

          .chat-container.light .messages-scroll::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.15);
          }

          .chat-container.light .cursor-blink {
            color: #6366f1;
          }

          /* ========== TECHNICAL MODE ========== */
          .chat-container.technical .liquidGlass-wrapper {
            border-radius: 0;
          }

          .chat-container.technical .input-container {
            border-radius: 0;
          }

          .chat-container.technical .send-btn,
          .chat-container.technical .close-btn,
          .chat-container.technical .ai-icon {
            border-radius: 0;
          }

          .chat-container.technical .bubble {
            border-radius: 0;
            font-family: 'JetBrains Mono', monospace;
          }

          .chat-container.technical .avatar {
            border-radius: 0;
          }

          /* Responsive */
          @media (max-width: 640px) {
            .chat-container {
              bottom: 16px;
            }

            .liquidGlass-wrapper.expanded {
              width: 95vw;
            }

            .messages-panel.has-messages .messages-scroll {
              max-height: 40vh;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default FloatingChatInput;

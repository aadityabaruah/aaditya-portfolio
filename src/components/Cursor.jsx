import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const Cursor = () => {
    const canvasRef = useRef(null);
    const { viewMode, theme } = useTheme();
    const themeRef = useRef({ viewMode, theme });
    
    useEffect(() => {
        themeRef.current = { viewMode, theme };
    }, [viewMode, theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let isRunning = true;

        // Configuration - optimized for performance
        const BALL_NUM = 30;           // Reduced from 40
        const R = 2;
        const SPEED = 0.25;
        const dis_limit = 120;          // Slightly reduced
        const mouse_dis_limit = 220;    // Slightly reduced

        let can_w = window.innerWidth;
        let can_h = window.innerHeight;
        let balls = [];
        let mouseX = -1000;
        let mouseY = -1000;
        let lastMouseUpdate = 0;
        const MOUSE_THROTTLE = 16;      // ~60fps throttle for mouse

        const getThemeColors = () => {
            const { viewMode: vm, theme: th } = themeRef.current;
            if (vm === 'technical') return { r: 0, g: 255, b: 65 };
            if (th === 'light') return { r: 8, g: 145, b: 178 };
            return { r: 34, g: 211, b: 238 };
        };

        // Create a ball that stays within bounds
        const createBall = () => {
            const angle = Math.random() * Math.PI * 2;
            return {
                x: Math.random() * can_w,
                y: Math.random() * can_h,
                vx: Math.cos(angle) * SPEED,
                vy: Math.sin(angle) * SPEED,
            };
        };

        // Initialize balls distributed across screen
        const initBalls = () => {
            balls = [];
            for (let i = 0; i < BALL_NUM; i++) {
                balls.push(createBall());
            }
        };

        // Update ball positions - bounce off edges to keep density
        const updateBalls = () => {
            for (let i = 0; i < balls.length; i++) {
                const b = balls[i];
                b.x += b.vx;
                b.y += b.vy;

                // Bounce off edges with slight randomization
                if (b.x < 0 || b.x > can_w) {
                    b.vx *= -1;
                    b.x = Math.max(0, Math.min(can_w, b.x));
                }
                if (b.y < 0 || b.y > can_h) {
                    b.vy *= -1;
                    b.y = Math.max(0, Math.min(can_h, b.y));
                }
            }
        };

        const render = () => {
            if (!isRunning) return;
            
            const color = getThemeColors();
            ctx.clearRect(0, 0, can_w, can_h);

            // Draw lines between nearby balls
            ctx.lineWidth = 0.5;
            for (let i = 0; i < balls.length; i++) {
                const b1 = balls[i];
                
                // Lines to other balls
                for (let j = i + 1; j < balls.length; j++) {
                    const b2 = balls[j];
                    const dx = b1.x - b2.x;
                    const dy = b1.y - b2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < dis_limit) {
                        const alpha = (1 - dist / dis_limit) * 0.35;
                        ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(b1.x, b1.y);
                        ctx.lineTo(b2.x, b2.y);
                        ctx.stroke();
                    }
                }
                
                // Lines to mouse - HIGHLIGHTED (brighter & thicker with glow effect)
                const mdx = b1.x - mouseX;
                const mdy = b1.y - mouseY;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < mouse_dis_limit) {
                    const alpha = (1 - mDist / mouse_dis_limit);
                    // Draw glow line (thicker, more transparent)
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${alpha * 0.3})`;
                    ctx.beginPath();
                    ctx.moveTo(b1.x, b1.y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                    // Draw main line (thinner, brighter)
                    ctx.lineWidth = 1.5;
                    ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${alpha * 0.95})`;
                    ctx.beginPath();
                    ctx.moveTo(b1.x, b1.y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                    ctx.lineWidth = 0.5;
                }
            }

            // Draw balls
            ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},0.8)`;
            for (let i = 0; i < balls.length; i++) {
                const b = balls[i];
                ctx.beginPath();
                ctx.arc(b.x, b.y, R, 0, Math.PI * 2);
                ctx.fill();
            }

            updateBalls();
            animationFrameId = requestAnimationFrame(render);
        };

        const initCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            can_w = window.innerWidth;
            can_h = window.innerHeight;
            canvas.width = can_w * dpr;
            canvas.height = can_h * dpr;
            canvas.style.width = `${can_w}px`;
            canvas.style.height = `${can_h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const handleResize = () => {
            initCanvas();
            initBalls();
        };

        const handleMouseMove = (e) => {
            const now = performance.now();
            if (now - lastMouseUpdate < MOUSE_THROTTLE) return;
            lastMouseUpdate = now;
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        // Touch event handlers for mobile
        const handleTouchStart = (e) => {
            if (e.touches.length > 0) {
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e) => {
            const now = performance.now();
            if (now - lastMouseUpdate < MOUSE_THROTTLE) return;
            lastMouseUpdate = now;
            if (e.touches.length > 0) {
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
            }
        };

        const handleTouchEnd = () => {
            // Keep the last position for a moment, then fade out
            setTimeout(() => {
                mouseX = -1000;
                mouseY = -1000;
            }, 500);
        };

        initCanvas();
        initBalls();
        render();

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            isRunning = false;
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    const opacity = theme === 'light' ? 0.5 : 0.7;

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 0,
                opacity,
                transition: 'opacity 0.3s ease'
            }}
        />
    );
};

export default Cursor;

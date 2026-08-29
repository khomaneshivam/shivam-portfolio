import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'link' | 'view'
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
      dotRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target;
      if (!target) return;

      const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select, .interactive-hover');
      const viewCard = target.closest('[data-cursor="view"]');

      if (viewCard) {
        setCursorState('view');
        setCursorText('VIEW');
      } else if (interactiveEl) {
        setCursorState('link');
        setCursorText('');
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Ambient Spotlight Mesh attached to cursor */}
      <div
        className="fixed pointer-events-none z-[1] transition-opacity duration-500 rounded-full"
        style={{
          width: '500px',
          height: '500px',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 65%)',
          opacity: 0.6,
        }}
      />

      {/* Trailing Cursor Ring */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full grid place-items-center transition-all duration-300 ease-out border ${
          cursorState === 'view'
            ? 'w-20 h-20 bg-[var(--accent)] border-[var(--accent)] text-[#1a1f2e] font-mono text-[10px] font-bold tracking-widest shadow-[0_0_20px_var(--accent-glow)]'
            : cursorState === 'link'
            ? 'w-12 h-12 bg-[var(--accent)]/15 border-[var(--accent)] scale-110'
            : 'w-7 h-7 bg-transparent border-[var(--accent)] opacity-70'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {cursorState === 'view' && <span>{cursorText}</span>}
      </div>

      {/* Sharp Center Pointer Dot */}
      <div
        className="fixed pointer-events-none z-[10000] w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}

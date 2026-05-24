import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsHovered(true);
        setCursorText(target.getAttribute('data-cursor') || '');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className={`flex items-center justify-center rounded-full border border-white/40 transition-all duration-300 ease-in-out ${
          isHovered 
            ? 'w-20 h-20 bg-white/10 backdrop-blur-sm border-white' 
            : 'w-8 h-8 bg-transparent'
        }`}
      >
        {isHovered && cursorText && (
          <span className="text-[10px] uppercase tracking-widest text-white font-light font-sans">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;

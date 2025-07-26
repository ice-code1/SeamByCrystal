import React, { useEffect, useState } from 'react';
import { Scissors } from 'lucide-react';

const ScrollScissor = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scissorPosition = Math.min(scrollY / 5, window.innerWidth - 100);
  const tearProgress = Math.min(scrollY / 3, window.innerWidth);

  return (
    <>
      {/* Scissor */}
      <div
        className="fixed top-8 z-50 transition-all duration-300 ease-out pointer-events-none"
        style={{
          left: `${scissorPosition}px`,
          transform: `rotate(${45 + scrollY / 10}deg)`,
        }}
      >
        <Scissors className="h-12 w-12 text-purple-600 drop-shadow-lg" />
      </div>

      {/* Fabric tear effect */}
      <div className="fixed top-0 left-0 right-0 h-20 z-30 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 h-full bg-gradient-to-b from-purple-100 to-transparent"
          style={{
            width: `${tearProgress}px`,
            clipPath: `polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%)`,
            boxShadow: `${tearProgress > 50 ? '0 4px 20px rgba(147, 51, 234, 0.3)' : 'none'}`,
          }}
        />
        <div
          className="absolute top-0 h-full"
          style={{
            left: `${tearProgress - 10}px`,
            width: '20px',
            background: 'linear-gradient(45deg, transparent 40%, rgba(147, 51, 234, 0.1) 50%, transparent 60%)',
          }}
        />
      </div>
    </>
  );
};

export default ScrollScissor;
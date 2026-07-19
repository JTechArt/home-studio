import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.hasAttribute('data-hover') || target.closest('[data-hover]'))) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Soft smooth tracking for the glow orb
  useEffect(() => {
    let animationFrameId: number;
    
    const updateGlow = () => {
      setGlowPos((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.1,
          y: prev.y + dy * 0.1,
        };
      });
      animationFrameId = requestAnimationFrame(updateGlow);
    };

    animationFrameId = requestAnimationFrame(updateGlow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  return (
    <>
      <div 
        className={`cursor ${isHovered ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div 
        className="cursor-glow"
        style={{
          left: `${glowPos.x}px`,
          top: `${glowPos.y}px`,
        }}
      />
    </>
  );
};

import React, { useEffect, useState } from 'react';

const sprinkleConfig = [
  { emoji: '🍒', top: '15%', left: '8%', factor: 35, size: '2.5rem' },
  { emoji: '🍫', top: '28%', left: '85%', factor: -45, size: '3rem' },
  { emoji: '✨', top: '40%', left: '12%', factor: 20, size: '1.8rem' },
  { emoji: '🍪', top: '55%', left: '78%', factor: -30, size: '2.5rem' },
  { emoji: '🍬', top: '68%', left: '6%', factor: 40, size: '2.2rem' },
  { emoji: '🍭', top: '82%', left: '88%', factor: -25, size: '2.8rem' },
  { emoji: '✨', top: '92%', left: '15%', factor: 15, size: '1.5rem' },
  { emoji: '🍧', top: '48%', left: '88%', factor: -35, size: '2.8rem' },
  { emoji: '🍦', top: '75%', left: '10%', factor: 30, size: '3.2rem' },
  { emoji: '🍩', top: '96%', left: '80%', factor: -40, size: '2.5rem' },
];

export default function AmbientSprinkles() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsMobile(isTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    let handleMouseMove;
    if (!isMobile) {
      handleMouseMove = (e) => {
        // Get normalized coordinate offsets (-1 to 1) from window center
        const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        setMouseOffset({ x, y });
      };
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', checkTouch);
      if (handleMouseMove) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      {sprinkleConfig.map((item, index) => {
        // Calculate offset based on specific item weight factor
        const translateX = mouseOffset.x * item.factor;
        const translateY = mouseOffset.y * item.factor;

        return (
          <div
            key={index}
            className={`floating-particle particle-${index}`}
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              fontSize: item.size,
              transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              filter: 'drop-shadow(0 10px 20px rgba(62, 39, 35, 0.08))',
              userSelect: 'none'
            }}
          >
            {item.emoji}
          </div>
        );
      })}

      <style>{`
        /* Slow continuous drifting animations for particles */
        .floating-particle {
          animation: particle-float 6s ease-in-out infinite;
        }
        
        /* Stagger float animation durations and directions */
        .particle-0 { animation-duration: 8s; }
        .particle-1 { animation-duration: 10s; animation-delay: -1s; }
        .particle-2 { animation-duration: 7s; animation-delay: -2s; }
        .particle-3 { animation-duration: 9s; animation-delay: -3s; }
        .particle-4 { animation-duration: 11s; animation-delay: -4s; }
        .particle-5 { animation-duration: 7.5s; animation-delay: -5s; }
        .particle-6 { animation-duration: 8.5s; animation-delay: -0.5s; }
        .particle-7 { animation-duration: 10.5s; animation-delay: -1.5s; }
        .particle-8 { animation-duration: 9.5s; animation-delay: -2.5s; }
        .particle-9 { animation-duration: 11.5s; animation-delay: -3.5s; }

        @keyframes particle-float {
          0% {
            margin-top: 0px;
            margin-left: 0px;
            transform: rotate(0deg);
          }
          50% {
            margin-top: -12px;
            margin-left: 8px;
            transform: rotate(6deg);
          }
          100% {
            margin-top: 0px;
            margin-left: 0px;
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}

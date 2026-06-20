import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
const gsapDirect = gsap;

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const liquidRef = useRef(null);
  const scoopsRef = useRef(null);
  const cherryRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Ensure body overflow is hidden during preload
    document.body.style.overflow = 'hidden';

    const tl = gsapDirect.timeline({
      onComplete: () => {
        // Restore scrolling capability
        document.body.style.overflow = '';
        
        // Slide out the preloader screen
        gsapDirect.to(containerRef.current, {
          y: '-100%',
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: onComplete
        });
      }
    });

    // 1. Cream filling the cone
    tl.to(liquidRef.current, {
      scaleY: 1,
      duration: 1.8,
      ease: 'power1.inOut'
    });

    // 2. Create the ice cream scoops (inflate)
    tl.fromTo(scoopsRef.current, 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.6)', transformOrigin: '50% 50%' },
      '-=0.1'
    );

    // 3. Drop the cherry on top of the chocolate scoop
    tl.fromTo(cherryRef.current,
      { y: -150, scale: 0, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'bounce.out', transformOrigin: '50% 50%' },
      '-=0.1'
    );

    // 4. Reveal text
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=1.2'
    );

    // 5. Short pause before entering the website
    tl.to({}, { duration: 0.6 });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'var(--color-chocolate, #3E2723)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        gap: '24px',
        overflow: 'hidden'
      }}
    >
      {/* Dynamic Graphic Container */}
      <div style={{ position: 'relative', width: '200px', height: '240px', display: 'flex', justifyContent: 'center' }}>
        
        {/* SVG Wrapper */}
        <svg 
          width="160" 
          height="240" 
          viewBox="0 0 120 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', bottom: 0 }}
        >
          {/* Cone Clip Definition for liquid cream */}
          <defs>
            <clipPath id="cone-clip">
              <path d="M10,40 L110,40 L60,170 Z" />
            </clipPath>
          </defs>

          {/* Liquid Cream Fill */}
          <rect 
            ref={liquidRef} 
            x="0" 
            y="40" 
            width="120" 
            height="130" 
            fill="var(--bg-primary, #FAF6F0)" 
            clipPath="url(#cone-clip)" 
            style={{ transformOrigin: '50% 170px', transform: 'scaleY(0)' }} 
          />

          {/* Wafer Cone Outline & Grid Pattern */}
          <path d="M10,40 L110,40 L60,170 Z" stroke="var(--color-accent, #E5A93B)" strokeWidth="4" strokeLinejoin="round" />
          <path d="M30,40 L75,135 M50,40 L85,115 M70,40 L95,95 M90,40 L102,66 M10,40 L45,135 M10,66 L30,115 M10,95 L20,95" stroke="var(--color-accent, #E5A93B)" strokeWidth="2" opacity="0.4" strokeLinecap="round" />

          {/* Overlapping Ice Cream Scoops */}
          <g ref={scoopsRef} style={{ transformOrigin: '60px 40px' }}>
            {/* Vanilla scoop (Left) */}
            <circle cx="38" cy="35" r="28" fill="#FFFDFB" />
            <circle cx="38" cy="35" r="28" fill="#F3ECE2" opacity="0.25" />
            
            {/* Strawberry scoop (Right) */}
            <circle cx="82" cy="35" r="28" fill="var(--color-pink-pastel, #FCEADE)" />
            
            {/* Chocolate scoop (Center Top) */}
            <circle cx="60" cy="12" r="30" fill="#5C4033" />
            
            {/* Chocolate syrup details */}
            <path d="M42,5 C50,15 54,2 60,12 C66,22 70,5 78,7" stroke="#3E2723" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>

          {/* Cherry Drop topping */}
          <g ref={cherryRef}>
            {/* Cherry stem */}
            <path d="M60,-18 C65,-36 80,-40 85,-35" stroke="#2C4B2A" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Cherry body */}
            <circle cx="60" cy="-18" r="12" fill="#D32F2F" />
            {/* Cherry shine */}
            <circle cx="56" cy="-22" r="3" fill="#FFF" opacity="0.7" />
          </g>
        </svg>

      </div>

      {/* Storytelling Preloader Text */}
      <h3 
        ref={textRef}
        style={{
          fontFamily: 'var(--font-headings)',
          color: 'var(--bg-primary, #FAF6F0)',
          fontWeight: '600',
          fontSize: '1.4rem',
          letterSpacing: '0.5px',
          textAlign: 'center',
          marginTop: '12px'
        }}
      >
        Creating Scoop Happiness...
      </h3>
    </div>
  );
}

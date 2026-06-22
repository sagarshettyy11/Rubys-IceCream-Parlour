import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const streamRef = useRef(null);
  const liquidRef = useRef(null);
  const scoop1Ref = useRef(null);
  const scoop2Ref = useRef(null);
  const scoop3Ref = useRef(null);
  const syrupRef = useRef(null);
  const cherryRef = useRef(null);
  const sprinklesGroupRef = useRef(null);
  const steamRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Ensure body overflow is hidden during preload
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(streamRef.current, { strokeDashoffset: 120 });
      gsap.set(liquidRef.current, { y: 90 }); // hidden below the cone opening
      gsap.set(scoop1Ref.current, { scale: 0 });
      gsap.set(scoop2Ref.current, { scale: 0 });
      gsap.set(scoop3Ref.current, { scale: 0 });
      gsap.set(syrupRef.current, { strokeDashoffset: 80 });
      gsap.set(cherryRef.current, { y: -180, scale: 0, opacity: 0 });
      
      if (sprinklesGroupRef.current) {
        const sprinkles = sprinklesGroupRef.current.children;
        for (let i = 0; i < sprinkles.length; i++) {
          gsap.set(sprinkles[i], { x: 0, y: 0, scale: 0, opacity: 0 });
        }
      }

      const tl = gsap.timeline({
        onComplete: () => {
          // Restore scrolling capability
          document.body.style.overflow = '';
          
          // Slide out the preloader screen smoothly
          gsap.to(containerRef.current, {
            y: '-100%',
            duration: 1.2,
            ease: 'power4.inOut',
            onComplete: onComplete
          });
        }
      });

      // 1. Dispense stream of cream downward
      tl.to(streamRef.current, {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'power2.in'
      });

      // Wiggle stream slightly during flow for dynamic fluid look
      gsap.to(streamRef.current, {
        x: '+=3',
        transformOrigin: '50% 25px',
        duration: 0.15,
        repeat: 8,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 2. Liquid cream fills the cone (rises from bottom)
      tl.to(liquidRef.current, {
        y: 0,
        duration: 1.4,
        ease: 'power1.out'
      }, '-=0.3');

      // Ripple the rising cream fill
      gsap.to(liquidRef.current, {
        x: '-=4',
        duration: 0.2,
        repeat: 6,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Fade in ambient steam
      tl.to(steamRef.current, {
        opacity: 0.6,
        y: -15,
        duration: 1.5,
        ease: 'power1.out'
      }, '-=1.2');

      // 3. Stop flow / retract cream stream
      tl.to(streamRef.current, {
        strokeDashoffset: 120,
        duration: 0.4,
        ease: 'power2.out'
      });

      // 4. Staggered Scoop Inflation (strawberry, vanilla, chocolate)
      tl.to(scoop1Ref.current, {
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.5)'
      }, '-=0.2');

      tl.to(scoop2Ref.current, {
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.5)'
      }, '-=0.4');

      tl.to(scoop3Ref.current, {
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.6)'
      }, '-=0.3');

      // 5. Hot chocolate drizzle/syrup flows over top scoop
      tl.to(syrupRef.current, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power1.inOut'
      }, '-=0.1');

      // 6. Cherry drops and bounces on the chocolate scoop
      tl.to(cherryRef.current, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'bounce.out'
      }, '-=0.2');

      // 7. Sprinkle explosion on cherry contact (sync with landing bounce)
      tl.add(() => {
        if (sprinklesGroupRef.current) {
          const sprinkles = sprinklesGroupRef.current.children;
          for (let i = 0; i < sprinkles.length; i++) {
            const angle = (i / sprinkles.length) * 360 * (Math.PI / 180);
            const distance = 40 + Math.random() * 30;
            
            gsap.fromTo(sprinkles[i],
              { x: 0, y: 0, scale: 0, opacity: 1, rotation: 0 },
              {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance - 10,
                scale: 0.8 + Math.random() * 0.6,
                rotation: Math.random() * 360,
                opacity: 0,
                duration: 1.2,
                ease: 'power2.out'
              }
            );
          }
        }
      }, '-=0.5');

      // 8. Storytelling preloader text reveal
      tl.fromTo(textRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=1.4'
      );

      // Keep state static briefly before entry
      tl.to({}, { duration: 0.8 });
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
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
        background: 'radial-gradient(circle, #2C1810 0%, #170904 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        gap: '24px',
        overflow: 'hidden'
      }}
    >
      {/* Decorative vector background */}
      <div 
        className="glow-highlight"
        style={{
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(229, 169, 59, 0.08) 0%, rgba(229, 169, 59, 0) 70%)',
          width: '500px',
          height: '500px',
          pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', width: '220px', height: '260px', display: 'flex', justifyContent: 'center' }}>
        
        {/* The Animated Ice Cream Builder SVG */}
        <svg 
          width="180" 
          height="260" 
          viewBox="0 0 120 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', bottom: 0 }}
        >
          {/* Definitions */}
          <defs>
            {/* Waffle Cone Clipping Mask */}
            <clipPath id="cone-mask">
              <path d="M26,102 L94,102 L60,172 Z" />
            </clipPath>
          </defs>

          {/* 1. Cool Steam/Condensation Floating Upwards */}
          <g ref={steamRef} opacity="0" style={{ transformOrigin: '60px 100px' }}>
            <path d="M35,110 C32,95 40,80 34,65 T38,40" stroke="#FAF6F0" strokeWidth="2.5" strokeLinecap="round" opacity="0.2" fill="none" />
            <path d="M60,115 C64,98 56,82 62,65 T58,40" stroke="#FAF6F0" strokeWidth="2.5" strokeLinecap="round" opacity="0.15" fill="none" />
            <path d="M85,110 C82,95 90,80 84,65 T88,40" stroke="#FAF6F0" strokeWidth="2.5" strokeLinecap="round" opacity="0.2" fill="none" />
          </g>

          {/* 2. Soft-Serve Cream Stream */}
          <path 
            ref={streamRef} 
            d="M60,28 L60,110" 
            stroke="#FAF6F0" 
            strokeWidth="14" 
            strokeLinecap="round" 
            strokeDasharray="120"
            strokeDashoffset="120"
          />

          {/* 3. Rising Cream inside Cone */}
          <g clipPath="url(#cone-mask)">
            <g ref={liquidRef}>
              {/* Cream Base Fill */}
              <rect x="15" y="102" width="90" height="80" fill="#FAF6F0" />
              {/* Wavy Surface shape */}
              <path d="M15,102 Q26,96 38,102 T60,102 T82,102 T105,102 L105,115 L15,115 Z" fill="#FAF6F0" />
            </g>
          </g>

          {/* 4. Golden Waffle Cone Outline, Shadow, and Waffle Grid */}
          <g>
            {/* Inner Dark Cone Shadow */}
            <path d="M26,102 L94,102 L60,172 Z" fill="#C58546" opacity="0.2" />
            {/* Outer Cone Line */}
            <path d="M26,102 L94,102 L60,172 Z" stroke="#E5A93B" strokeWidth="4" strokeLinejoin="round" fill="none" />
            {/* Grid Pattern */}
            <g opacity="0.35">
              <path d="M40,102 L68,156" stroke="#C58747" strokeWidth="2" strokeLinecap="round" />
              <path d="M54,102 L76,140" stroke="#C58747" strokeWidth="2" strokeLinecap="round" />
              <path d="M68,102 L84,128" stroke="#C58747" strokeWidth="2" strokeLinecap="round" />
              <path d="M82,102 L90,116" stroke="#C58747" strokeWidth="2" strokeLinecap="round" />
              <path d="M26,102 L60,172" stroke="#C58747" strokeWidth="2" strokeLinecap="round" />
              <path d="M26,116 L48,156" stroke="#C58747" strokeWidth="2" strokeLinecap="round" />
              <path d="M26,130 L38,150" stroke="#C58747" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>

          {/* 5. Strawberry Scoop (Pastel Pink, Bottom Left) */}
          <g ref={scoop1Ref}>
            <circle cx="42" cy="94" r="23" fill="#F4C2C2" />
            {/* Scoop shade/shadow overlay */}
            <path d="M22,94 A20,20 0 0,0 62,94 A20,20 0 0,1 22,94" fill="#DBA2A2" opacity="0.4" />
            <circle cx="34" cy="84" r="4" fill="#FFF" opacity="0.6" />
          </g>

          {/* 6. Vanilla Scoop (Cream White, Bottom Right) */}
          <g ref={scoop2Ref}>
            <circle cx="78" cy="94" r="23" fill="#FFFDF4" />
            {/* Scoop shade overlay */}
            <path d="M58,94 A20,20 0 0,0 98,94 A20,20 0 0,1 58,94" fill="#EBE5D3" opacity="0.45" />
            <circle cx="70" cy="84" r="4" fill="#FFF" opacity="0.8" />
          </g>

          {/* 7. Chocolate Scoop (Rich Brown, Top Center) */}
          <g ref={scoop3Ref}>
            <circle cx="60" cy="70" r="25" fill="#4E3629" />
            {/* Scoop shade overlay */}
            <path d="M38,70 A22,22 0 0,0 82,70 A22,22 0 0,1 38,70" fill="#38241B" opacity="0.55" />
            <circle cx="50" cy="58" r="5" fill="#FFF" opacity="0.25" />
          </g>

          {/* 8. Hot Fudge Drizzle (Draws over top scoop) */}
          <path 
            ref={syrupRef} 
            d="M41,58 C45,70 50,62 55,72 C59,78 63,64 67,76 C71,78 75,66 79,62" 
            stroke="#261710" 
            strokeWidth="5.5" 
            strokeLinecap="round" 
            fill="none" 
            strokeDasharray="80"
            strokeDashoffset="80"
          />

          {/* 9. Cherry Drop (Drops and bounces) */}
          <g ref={cherryRef}>
            {/* Cherry Stem */}
            <path d="M60,40 Q65,22 78,14" stroke="#4A6B1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Cherry Body */}
            <circle cx="60" cy="40" r="10.5" fill="#D32F2F" />
            {/* Cherry Shine */}
            <circle cx="56" cy="36" r="2.5" fill="#FFF" opacity="0.8" />
          </g>

          {/* 10. Sprinkle Explosions on Impact */}
          <g ref={sprinklesGroupRef}>
            <rect x="58" y="38" width="3.5" height="7" rx="1.5" fill="#E5A93B" />
            <rect x="58" y="38" width="3.5" height="7" rx="1.5" fill="#FF8A80" />
            <rect x="58" y="38" width="3.5" height="7" rx="1.5" fill="#80D8FF" />
            <rect x="58" y="38" width="3.5" height="7" rx="1.5" fill="#B9F6CA" />
            <rect x="58" y="38" width="3.5" height="7" rx="1.5" fill="#FFE57F" />
            <rect x="58" y="38" width="3.5" height="7" rx="1.5" fill="#EA80FC" />
            <rect x="58" y="38" width="3.5" height="7" rx="1.5" fill="#FF8A80" />
            <rect x="58" y="38" width="3.5" height="7" rx="1.5" fill="#80D8FF" />
          </g>

          {/* 11. Minimalist Dispenser Nozzle Outlet */}
          <g>
            <path d="M48,10 Q60,6 72,10 L69,26 Q60,29 51,26 Z" fill="#9BA2AE" stroke="#7A818C" strokeWidth="1" />
            <rect x="56" y="24" width="8" height="6" fill="#CD8C2E" rx="1" />
          </g>
        </svg>

      </div>

      {/* Narrative Preloader Text */}
      <h3 
        ref={textRef}
        style={{
          fontFamily: 'var(--font-headings)',
          color: '#FAF6F0',
          fontWeight: '600',
          fontSize: '1.4rem',
          letterSpacing: '0.8px',
          textAlign: 'center',
          marginTop: '12px'
        }}
      >
        Creating Scoop Happiness...
      </h3>
    </div>
  );
}

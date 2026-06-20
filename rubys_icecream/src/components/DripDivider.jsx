import React from 'react';

export default function DripDivider({ type = 'chocolate', flip = false }) {
  // Color variables corresponding to index.css
  const chocolateColor = 'var(--color-chocolate, #3E2723)';
  const creamColor = 'var(--bg-primary, #FAF6F0)';
  const beigeColor = 'var(--bg-tertiary, #F3ECE2)';

  if (type === 'chocolate') {
    // Melting chocolate drip SVG
    return (
      <div 
        style={{ 
          width: '100%', 
          overflow: 'hidden', 
          lineHeight: 0, 
          transform: flip ? 'scaleY(-1)' : 'none',
          pointerEvents: 'none',
          zIndex: 5,
          position: 'relative'
        }}
      >
        <svg 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none" 
          style={{ width: '100%', height: '80px', display: 'block' }}
        >
          <path 
            d="M0,0 L1440,0 L1440,20 C1380,45 1330,5 1280,30 C1230,55 1200,85 1160,85 C1120,85 1100,50 1060,30 C1020,10 990,45 940,65 C890,85 850,110 810,110 C770,110 740,65 690,45 C640,25 610,65 560,85 C510,105 470,120 430,120 C390,120 370,75 330,55 C290,35 250,75 200,85 C150,95 110,60 60,30 C10,0 0,20 0,20 Z" 
            fill={chocolateColor} 
          />
        </svg>
      </div>
    );
  }

  // Cream wave splash divider
  return (
    <div 
      style={{ 
        width: '100%', 
        overflow: 'hidden', 
        lineHeight: 0, 
        transform: flip ? 'scaleY(-1)' : 'none',
        pointerEvents: 'none',
        zIndex: 5,
        position: 'relative'
      }}
    >
      <svg 
        viewBox="0 0 1440 120" 
        preserveAspectRatio="none" 
        style={{ width: '100%', height: '80px', display: 'block' }}
      >
        <path 
          d="M0,40 C240,110 480,110 720,40 C960,-30 1200,-30 1440,40 L1440,120 L0,120 Z" 
          fill={type === 'beige' ? beigeColor : creamColor} 
        />
      </svg>
    </div>
  );
}

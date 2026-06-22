import React, { useEffect, useRef } from 'react';
import { ShoppingCart, Heart, Info, Star } from 'lucide-react';
import { menuItems } from '../data/menuData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Specials({ onAddToCart }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const signatureItems = menuItems.filter(item => 
    ['gadbad', 'biscoff-sundae', 'tiramisu-special', 'american-choconut'].includes(item.id)
  );

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger reveal cards
      gsap.fromTo('.special-card-wrapper', 
        { opacity: 0, y: 80 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // clean up GSAP context
  }, []);

  // 3D Card Tilt Calculation
  const handleCardMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    // Rotate card up to 15 degrees based on coordinates
    card.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) translateY(-10px)`;
  };

  const handleCardMouseLeave = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) return;

    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0deg)`;
  };

  return (
    <section 
      ref={sectionRef}
      id="specials" 
      className="section-padding"
      style={{ background: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background soft glowing orb */}
      <div 
        className="glow-highlight"
        style={{
          top: '20%',
          left: '10%',
          background: 'rgba(252, 234, 222, 0.4)',
          width: '500px',
          height: '500px'
        }}
      />

      <div className="container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '640px', margin: '0 auto 60px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
            <Star size={14} fill="var(--color-chocolate)" />
            Signature Sundaes
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
            Our Legendary Creations
          </h2>
          <p>
            Crafted for dessert connoisseurs. Taste the rich heritage, meticulous layering, and luxurious textures that make these sundaes our absolute crowd favorites.
          </p>
        </div>

        {/* Specials Cards Showcase Grid */}
        <div 
          ref={gridRef}
          className="specials-grid perspective-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            position: 'relative',
            zIndex: 2
          }}
        >
          {signatureItems.map((item) => (
            <div 
              key={item.id}
              className="special-card-wrapper" 
              style={{ transition: 'opacity 0.6s ease' }}
            >
              <div 
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                data-cursor="add"
                className="glass-panel special-card"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                  transition: 'transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
                  border: '1px solid var(--border-light)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Product Badge */}
                {item.badge && (
                  <span 
                    className="badge badge-pink"
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      zIndex: 10,
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Card Image Container */}
                <div 
                  style={{ 
                    height: '240px', 
                    overflow: 'hidden', 
                    position: 'relative',
                    background: 'var(--bg-primary)',
                    transform: 'translateZ(20px)' /* 3D pop effect */
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="special-img"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                  
                  {/* Hover details overlay */}
                  <div className="special-overlay">
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ background: 'var(--bg-secondary)', color: 'var(--color-chocolate)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Heart size={16} fill="var(--color-chocolate)" />
                      </span>
                      <span style={{ background: 'var(--bg-secondary)', color: 'var(--color-chocolate)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Info size={16} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div 
                  style={{ 
                    padding: '28px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    flexGrow: 1, 
                    justifyContent: 'space-between',
                    gap: '16px',
                    transform: 'translateZ(10px)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '700' }}>{item.name}</h3>
                      <span 
                        style={{ 
                          fontFamily: 'var(--font-headings)', 
                          fontWeight: '700', 
                          fontSize: '1.25rem',
                          color: 'var(--color-chocolate)'
                        }}
                      >
                        Rs. {item.price}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Add to Cart CTA */}
                  <button 
                    onClick={() => onAddToCart(item)}
                    className="btn btn-primary btn-sm"
                    style={{
                      width: '100%',
                      marginTop: '8px'
                    }}
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .special-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(62, 39, 37, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .special-card:hover .special-overlay {
          opacity: 1;
          pointer-events: auto;
        }
        .special-card:hover .special-img {
          transform: scale(1.1);
        }
        .special-card:hover {
          box-shadow: var(--shadow-lg);
          border-color: var(--color-accent) !important;
        }
      `}</style>
    </section>
  );
}

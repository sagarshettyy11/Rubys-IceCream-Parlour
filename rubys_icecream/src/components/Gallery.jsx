import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ZoomIn } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&auto=format&fit=crop',
    title: 'Gourmet Chocolate Crafting',
    tag: 'Kitchen'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=600&auto=format&fit=crop',
    title: 'Fresh Strawberry Waffle Cones',
    tag: 'Scoops'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
    title: 'Cozy Parlour Ambiance',
    tag: 'Parlour'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1600718374662-0483d2b9da44?q=80&w=600&auto=format&fit=crop',
    title: 'Artisanal Sundae Toppings',
    tag: 'Details'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600&auto=format&fit=crop',
    title: 'A Scoop of Happiness',
    tag: 'Moments'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1501443715855-6cf45ba6ac52?q=80&w=600&auto=format&fit=crop',
    title: 'Handcrafted Classic Cones',
    tag: 'Scoops'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop',
    title: 'Warm Fudge Drizzle',
    tag: 'Details'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1534706936960-8e9014c0b897?q=80&w=600&auto=format&fit=crop',
    title: 'Double Berry Sorbet Blend',
    tag: 'Scoops'
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);
  const masonryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: masonryRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Card Tilt Calculation
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)`;
  };

  return (
    <section ref={sectionRef} id="gallery" className="section-padding" style={{ background: 'var(--bg-tertiary)', overflow: 'hidden', position: 'relative' }}>
      
      {/* Background Glow */}
      <div 
        className="glow-highlight"
        style={{
          top: '30%',
          left: '20%',
          background: 'rgba(252, 234, 222, 0.4)',
          width: '500px',
          height: '500px'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ maxWidth: '640px', margin: '0 auto 60px', textAlign: 'center' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
            <Camera size={14} />
            Visual Stories
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
            Moments & Melts
          </h2>
          <p>
            Take a visual tour of our sweet creations, the cozy atmosphere of our parlor, and the happy smiles of our regular scoop lovers.
          </p>
        </div>

        {/* Masonry Layout */}
        <div ref={masonryRef} className="gallery-masonry">
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => setSelectedImage(image)}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              data-cursor="zoom"
              style={{ 
                cursor: 'pointer',
                transition: 'transform 0.1s ease-out'
              }}
            >
              <div className="gallery-img-wrapper" style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
                <img 
                  src={image.url} 
                  alt={image.title} 
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
                
                {/* Hover overlay details */}
                <div 
                  className="gallery-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to top, rgba(62, 39, 35, 0.8) 0%, rgba(62, 39, 35, 0.1) 80%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '24px',
                    opacity: 0,
                    transition: 'opacity 0.4s ease'
                  }}
                >
                  <span 
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(4px)',
                      color: 'white',
                      alignSelf: 'flex-start',
                      padding: '4px 10px',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {image.tag}
                  </span>
                  <h4 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {image.title}
                    <ZoomIn size={16} />
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(31, 21, 17, 0.95)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                backdropFilter: 'blur(8px)'
              }}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: 'white',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                className="close-lightbox"
              >
                <X size={24} />
              </button>

              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  maxWidth: '900px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  style={{
                    width: '100%',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    boxShadow: '0 24px 50px rgba(0,0,0,0.5)'
                  }}
                />
                <div style={{ textAlign: 'center', color: 'white' }}>
                  <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '4px' }}>{selectedImage.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Category: {selectedImage.tag}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        .gallery-masonry {
          column-count: 3;
          column-gap: 24px;
        }
        .gallery-item {
          break-inside: avoid;
        }
        .gallery-item:hover img {
          transform: scale(1.05);
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
        .close-lightbox:hover {
          background: rgba(255, 255, 255, 0.2) !important;
        }
        @media (max-width: 991px) {
          .gallery-masonry {
            column-count: 2;
            column-gap: 20px;
          }
        }
        @media (max-width: 600px) {
          .gallery-masonry {
            column-count: 1;
          }
        }
      `}</style>
    </section>
  );
}

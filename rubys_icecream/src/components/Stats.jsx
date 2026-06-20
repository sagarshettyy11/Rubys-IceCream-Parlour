import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Smile } from 'lucide-react';
import { stats, reviews } from '../data/menuData';

// Custom Auto-Incrementing Counter Component
function CounterItem({ label, targetValue, suffix }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTimestamp = null;
    const duration = 1500; // 1.5 seconds animation

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing out function
      const easeOutQuad = progress * (2 - progress);
      const currentValue = Math.floor(easeOutQuad * targetValue);
      
      setCount(currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, targetValue]);

  return (
    <div 
      ref={elementRef}
      style={{
        textAlign: 'center',
        padding: '24px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <h3 
        style={{ 
          fontSize: '3rem', 
          fontWeight: '800', 
          color: 'var(--color-chocolate)',
          marginBottom: '6px',
          fontFamily: 'var(--font-sans)'
        }}
      >
        {count.toLocaleString()}{suffix}
      </h3>
      <p style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--color-caramel)' }}>
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play reviews every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section id="testimonials" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Credibility Stats counters */}
        <div 
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '100px'
          }}
        >
          {stats.map((stat, i) => (
            <CounterItem 
              key={i} 
              label={stat.label} 
              targetValue={stat.value} 
              suffix={stat.suffix} 
            />
          ))}
        </div>

        {/* Testimonial slider header */}
        <div style={{ maxWidth: '640px', margin: '0 auto 60px', textAlign: 'center' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
            <Smile size={14} />
            Testimonials
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Scoop-Loving Reviews
          </h2>
        </div>

        {/* Testimonial Slider Panel */}
        <div 
          className="glass-panel"
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            borderRadius: 'var(--radius-lg)',
            padding: '50px 40px',
            position: 'relative',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {/* Quote Icon decorative */}
          <div 
            style={{ 
              position: 'absolute', 
              top: '24px', 
              left: '32px', 
              color: 'var(--color-accent-pastel)',
              zIndex: 0,
              opacity: 0.8
            }}
          >
            <Quote size={80} style={{ opacity: 0.15 }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: 'center' }}
              >
                {/* Rating stars */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(reviews[currentSlide].rating)].map((_, i) => (
                    <Star key={i} size={18} fill="var(--color-accent)" stroke="var(--color-accent)" />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote 
                  style={{ 
                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
                    fontFamily: 'var(--font-headings)', 
                    fontWeight: '600',
                    lineHeight: '1.5',
                    color: 'var(--color-chocolate)',
                    marginBottom: '32px',
                    fontStyle: 'italic'
                  }}
                >
                  "{reviews[currentSlide].text}"
                </blockquote>

                {/* Customer Info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                  <img 
                    src={reviews[currentSlide].avatar} 
                    alt={reviews[currentSlide].name} 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--color-accent)'
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{reviews[currentSlide].name}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-caramel)' }}>{reviews[currentSlide].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation controls */}
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                transform: 'translateY(-50%)',
                padding: '0 12px',
                pointerEvents: 'none'
              }}
              className="testimonial-nav"
            >
              <button 
                onClick={handlePrev}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--color-chocolate)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
                className="nav-btn"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNext}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--color-chocolate)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
                className="nav-btn"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px' }}>
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === currentSlide ? 'var(--color-chocolate)' : 'var(--color-accent-pastel)',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'background 0.3s ease'
                }}
              />
            ))}
          </div>

        </div>

      </div>

      <style>{`
        .nav-btn:hover {
          background-color: var(--color-chocolate) !important;
          color: var(--bg-primary) !important;
          transform: scale(1.05);
        }
        @media (max-width: 900px) {
          .testimonial-nav {
            position: static !important;
            transform: none !important;
            margin-top: 24px;
            justify-content: center !important;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}

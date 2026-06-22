import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Send, Star, Zap } from 'lucide-react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const { scrollY } = useScroll();
  const xRange = useTransform(scrollY, [0, 800], [isMobile ? -100 : -650, isMobile ? 100 : 450]);
  const rotateRange = useTransform(scrollY, [0, 800], [-15, 25]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const maskWordVariants = {
    hidden: { y: '105%' },
    visible: {
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 4, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Magnetic Button physics logic
  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    e.currentTarget.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0) scale(1.03)`;
  };

  const handleMagneticLeave = (e) => {
    e.currentTarget.style.transform = `translate3d(0, 0, 0) scale(1)`;
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent("Hello Ruby's Ice Cream! I'd like to check the menu and place an order.");
    window.open(`https://wa.me/919999999999?text=${text}`, '_blank');
  };

  return (
    <section 
      id="home" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '100px',
        position: 'relative',
        overflow: 'visible',
        background: 'radial-gradient(circle at 80% 20%, #FAF0E4 0%, var(--bg-primary) 70%)'
      }}
    >
      {/* Background Glowing Lights */}
      <div 
        className="glow-highlight"
        style={{
          top: '10%',
          right: '15%',
          background: 'rgba(229, 169, 59, 0.15)',
          width: '600px',
          height: '600px'
        }}
      />
      <div 
        className="glow-highlight"
        style={{
          bottom: '-10%',
          left: '-10%',
          background: 'rgba(252, 234, 222, 0.6)',
          width: '500px',
          height: '500px'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Column: Heading & CTAs */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Top Tagline Badge */}
            <motion.div variants={itemVariants}>
              <span className="badge badge-gold">
                <Star size={14} fill="var(--color-chocolate)" />
                Est. 2008 &bull; Coastal Legacy
              </span>
            </motion.div>

            {/* Mask-based Cinematic Heading */}
            <h1 
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.4rem)',
                fontWeight: '800',
                color: 'var(--color-chocolate)',
                lineHeight: '1.1',
                fontFamily: 'var(--font-headings)'
              }}
            >
              <span style={{ display: 'block', overflow: 'hidden', height: '1.2em', paddingBottom: '0.1em' }}>
                <motion.span variants={maskWordVariants} style={{ display: 'inline-block' }}>Where Every</motion.span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden', height: '1.2em', paddingBottom: '0.1em' }}>
                <motion.span variants={maskWordVariants} style={{ display: 'inline-block', position: 'relative' }}>
                  <span style={{ color: 'var(--color-accent)' }}>Scoop</span>
                  <svg 
                    viewBox="0 0 100 20" 
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: '-4px',
                      width: '100%',
                      height: '10px',
                      fill: 'none',
                      stroke: 'var(--color-chocolate)',
                      strokeWidth: '4',
                      strokeLinecap: 'round'
                    }}
                  >
                    <path d="M5,15 C35,5 65,5 95,15" />
                  </svg>
                </motion.span>
                <motion.span variants={maskWordVariants} style={{ display: 'inline-block', marginLeft: '12px' }}>is a Smile</motion.span>
              </span>
            </h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'var(--color-caramel)',
                maxWidth: '540px',
                lineHeight: '1.6'
              }}
            >
              Indulge in our luxurious handcrafted ice creams, signature Gadbad sundaes, and thick, creamy milkshakes. Made daily with fresh coastal ingredients and a pinch of happiness.
            </motion.p>

            {/* Magnetic CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                marginTop: '12px'
              }}
            >
              <a 
                href="#menu" 
                className="btn btn-primary"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                data-cursor="magnetic"
                style={{ transition: 'transform 0.1s ease-out' }}
              >
                View Menu
                <ArrowRight size={18} />
              </a>
              <button 
                onClick={handleWhatsAppContact} 
                className="btn btn-whatsapp"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                data-cursor="magnetic"
                style={{ transition: 'transform 0.1s ease-out' }}
              >
                <Send size={18} />
                Order via WhatsApp
              </button>
            </motion.div>

            {/* Brand Highlights */}
            <motion.div 
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '32px',
                marginTop: '24px',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '24px'
              }}
              className="hero-highlights"
            >
              <div>
                <h4 style={{ fontSize: '1.5rem', fontWeight: '700' }}>100%</h4>
                <p style={{ fontSize: '0.85rem' }}>Fresh Cream</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.5rem', fontWeight: '700' }}>45+</h4>
                <p style={{ fontSize: '0.85rem' }}>Rich Flavors</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Local</h4>
                <p style={{ fontSize: '0.85rem' }}>Coastal Pride</p>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Floating 3D parallax cone */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            
            {/* Ambient Sparkles */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                zIndex: 1,
                color: 'var(--color-accent)',
                transform: `translate3d(${mousePosition.x * -15}px, ${mousePosition.y * -15}px, 0)`
              }}
            >
              <Zap size={32} fill="var(--color-accent)" style={{ opacity: 0.25 }} />
            </motion.div>

            {/* Interactive tag floating opposite to mouse */}
            <div 
              style={{
                position: 'absolute',
                bottom: '15%',
                right: '5%',
                zIndex: 4,
                background: 'var(--color-pink-pastel)',
                padding: '8px 16px',
                borderRadius: '50px',
                boxShadow: 'var(--shadow-md)',
                fontSize: '0.85rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transform: `translate3d(${mousePosition.x * -25}px, ${mousePosition.y * -25}px, 0)`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              🍦 Fresh Waffles!
            </div>


            {/* Simple static Ice Cream Image */}
            <div 
              style={{ 
                width: '100%', 
                maxWidth: '480px', 
                display: 'flex', 
                justifyContent: 'center', 
                zIndex: 3,
                position: 'relative'
              }}
            >
              <img 
                src="/images/Ice-Cream.webp" 
                alt="Delicious Ice Cream"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 30px rgba(62, 39, 35, 0.15))'
                }}
              />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 48px;
        }
        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 56px;
            padding-bottom: 60px;
          }
          .hero-grid div {
            align-items: center;
            justify-content: center;
          }
          .hero-highlights {
            justify-content: center;
          }
          #home {
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
}

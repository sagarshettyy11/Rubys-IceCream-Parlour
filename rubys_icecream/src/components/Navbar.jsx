import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, IceCream } from 'lucide-react';

export default function Navbar({ cartCount, onCartClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Specials', href: '#specials' },
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' }
  ];

  // Magnetic Pull Calculation Hook-like functions
  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // Draw element center 35% towards the mouse cursor
    e.currentTarget.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
  };

  const handleMagneticLeave = (e) => {
    e.currentTarget.style.transform = `translate3d(0, 0, 0)`;
  };

  return (
    <header 
      className={`header ${isScrolled ? 'glass-panel scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isScrolled ? '12px 0' : '24px 0',
        transition: 'var(--transition-smooth)',
        borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a 
          href="#home" 
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          data-cursor="magnetic"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            textDecoration: 'none', 
            color: 'var(--color-chocolate)',
            fontFamily: 'var(--font-headings)',
            fontWeight: '800',
            fontSize: '1.4rem',
            letterSpacing: '0.5px',
            transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <IceCream size={28} style={{ color: 'var(--color-accent)' }} />
          <span>RUBY'S</span>
        </a>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          <ul style={{ display: 'flex', gap: '28px', listStyle: 'none', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  data-cursor="magnetic"
                  style={{
                    color: 'var(--color-chocolate)',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '0.95rem',
                    transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.3s ease',
                    position: 'relative',
                    display: 'inline-block',
                    padding: '6px 12px'
                  }}
                  className="nav-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Cart Icon trigger */}
          <button 
            onClick={onCartClick}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            data-cursor="magnetic"
            style={{
              position: 'relative',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-chocolate)',
              transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s ease',
              boxShadow: 'var(--shadow-sm)'
            }}
            className="cart-trigger"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--color-chocolate)',
                  color: 'var(--bg-primary)',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  minWidth: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-chocolate)',
              display: 'none',
              padding: '6px'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div 
          className="glass-panel"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: 'var(--color-chocolate)',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    display: 'block'
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Adding custom responsive CSS rules directly */}
      <style>{`
        .desktop-nav {
          display: flex;
        }
        .mobile-toggle {
          display: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0px;
          left: 12px;
          background-color: var(--color-accent);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: calc(100% - 24px);
        }
        .nav-link:hover {
          color: var(--color-accent) !important;
        }
        .cart-trigger:hover {
          border-color: var(--color-accent);
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}

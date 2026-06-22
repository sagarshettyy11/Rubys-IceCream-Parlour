import React from 'react';
import { IceCream, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{
        background: 'var(--color-chocolate)',
        color: 'var(--bg-primary)',
        padding: '60px 0 30px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        {/* Top Section */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '30px'
          }}
          className="footer-top"
        >
          {/* Logo & Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a 
              href="#home" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                textDecoration: 'none', 
                color: 'var(--bg-primary)',
                fontFamily: 'var(--font-headings)',
                fontWeight: '800',
                fontSize: '1.4rem'
              }}
            >
              <img 
                src="/images/Rubys-Ice-CreamLogo.jpeg" 
                alt="Ruby's Ice Cream Logo" 
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  border: '2px solid var(--color-accent)',
                  boxShadow: 'var(--shadow-sm)'
                }} 
              />
              <span>RUBY'S</span>
            </a>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', maxWidth: '280px' }}>
              Handcrafting premium dairy moments and serving smiles since 2008.
            </p>
          </div>

          {/* Quick Links */}
          <ul 
            style={{ 
              display: 'flex', 
              gap: '24px', 
              listStyle: 'none', 
              flexWrap: 'wrap'
            }}
            className="footer-links"
          >
            <li><a href="#home" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }} className="footer-link">Home</a></li>
            <li><a href="#specials" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }} className="footer-link">Specials</a></li>
            <li><a href="#menu" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }} className="footer-link">Menu</a></li>
            <li><a href="#gallery" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }} className="footer-link">Gallery</a></li>
            <li><a href="#contact" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }} className="footer-link">Contact</a></li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div 
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '30px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.5)'
          }}
          className="footer-bottom"
        >
          <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            &copy; {currentYear} Ruby's Ice Cream Parlour. All rights reserved.
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255, 255, 255, 0.5)' }}>
            Made with <Heart size={12} fill="#D32F2F" stroke="#D32F2F" /> for Ice Cream Lovers.
          </p>
        </div>

      </div>

      <style>{`
        .footer-link:hover {
          color: var(--color-accent) !important;
        }
        @media (max-width: 600px) {
          .footer-top {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .footer-links {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}

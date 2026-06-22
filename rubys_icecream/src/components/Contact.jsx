import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  const handleMapClick = () => {
    window.open('https://maps.app.goo.gl/AMcmmY1m3WNGPQY96?g_st=ic', '_blank');
  };

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="container">
        
        {/* Contact Grid layout */}
        <div 
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '56px',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
                <MapPin size={14} />
                Visit Us
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '16px' }}>
                Come Grab a Scoop
              </h2>
              <p>
                Whether you want to dine in with family or order your favorite sundae right to your doorstep via WhatsApp, we are always ready to serve you.
              </p>
            </div>

            {/* Contact details list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Detail Item: Location */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span 
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-chocolate)',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={20} />
                </span>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Our Location</h4>
                  <p style={{ fontSize: '0.9rem' }}>Ruby's Ice-Cream Parlour, Kudva's Grandeur, Surathkal, Mangaluru, Karnataka 575014</p>
                </div>
              </div>

              {/* Detail Item: Hours */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span 
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-chocolate)',
                    flexShrink: 0
                  }}
                >
                  <Clock size={20} />
                </span>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Business Hours</h4>
                  <p style={{ fontSize: '0.9rem' }}>Open Daily: 11:00 AM - 11:30 PM <br /><span style={{ color: 'var(--color-accent)', fontWeight: '600' }}>Happy Hours: 4:00 PM - 7:00 PM</span></p>
                </div>
              </div>

              {/* Detail Item: Phone */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span 
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-chocolate)',
                    flexShrink: 0
                  }}
                >
                  <Phone size={20} />
                </span>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Phone & Support</h4>
                  <p style={{ fontSize: '0.9rem' }}>
                    Tel: +91 82968 37118 <br />
                    WhatsApp: +91 82968 37118
                  </p>
                </div>
              </div>

            </div>

            {/* Social Presence Links */}
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '12px' }}>Follow Our Sweet Journey</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-chocolate)',
                    transition: 'all 0.2s ease'
                  }}
                  className="social-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                {/* Facebook */}
                <a 
                  href="https://facebook.com" 
                  target="_blank"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-chocolate)',
                    transition: 'all 0.2s ease'
                  }}
                  className="social-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                {/* Twitter */}
                <a 
                  href="https://twitter.com" 
                  target="_blank"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-chocolate)',
                    transition: 'all 0.2s ease'
                  }}
                  className="social-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>
          </div>


          {/* Right Column: Embedded Map Card */}
          <div 
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              boxShadow: 'var(--shadow-md)',
              width: '100%',
              height: '450px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ flexGrow: 1, borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative' }}>
              <iframe
                title="Ruby's Ice Cream Parlour Location Map"
                src="https://maps.google.com/maps?q=Ruby's%20Ice-Cream%20Parlour,%20Kudva's%20Grandeur,%20Surathkal,%20Mangaluru,%20Karnataka%20575014&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <button 
              onClick={handleMapClick}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '50px',
                background: 'var(--color-chocolate)',
                color: 'var(--bg-primary)',
                border: 'none',
                fontFamily: 'var(--font-sans)',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              className="map-btn"
            >
              <Send size={16} />
              Open in Google Maps
            </button>
          </div>

        </div>

        {/* Simple integrated copyright footer */}
        <div 
          style={{ 
            marginTop: '60px', 
            borderTop: '1px solid var(--border-color)', 
            paddingTop: '30px', 
            textAlign: 'center', 
            fontSize: '0.85rem',
            color: 'var(--color-caramel)'
          }}
        >
          <p style={{ color: 'var(--color-caramel)', margin: 0 }}>
            &copy; {new Date().getFullYear()} Ruby's Ice Cream Parlour. All rights reserved. | Made with ❤ for Ice Cream Lovers.
          </p>
        </div>

      </div>

      <style>{`
        .social-btn:hover {
          background-color: var(--color-chocolate) !important;
          color: var(--bg-primary) !important;
          transform: translateY(-2px);
        }
        .map-btn:hover {
          background-color: var(--color-accent) !important;
          color: #3E2723 !important;
        }
        @media (max-width: 991px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}

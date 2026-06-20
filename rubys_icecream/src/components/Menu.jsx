import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { categories, menuItems } from '../data/menuData';

export default function Menu({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // 3D Card Tilt Calculation
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0deg)`;
  };

  // Magnetic Pull Calculation for filter buttons
  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    e.currentTarget.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
  };

  const handleMagneticLeave = (e) => {
    e.currentTarget.style.transform = `translate3d(0, 0, 0)`;
  };

  return (
    <section id="menu" className="section-padding" style={{ background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative' }}>
      
      {/* Background Soft Glow */}
      <div 
        className="glow-highlight"
        style={{
          bottom: '15%',
          right: '5%',
          background: 'rgba(229, 169, 59, 0.1)',
          width: '500px',
          height: '500px'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ maxWidth: '640px', margin: '0 auto 40px', textAlign: 'center' }}>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
            <SlidersHorizontal size={14} />
            Explore Flavors
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
            The Parlour Menu
          </h2>
          <p>
            From heritage classics to modern fusion, browse our complete range of handcrafted dairy delights. Filter by category or search your favorite scoop.
          </p>
        </div>

        {/* Filters & Search Bar controls */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
            marginBottom: '48px'
          }}
        >
          {/* Search Input */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px'
            }}
          >
            <span 
              style={{
                position: 'absolute',
                left: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-caramel)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Search size={20} />
            </span>
            <input 
              type="text" 
              placeholder="Search vanilla, chocolate, Biscoff..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px 16px 52px',
                borderRadius: '50px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: 'var(--color-chocolate)',
                outline: 'none',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition-smooth)'
              }}
              className="search-input"
            />
          </div>

          {/* Category Filter Pills */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              width: '100%'
            }}
            className="filter-pills"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                data-cursor="magnetic"
                className={`filter-pill ${activeCategory === category.id ? 'active' : ''}`}
                style={{
                  padding: '10px 24px',
                  borderRadius: '50px',
                  border: '1px solid var(--border-color)',
                  background: activeCategory === category.id ? 'var(--color-chocolate)' : 'var(--bg-secondary)',
                  color: activeCategory === category.id ? 'var(--bg-primary)' : 'var(--color-chocolate)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px'
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                data-cursor="add"
                className="menu-card"
                style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
                  boxShadow: 'var(--shadow-sm)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Product Image */}
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative', transform: 'translateZ(10px)' }}>
                  {item.badge && (
                    <span 
                      className="badge badge-gold badge-sm"
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        zIndex: 2,
                        fontSize: '0.75rem',
                        padding: '4px 10px'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="menu-card-img"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                </div>

                {/* Details */}
                <div 
                  style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                    gap: '12px',
                    transform: 'translateZ(5px)'
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px' }}>{item.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-caramel)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', height: '40px', lineHeight: '1.4' }}>
                      {item.description || 'Delightful artisanal cold scoop made with rich fresh cream and natural flavor elements.'}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifySpace: 'between', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-headings)', 
                        fontWeight: '700', 
                        fontSize: '1.15rem',
                        color: 'var(--color-chocolate)'
                      }}
                    >
                      Rs. {item.price}
                    </span>
                    <button 
                      onClick={() => onAddToCart(item)}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'var(--color-chocolate)',
                        color: 'var(--bg-primary)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      className="add-to-cart-btn"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div 
            style={{ 
              textAlign: 'center', 
              padding: '60px 0', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '12px',
              color: 'var(--color-caramel)'
            }}
          >
            <AlertCircle size={40} />
            <h3 style={{ fontSize: '1.25rem' }}>No Flavors Found</h3>
            <p>Try searching for another flavor keyword or clear your search input.</p>
          </div>
        )}

      </div>

      <style>{`
        .search-input:focus {
          border-color: var(--color-chocolate) !important;
          box-shadow: 0 0 0 3px rgba(62, 39, 35, 0.1) !important;
        }
        .filter-pill:hover {
          background-color: var(--bg-tertiary);
        }
        .filter-pill.active:hover {
          background-color: var(--color-chocolate);
        }
        .menu-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--color-accent);
        }
        .menu-card:hover .menu-card-img {
          transform: scale(1.08);
        }
        .add-to-cart-btn:hover {
          background-color: var(--color-accent) !important;
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}

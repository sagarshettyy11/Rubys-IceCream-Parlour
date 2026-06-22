import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Send, MessageSquare } from 'lucide-react';

// Component Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Specials from './components/Specials';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Stats from './components/Stats';
import Contact from './components/Contact';
import CartDrawer from './components/CartDrawer';
// Awwwards Premium Upgrade Components
import AmbientSprinkles from './components/AmbientSprinkles';
import DripDivider from './components/DripDivider';

// Load Lenis styling
import 'lenis/dist/lenis.css';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    // Disable Lenis on touch/mobile devices for native momentum scroll performance
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Cart Handlers
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    // Auto-open cart drawer on adding item for direct micro-feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Quick Action for Floating WhatsApp Button
  const handleFloatingAction = () => {
    if (cart.length > 0) {
      setIsCartOpen(true);
    } else {
      const text = encodeURIComponent("Hello Ruby's Ice Cream! I'd like to ask about today's special flavors.");
      window.open(`https://wa.me/918296837118?text=${text}`, '_blank');
    }
  };

  return (
    <>
      {/* Navigation Header */}
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      {/* Main Container wrapping ambient particles */}
      <div style={{ position: 'relative', width: '100%' }}>
        {/* Parallax drifting sprinkles and candies */}
        <AmbientSprinkles />

        {/* Page Section stack with melting liquid dividers */}
        <main>
          <Hero />

          {/* Smooth beige splash wave below Hero */}
          <DripDivider type="beige" />

          <Specials onAddToCart={handleAddToCart} />

          {/* Melting dark chocolate drip divider below Specials */}
          <DripDivider type="chocolate" />

          <Menu onAddToCart={handleAddToCart} />

          {/* Flipped beige splash wave below Menu */}
          <DripDivider type="beige" flip={true} />

          <Gallery />

          {/* Melting dark chocolate drip divider below Gallery */}
          <DripDivider type="chocolate" />

          <Stats />
          <Contact />
        </main>
      </div>

      {/* Sliding WhatsApp Cart Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        )}
      </AnimatePresence>

      {/* Floating Action Button (WhatsApp Speed Dial) */}
      <button
        onClick={handleFloatingAction}
        className="whatsapp-float"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 999,
          background: 'var(--color-whatsapp)',
          color: 'white',
          border: 'none',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {cartCount > 0 ? (
          <div style={{ position: 'relative' }}>
            <span style={{ fontSize: '1.25rem' }}>🛒</span>
            <span
              style={{
                position: 'absolute',
                top: '-12px',
                right: '-12px',
                background: 'var(--color-chocolate)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: '700',
                borderRadius: '50%',
                minWidth: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              {cartCount}
            </span>
          </div>
        ) : (
          <MessageSquare size={26} fill="white" />
        )}
      </button>

      <style>{`
        .whatsapp-float:hover {
          transform: scale(1.1) translateY(-4px);
          background-color: var(--color-whatsapp-dark);
          box-shadow: 0 12px 28px rgba(37, 211, 102, 0.45);
        }
        .whatsapp-float:not(:active) {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-ring {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4), 0 8px 24px rgba(37, 211, 102, 0.3);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(37, 211, 102, 0), 0 8px 24px rgba(37, 211, 102, 0.3);
          }
        }
      `}</style>
    </>
  );
}

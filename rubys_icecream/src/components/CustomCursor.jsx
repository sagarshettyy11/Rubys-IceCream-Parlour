import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isMobile, setIsMobile] = useState(true);

  // Position trackers
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics config for smooth lag
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device has touch capability (mobile/tablet)
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsMobile(isTouch);

    if (isTouch) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    // On desktop, add body class to hide the default cursor and set up mouse listeners
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e) => {
      // Set to exact mouse coordinates
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor'); // 'add', 'zoom', 'link', 'magnetic'
        setCursorType(type);
        if (type === 'add') {
          setCursorText('ADD');
        } else if (type === 'zoom') {
          setCursorText('VIEW');
        } else if (type === 'link' || type === 'magnetic') {
          setCursorType('hovered');
          setCursorText('');
        }
      } else {
        // Check if hover is text input/textarea
        const isTextInput = e.target.closest('input, textarea');
        if (isTextInput) {
          setCursorType('text');
          setCursorText('');
          return;
        }

        // Check if hover is general link or button
        const isInteractive = e.target.closest('a, button, select, [role="button"], .cart-trigger, .add-to-cart-btn');
        if (isInteractive) {
          setCursorType('hovered');
          setCursorText('');
        } else {
          setCursorType('default');
          setCursorText('');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  if (isMobile) return null;

  // Custom styling based on current state (without X/Y springs which are applied to the wrapper)
  const getVariants = () => {
    switch (cursorType) {
      case 'add':
        return {
          width: 64,
          height: 64,
          backgroundColor: 'rgba(62, 39, 35, 0.15)', // semi-transparent chocolate
          borderColor: 'var(--color-chocolate)',
          scale: 1,
          opacity: 1
        };
      case 'zoom':
        return {
          width: 64,
          height: 64,
          backgroundColor: 'rgba(229, 169, 59, 0.2)', // semi-transparent gold
          borderColor: 'var(--color-accent)',
          scale: 1,
          opacity: 1
        };
      case 'hovered':
        return {
          width: 56,
          height: 56,
          backgroundColor: 'rgba(229, 169, 59, 0.08)', // subtle tint
          borderColor: 'var(--color-accent)', // stands out nicely
          scale: 1.1,
          opacity: 1
        };
      case 'text':
        return {
          width: 0,
          height: 0,
          scale: 0,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          opacity: 0
        };
      default:
        return {
          width: 24,
          height: 24,
          backgroundColor: 'transparent',
          borderColor: 'var(--color-chocolate)',
          scale: 1,
          opacity: 1
        };
    }
  };

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: cursorXSpring,
        y: cursorYSpring,
        pointerEvents: 'none',
        zIndex: 9999
      }}
    >
      {/* Outer Ring */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: '50%',
          border: '2px solid var(--color-chocolate)',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translate(-50%, -50%)', // Keeps it perfectly centered
          transformOrigin: 'center center'
        }}
        animate={getVariants()}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.25 }}
      >
        {cursorText && (
          <span 
            style={{
              fontSize: '0.65rem',
              fontWeight: '800',
              letterSpacing: '1px',
              color: 'var(--color-chocolate)' // dark chocolate stands out nicely!
            }}
          >
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      {cursorType !== 'text' && !cursorText && (
        <motion.div
          animate={{
            scale: cursorType === 'hovered' ? 1.5 : 1,
            backgroundColor: cursorType === 'hovered' ? 'var(--color-accent)' : 'var(--color-chocolate)'
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        />
      )}
    </motion.div>
  );
}

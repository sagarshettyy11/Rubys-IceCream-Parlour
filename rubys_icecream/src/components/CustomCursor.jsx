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
    const checkDevice = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsMobile(isTouch);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    // Track mouse coordinates
    const handleMouseMove = (e) => {
      // Offset by half of cursor default size (16px)
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    // Track mouse hover states on interactive tags
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
        // Check if hover is general link or button
        const isInteractive = e.target.closest('a, button, input, select, textarea, [role="button"]');
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
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile) return null;

  // Custom styling based on current state
  const getVariants = () => {
    switch (cursorType) {
      case 'add':
        return {
          width: 64,
          height: 64,
          backgroundColor: 'var(--color-chocolate)',
          borderColor: 'var(--color-chocolate)',
          x: cursorXSpring,
          y: cursorYSpring,
          scale: 1
        };
      case 'zoom':
        return {
          width: 64,
          height: 64,
          backgroundColor: 'var(--color-accent)',
          borderColor: 'var(--color-accent)',
          x: cursorXSpring,
          y: cursorYSpring,
          scale: 1
        };
      case 'hovered':
        return {
          width: 48,
          height: 48,
          backgroundColor: 'rgba(62, 39, 35, 0.1)',
          borderColor: 'var(--color-chocolate)',
          scale: 1.2,
          x: cursorXSpring,
          y: cursorYSpring
        };
      default:
        return {
          width: 32,
          height: 32,
          backgroundColor: 'transparent',
          borderColor: 'var(--color-chocolate)',
          scale: 1,
          x: cursorXSpring,
          y: cursorYSpring
        };
    }
  };

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        borderRadius: '50%',
        border: '2px solid var(--color-chocolate)',
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformOrigin: 'center center'
      }}
      animate={getVariants()}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
    >
      {cursorText && (
        <span 
          style={{
            fontSize: '0.65rem',
            fontWeight: '800',
            letterSpacing: '1px',
            color: cursorType === 'zoom' ? 'var(--color-chocolate)' : 'var(--bg-primary)'
          }}
        >
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}

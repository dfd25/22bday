import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MAP_WIDTH } from '../../utils/constants';

/**
 * A ship that sails along the map as the user scrolls horizontally.
 * Uses a pre-calculated sinusoidal wave path for the ship's Y position.
 */
export default function ShipTracker({ progress = 0 }) {
  // Ship's horizontal position based on scroll progress
  const shipX = progress * (MAP_WIDTH - 200);

  // Gentle wave motion for Y offset
  const shipY = Math.sin(progress * Math.PI * 6) * 8;

  // Ship tilts slightly as it rides waves
  const shipRotation = Math.sin(progress * Math.PI * 8) * 3;

  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{
        zIndex: 'var(--z-ship)',
        bottom: 140,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <motion.svg
        width="80"
        height="50"
        viewBox="0 0 80 50"
        animate={{
          y: shipY,
          rotate: shipRotation,
        }}
        transition={{
          type: 'tween',
          duration: 0.3,
          ease: 'easeOut',
        }}
      >
        {/* Hull */}
        <path
          d="M10,35 Q15,45 40,45 Q65,45 70,35 L65,30 Q40,33 15,30 Z"
          fill="#8B5E3C"
          stroke="#5C3A1E"
          strokeWidth="1"
        />

        {/* Hull detail */}
        <path
          d="M18,35 Q40,38 62,35"
          fill="none"
          stroke="#6B4226"
          strokeWidth="0.8"
        />

        {/* Mast */}
        <line x1="40" y1="32" x2="40" y2="5" stroke="#5C3A1E" strokeWidth="2" />

        {/* Sail */}
        <path
          d="M42,8 Q55,18 42,28 Z"
          fill="#FFF8ED"
          stroke="#D4C39E"
          strokeWidth="0.8"
        />

        {/* Second small sail */}
        <path
          d="M38,10 Q28,17 38,24 Z"
          fill="#FFF8ED"
          stroke="#D4C39E"
          strokeWidth="0.6"
          opacity="0.8"
        />

        {/* Flag — simple scale animation instead of path morphing */}
        <motion.g
          animate={{ scaleX: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '40px 7px' }}
        >
          <path
            d="M40,5 Q46,3 44,8 Q46,7 40,9"
            fill="#F4978E"
          />
        </motion.g>

        {/* Bow detail */}
        <circle cx="12" cy="33" r="2" fill="#D4A853" />

        {/* Wave splash */}
        <motion.path
          d="M5,40 Q8,37 11,40"
          fill="none"
          stroke="#7BB3D4"
          strokeWidth="1"
          opacity="0.5"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  );
}

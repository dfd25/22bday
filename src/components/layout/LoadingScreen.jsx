import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOADING_MESSAGES } from '../../utils/constants';

export default function LoadingScreen({ onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev >= LOADING_MESSAGES.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onComplete?.(), 800);
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="loading-screen paper-texture"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Parchment background texture */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at center, #F4E4C1 0%, #EAD9B7 60%, #D4C39E 100%)
              `,
            }}
          />

          {/* Decorative map lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#8B7355" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Compass Rose */}
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="relative"
            style={{ zIndex: 10 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            {/* Outer ring */}
            <circle cx="60" cy="60" r="55" fill="none" stroke="#5C4033" strokeWidth="1.5" opacity="0.5" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#5C4033" strokeWidth="0.5" opacity="0.3" />

            {/* Cardinal points */}
            <polygon points="60,8 65,45 60,40 55,45" fill="#D4A853" opacity="0.9" /> {/* N */}
            <polygon points="60,112 65,75 60,80 55,75" fill="#5C4033" opacity="0.6" /> {/* S */}
            <polygon points="112,60 75,55 80,60 75,65" fill="#5C4033" opacity="0.6" /> {/* E */}
            <polygon points="8,60 45,55 40,60 45,65" fill="#5C4033" opacity="0.6" /> {/* W */}

            {/* Inter-cardinal points */}
            <polygon points="97,23 72,48 68,44" fill="#8B7355" opacity="0.4" />
            <polygon points="97,97 72,72 68,76" fill="#8B7355" opacity="0.4" />
            <polygon points="23,97 48,72 52,76" fill="#8B7355" opacity="0.4" />
            <polygon points="23,23 48,48 52,44" fill="#8B7355" opacity="0.4" />

            {/* Center */}
            <circle cx="60" cy="60" r="4" fill="#D4A853" />
            <circle cx="60" cy="60" r="2" fill="#5C4033" />
          </motion.svg>

          {/* Loading text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              className="loading-text mt-8 relative"
              style={{ zIndex: 10, fontFamily: 'var(--font-handwriting)', fontSize: '1.6rem', color: '#5C4033' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {LOADING_MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex gap-3 mt-6 relative" style={{ zIndex: 10 }}>
            {LOADING_MESSAGES.map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: i <= messageIndex ? '#D4A853' : '#D4C39E',
                }}
                animate={i <= messageIndex ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

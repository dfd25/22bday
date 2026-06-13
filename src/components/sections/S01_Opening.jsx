import { motion } from 'framer-motion';
import Clouds from '../decorative/Clouds';
import Seagulls from '../decorative/Seagulls';
import Waves from '../decorative/Waves';

/**
 * Section 1: Opening Scene — Hero
 * The starting point of the map. Ocean, ship, title, subtitle.
 */
export default function S01_Opening() {
  return (
    <section
      id="opening"
      className="relative flex-shrink-0 flex items-center justify-center snap-center"
      style={{
        width: 1400,
        minWidth: '100vw',
        height: '100%',
        background: `
          linear-gradient(180deg,
            #87CEEB 0%,
            #7BB3D4 25%,
            #4E8DB5 50%,
            #3A6E91 70%,
            #2E5A7A 100%
          )
        `,
      }}
    >
      {/* Sky gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(247,178,103,0.15) 0%, transparent 60%)',
        }}
      />

      <Clouds count={6} baseY={30} />
      <Seagulls count={3} />

      {/* Main content */}
      <div className="relative text-center" style={{ zIndex: 20 }}>
        {/* Decorative compass above title */}
        <motion.div
          className="mx-auto mb-6"
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto">
            <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255,248,237,0.4)" strokeWidth="1" />
            <polygon points="30,4 33,25 30,22 27,25" fill="rgba(212,168,83,0.8)" />
            <polygon points="30,56 33,35 30,38 27,35" fill="rgba(255,248,237,0.4)" />
            <polygon points="56,30 35,27 38,30 35,33" fill="rgba(255,248,237,0.4)" />
            <polygon points="4,30 25,27 22,30 25,33" fill="rgba(255,248,237,0.4)" />
            <circle cx="30" cy="30" r="3" fill="rgba(212,168,83,0.8)" />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="display-text"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            color: '#FFF8ED',
            letterSpacing: '0.04em',
            textShadow: '0 2px 20px rgba(0,0,0,0.2)',
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          The Grand Line
          <br />
          <span style={{ fontSize: '0.6em', fontWeight: 400, fontStyle: 'italic', opacity: 0.9 }}>
            of Us
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="handwritten mt-6"
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: 'rgba(255,248,237,0.85)',
            maxWidth: 500,
            margin: '1.5rem auto 0',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          Every great adventure begins with an unexpected meeting.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
        >
          <span
            className="annotation"
            style={{ fontSize: '0.85rem', color: 'rgba(255,248,237,0.6)' }}
          >
            scroll to set sail
          </span>
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M5 12 L12 12 M12 7 L19 12 L12 17"
              stroke="rgba(255,248,237,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </motion.svg>
        </motion.div>
      </div>

      {/* Ocean waves at bottom */}
      <Waves color="#3A6E91" opacity={0.6} />

      {/* Decorative doodle — small paper boat */}
      <motion.svg
        width="40"
        height="30"
        viewBox="0 0 40 30"
        className="absolute"
        style={{ bottom: 130, right: 200, zIndex: 15 }}
        animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M5,22 L20,8 L35,22 Z" fill="rgba(255,248,237,0.7)" stroke="rgba(255,248,237,0.4)" strokeWidth="1" />
        <line x1="20" y1="8" x2="20" y2="3" stroke="rgba(255,248,237,0.5)" strokeWidth="1" />
      </motion.svg>
    </section>
  );
}

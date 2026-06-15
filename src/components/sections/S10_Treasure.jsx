import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_LETTER } from '../../utils/constants';

/**
 * Section 10: The Treasure — Birthday Letter
 * Minimal design. Handwritten letter on paper. Compass morphs to heart.
 * Stars appear. Ship rests. Final message.
 */
export default function S10_Treasure() {
  const [showFinal, setShowFinal] = useState(false);
  const [compassToHeart, setCompassToHeart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCompassToHeart(true), 3000);
    const timer2 = setTimeout(() => setShowFinal(true), 5000);
    return () => { clearTimeout(timer); clearTimeout(timer2); };
  }, []);

  return (
    <section
      id="treasure"
      className="relative flex-shrink-0 paper-texture snap-center"
      onWheel={(event) => event.stopPropagation()}
      style={{
        width: 1400,
        minWidth: '100vw',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: 'linear-gradient(135deg, #FFF8ED 0%, #F4E4C1 50%, #FFF8ED 100%)',
      }}
    >
      {/* Soft paper grain overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Letter content */}
      <div
        className="treasure-letter relative flex flex-col"
        style={{
          width: 'min(760px, calc(100% - 48px))',
          margin: '0 auto',
          padding: '80px 48px 150px',
          zIndex: 20,
        }}
      >
        {/* Title */}
        <motion.h2
          className="handwritten text-center"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#5C4033',
            marginBottom: 12,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {BIRTHDAY_LETTER.to}
        </motion.h2>

        <motion.p
          className="handwritten text-center"
          style={{
            fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
            color: '#8B7355',
            fontStyle: 'italic',
            lineHeight: 1.7,
            margin: '0 auto 32px',
            maxWidth: 540,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {BIRTHDAY_LETTER.prelude}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mx-auto"
          style={{
            width: 80,
            height: 1,
            backgroundColor: '#D4C39E',
            marginBottom: 38,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        {/* Letter paragraphs */}
        {BIRTHDAY_LETTER.paragraphs.map((para, i) => (
          <motion.p
            key={i}
            className="handwritten"
            style={{
              fontSize: 'clamp(1.15rem, 1.7vw, 1.35rem)',
              color: '#4A3219',
              lineHeight: 1.85,
              fontWeight: 500,
              marginBottom: 30,
              textAlign: 'left',
            }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.4, duration: 0.8 }}
          >
            {para}
          </motion.p>
        ))}

        {/* Compass → Heart morphing SVG */}
        <motion.div
          className="mx-auto my-10"
          style={{ width: 60, height: 60 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 3 }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <motion.path
              d={compassToHeart
                ? "M30 52 C20 44 8 36 12 24 C15 14 24 12 30 20 C36 12 45 14 48 24 C52 36 40 44 30 52 Z"
                : "M30 4 L33 26 L30 23 L27 26 Z M30 56 L33 34 L30 37 L27 34 Z M56 30 L34 27 L37 30 L34 33 Z M4 30 L26 27 L23 30 L26 33 Z"
              }
              fill={compassToHeart ? '#F4978E' : 'none'}
              stroke={compassToHeart ? '#E87B71' : '#D4A853'}
              strokeWidth={compassToHeart ? 1.5 : 1.5}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            {!compassToHeart && (
              <circle cx="30" cy="30" r="3" fill="#D4A853" />
            )}
          </svg>
        </motion.div>

        {/* Happy Birthday */}
        <motion.h3
          className="handwritten text-center"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            color: '#5C4033',
            marginTop: 10,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 3.5, duration: 1 }}
        >
          {BIRTHDAY_LETTER.closing}
        </motion.h3>

        <motion.p
          className="handwritten text-center"
          style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            color: '#A45D55',
            marginTop: 14,
            fontWeight: 600,
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 3.8, duration: 1 }}
        >
          {BIRTHDAY_LETTER.declaration}
        </motion.p>
        {/* Signature */}
        <motion.p
          className="handwritten text-center mt-6"
          style={{
            fontSize: '1.4rem',
            color: '#8B7355',
            whiteSpace: 'pre-line',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 4, duration: 1 }}
        >
          {BIRTHDAY_LETTER.signature}
        </motion.p>

        {/* Final message */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 5, duration: 2 }}
        >
          <div
            className="mx-auto mb-4"
            style={{
              width: 40,
              height: 1,
              backgroundColor: '#D4C39E',
            }}
          />
          <p
            className="handwritten"
            style={{
              fontSize: '1.1rem',
              color: '#8B7355',
              fontStyle: 'italic',
              maxWidth: 400,
              margin: '0 auto',
            }}
          >
            {BIRTHDAY_LETTER.finalMessage}
          </p>
        </motion.div>

        {/* Back to Start Button */}
        <motion.button
          className="mt-12 px-6 py-3 rounded-full cursor-pointer"
          style={{
            background: 'rgba(212,168,83,0.15)',
            border: '1px solid rgba(212,168,83,0.4)',
            color: '#8B7355',
            fontSize: '1.1rem',
            fontFamily: 'var(--font-heading)',
            transition: 'all 0.3s ease',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 6, duration: 1 }}
          whileHover={{
            background: 'rgba(212,168,83,0.3)',
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const el = document.getElementById('opening');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Read Our Story Again
        </motion.button>
      </div>

      {/* Soft falling stars at the end */}
      {showFinal && Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: -10,
            left: `${10 + ((i * 37) % 80)}%`,
            width: 3,
            height: 3,
            backgroundColor: '#D4A853',
            zIndex: 5,
          }}
          animate={{
            y: [0, window.innerHeight + 20],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + (i % 4) * 0.7,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Ship at rest — bottom right */}
      <motion.svg
        width="60"
        height="40"
        viewBox="0 0 60 40"
        className="absolute"
        style={{ bottom: 30, right: 100, zIndex: 15 }}
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 0.4, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 4, duration: 1.5 }}
      >
        <path d="M8,28 Q12,36 30,36 Q48,36 52,28 L48,24 Q30,27 12,24 Z" fill="#8B7355" />
        <line x1="30" y1="26" x2="30" y2="8" stroke="#8B7355" strokeWidth="1.5" />
        <path d="M32,10 Q40,16 32,22 Z" fill="#D4C39E" />
      </motion.svg>
    </section>
  );
}

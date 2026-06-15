import { motion } from 'framer-motion';
import Stars from '../decorative/Stars';
import Waves from '../decorative/Waves';

/**
 * Section 8: The Grand Line of Tomorrow — Future
 * Dreamlike island, moonlit ocean, stars, future possibilities.
 */
export default function S08_GrandLine() {
  const futureItems = [
    { text: 'Tokyo sunsets', x: '15%', y: '25%', delay: 0 },
    { text: 'Hackathons at dawn', x: '45%', y: '18%', delay: 0.3 },
    { text: 'Our first launch', x: '75%', y: '22%', delay: 0.6 },
    { text: 'Adventures unknown', x: '30%', y: '40%', delay: 0.9 },
    { text: 'More chapters to write', x: '60%', y: '38%', delay: 1.2 },
  ];

  return (
    <section
      id="grand-line"
      className="relative flex-shrink-0 flex items-center justify-center snap-center"
      style={{ width: 1400, minWidth: '100vw', height: '100%' }}
    >
      {/* Deep night sky with aurora hints */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(180deg,
            #0A0E1A 0%,
            #0F1B2E 15%,
            #1A2940 35%,
            #1F3552 50%,
            #2E4A6A 65%,
            #3A6E91 85%,
            #2E5A7A 100%
          )
        `,
      }} />

      {/* Moon */}
      <motion.div
        className="absolute"
        style={{
          top: '8%',
          right: '15%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #FFF8ED 0%, #E8D5B7 50%, #D4C39E 100%)',
          boxShadow: '0 0 60px rgba(255,248,237,0.3), 0 0 120px rgba(255,248,237,0.1)',
          zIndex: 5,
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Aurora / Northern lights effect */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          left: '10%',
          width: '80%',
          height: '30%',
          background: 'linear-gradient(90deg, transparent, rgba(78,141,181,0.06), rgba(168,230,163,0.04), rgba(200,180,255,0.05), transparent)',
          filter: 'blur(30px)',
          zIndex: 3,
        }}
        animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Stars count={60} color="#E8C97A" />

      {/* Dreamlike island silhouettes in distance */}
      <svg className="absolute bottom-0 w-full" height="200" viewBox="0 0 1400 200" preserveAspectRatio="none" style={{ zIndex: 4 }}>
        {/* Distant islands */}
        <path d="M100,180 Q150,120 200,160 Q250,140 300,180" fill="#1A2940" opacity="0.5" />
        <path d="M600,170 Q680,100 760,130 Q800,120 850,170" fill="#1A2940" opacity="0.4" />
        <path d="M1100,175 Q1150,130 1200,155 Q1250,140 1300,175" fill="#1A2940" opacity="0.3" />

        {/* Main reflective water surface */}
        <rect x="0" y="160" width="1400" height="40" fill="#1A2940" opacity="0.3" />
      </svg>

      {/* Floating future items — appear like ethereal labels */}
      {futureItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: item.x,
            top: item.y,
            zIndex: 15,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: item.delay, duration: 0.8 }}
        >
          <motion.div
            className="px-4 py-2 rounded-full"
            style={{
              background: 'rgba(255,248,237,0.06)',
              border: '1px solid rgba(232,201,122,0.15)',
              backdropFilter: 'blur(4px)',
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{
              background: 'rgba(255,248,237,0.12)',
              borderColor: 'rgba(232,201,122,0.4)',
              scale: 1.05,
            }}
          >
            <span className="annotation" style={{ color: 'rgba(232,201,122,0.7)', fontSize: '0.95rem' }}>
              {item.text}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* Central message */}
      <motion.div
        className="relative text-center"
        style={{ zIndex: 20, marginTop: 60 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <h2
          className="display-text"
          style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            color: '#FFF8ED',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            lineHeight: 1.3,
            maxWidth: 500,
            margin: '0 auto',
          }}
        >
          The map keeps going.
        </h2>
        <motion.p
          className="handwritten mt-4"
          style={{
            fontSize: '1.3rem',
            color: 'rgba(232,201,122,0.7)',
            maxWidth: 400,
            margin: '1rem auto 0',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
        >
          And the best islands haven't been drawn yet.
        </motion.p>
      </motion.div>

      {/* Photo — latest adventure */}
      <motion.div
        className="absolute"
        style={{
          top: '15%',
          left: '8%',
          zIndex: 18,
          width: 190,
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 30px rgba(232,201,122,0.08)',
          border: '1px solid rgba(232,201,122,0.15)',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(232,201,122,0.15)' }}
      >
        <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
          <img
            src={`${import.meta.env.BASE_URL}photos/IMG-20250428-WA0082.jpg`}
            alt="Our latest adventure"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
        <div style={{
          background: 'rgba(10,14,26,0.9)',
          padding: '8px 12px',
          textAlign: 'center',
        }}>
          <p className="handwritten" style={{ fontSize: '0.9rem', color: 'rgba(232,201,122,0.7)' }}>
            the latest island ✨
          </p>
        </div>
      </motion.div>

      {/* Shooting star */}
      <motion.div
        className="absolute"
        style={{
          top: '15%',
          left: '20%',
          width: 2,
          height: 2,
          backgroundColor: '#FFF8ED',
          borderRadius: '50%',
          zIndex: 6,
          boxShadow: '0 0 4px #FFF8ED',
        }}
        animate={{
          x: [0, 300],
          y: [0, 100],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 8,
          ease: 'easeOut',
        }}
      />

      <Waves color="#0F1B2E" opacity={0.3} />
    </section>
  );
}

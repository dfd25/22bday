import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Stars from '../decorative/Stars';
import Waves from '../decorative/Waves';

/**
 * Section 9: Laugh Tale — The Final Island
 * Largest and most beautiful island. Golden atmosphere. Treasure chest.
 */
export default function S09_LaughTale({ onChestOpen }) {
  const [chestOpened, setChestOpened] = useState(false);

  const handleChestClick = () => {
    if (!chestOpened) {
      setChestOpened(true);
      setTimeout(() => onChestOpen?.(), 2000);
    }
  };

  return (
    <section
      id="laugh-tale"
      className="relative flex-shrink-0 flex items-center justify-center snap-center"
      style={{ width: 1800, minWidth: '100vw', height: '100%' }}
    >
      {/* Golden sunset sky */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(180deg,
            #F7B267 0%,
            #F7C97A 15%,
            #FACF97 30%,
            #E8C97A 45%,
            #D4A853 55%,
            #B08A3E 65%,
            #6E7A5A 80%,
            #3A6E91 100%
          )
        `,
      }} />

      {/* Golden light radiance */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 60%, rgba(247,178,103,0.4) 0%, transparent 50%)',
      }} />

      <Stars count={20} color="rgba(255,248,237,0.5)" />

      {/* Large island */}
      <svg className="absolute bottom-0 w-full" height="450" viewBox="0 0 1800 450" preserveAspectRatio="none" style={{ zIndex: 10 }}>
        {/* Main island mass */}
        <path
          d="M200,450 L200,350 Q350,250 500,280 Q650,200 800,230 Q950,180 1000,200 Q1100,160 1200,200 Q1350,180 1500,250 Q1600,300 1600,350 L1600,450 Z"
          fill="#EAD9B7"
        />
        {/* Island highlight */}
        <path
          d="M300,450 L300,330 Q450,260 600,290 Q750,220 900,250 Q1050,200 1100,220 Q1200,190 1300,230 Q1400,260 1500,300 L1500,450 Z"
          fill="#F4E4C1"
          opacity="0.5"
        />

        {/* Path to treasure */}
        <motion.path
          d="M500,350 Q600,320 700,330 Q800,310 900,300"
          fill="none"
          stroke="#8B7355"
          strokeWidth="3"
          strokeDasharray="10,8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>

      {/* Decorative palm trees */}
      {[350, 600, 1200, 1450].map((x, i) => (
        <svg key={i} className="absolute" style={{ bottom: 280 + i * 20, left: x, zIndex: 12 }} width="60" height="130" viewBox="0 0 60 130">
          <line x1="30" y1="130" x2={28 + i * 2} y2="50" stroke="#8B7355" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="15" cy="45" rx="22" ry="8" fill="#6B8E23" opacity="0.7" transform={`rotate(${-30 + i * 5} 15 45)`} />
          <ellipse cx="45" cy="42" rx="24" ry="7" fill="#6B8E23" opacity="0.8" transform={`rotate(${25 - i * 3} 45 42)`} />
          <ellipse cx="28" cy="38" rx="18" ry="7" fill="#7BA832" opacity="0.9" transform={`rotate(${-10 + i * 2} 28 38)`} />
        </svg>
      ))}

      {/* Section title */}
      <motion.div
        className="absolute"
        style={{ top: 50, left: '50%', transform: 'translateX(-50%)', zIndex: 25, textAlign: 'center' }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="display-text" style={{ fontSize: '2.8rem', color: '#FFF8ED', textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
          Laugh Tale
        </h2>
        <p className="handwritten" style={{ fontSize: '1.2rem', color: 'rgba(255,248,237,0.7)', marginTop: 4 }}>
          the final island
        </p>
      </motion.div>

      {/* Photo — beautiful candid (left) */}
      <motion.div
        className="absolute"
        style={{
          bottom: 280,
          left: '12%',
          zIndex: 25,
          width: 200,
          background: 'white',
          padding: 10,
          paddingBottom: 40,
          boxShadow: '4px 6px 20px rgba(0,0,0,0.15), 0 0 30px rgba(247,178,103,0.1)',
          transform: 'rotate(-6deg)',
        }}
        initial={{ opacity: 0, y: 30, rotate: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
        whileHover={{ scale: 1.08, rotate: -2, zIndex: 40 }}
      >
        <div style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: 2 }}>
          <img
            src={`${import.meta.env.BASE_URL}photos/Snapchat-2083101900.jpg`}
            alt="Beautiful candid moment"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
        <p className="polaroid__caption" style={{ fontSize: '0.85rem', marginTop: 6 }}>the real treasure</p>
        <div
          className="washi-tape washi-tape--gold"
          style={{
            top: -14,
            left: '50%',
            transform: 'translateX(-50%) rotate(-2deg)',
            width: 80,
          }}
        />
      </motion.div>

      {/* Photo — outdoor selfie (right) */}
      <motion.div
        className="absolute"
        style={{
          bottom: 300,
          right: '12%',
          zIndex: 25,
          width: 180,
          background: 'white',
          padding: 10,
          paddingBottom: 40,
          boxShadow: '4px 6px 20px rgba(0,0,0,0.15), 0 0 30px rgba(247,178,103,0.1)',
          transform: 'rotate(5deg)',
        }}
        initial={{ opacity: 0, y: 30, rotate: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
        whileHover={{ scale: 1.08, rotate: 1, zIndex: 40 }}
      >
        <div style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: 2 }}>
          <img
            src={`${import.meta.env.BASE_URL}photos/IMG-20240216-WA0004.jpg`}
            alt="Happy together outdoors"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
        <p className="polaroid__caption" style={{ fontSize: '0.85rem', marginTop: 6 }}>us, always ❤</p>
        <div
          className="washi-tape washi-tape--pink"
          style={{
            top: -14,
            left: '50%',
            transform: 'translateX(-50%) rotate(3deg)',
            width: 80,
          }}
        />
      </motion.div>

      {/* Treasure chest */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          bottom: 300,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={handleChestClick}
        whileHover={!chestOpened ? { scale: 1.1 } : {}}
      >
        <svg width="120" height="100" viewBox="0 0 120 100">
          {/* Chest body */}
          <rect x="10" y="45" width="100" height="50" rx="5" fill="#8B5E3C" stroke="#5C3A1E" strokeWidth="2" />
          <rect x="15" y="50" width="90" height="40" rx="3" fill="#A0724E" />

          {/* Metal bands */}
          <rect x="10" y="55" width="100" height="4" fill="#D4A853" opacity="0.6" />
          <rect x="10" y="75" width="100" height="4" fill="#D4A853" opacity="0.6" />

          {/* Lock */}
          <rect x="52" y="60" width="16" height="20" rx="3" fill="#D4A853" stroke="#B08A3E" strokeWidth="1" />
          <circle cx="60" cy="72" r="3" fill="#5C3A1E" />

          {/* Chest lid */}
          <motion.g
            animate={chestOpened ? { rotateX: -120, y: -20 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: '60px 45px' }}
          >
            <path
              d="M10,45 Q10,20 60,15 Q110,20 110,45 Z"
              fill="#8B5E3C"
              stroke="#5C3A1E"
              strokeWidth="2"
            />
            <path
              d="M15,44 Q15,25 60,20 Q105,25 105,44 Z"
              fill="#A0724E"
            />
            <rect x="50" y="35" width="20" height="10" rx="2" fill="#D4A853" stroke="#B08A3E" strokeWidth="1" />
          </motion.g>

          {/* Golden glow when opened */}
          <AnimatePresence>
            {chestOpened && (
              <motion.ellipse
                cx="60"
                cy="50"
                rx="40"
                ry="20"
                fill="url(#chestGlow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
            )}
          </AnimatePresence>

          <defs>
            <radialGradient id="chestGlow">
              <stop offset="0%" stopColor="#F7B267" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F7B267" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Click hint */}
        {!chestOpened && (
          <motion.p
            className="annotation text-center mt-2"
            style={{ fontSize: '0.85rem', color: 'rgba(255,248,237,0.6)' }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            click to open
          </motion.p>
        )}
      </motion.div>

      {/* Golden particles when chest opens */}
      <AnimatePresence>
        {chestOpened && (
          <>
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  bottom: 340,
                  left: '50%',
                  width: 4 + Math.random() * 4,
                  height: 4 + Math.random() * 4,
                  backgroundColor: '#F7B267',
                  zIndex: 35,
                }}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: (Math.random() - 0.5) * 200,
                  y: -(50 + Math.random() * 150),
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  delay: 0.5 + Math.random() * 0.5,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Slowing-down message */}
      <motion.p
        className="absolute handwritten"
        style={{
          bottom: 180,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '1.3rem',
          color: 'rgba(255,248,237,0.7)',
          zIndex: 25,
          textAlign: 'center',
          maxWidth: 400,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1.5 }}
      >
        Every journey leads to a treasure. This is yours.
      </motion.p>

      <Waves color="#6E7A5A" opacity={0.3} />
    </section>
  );
}

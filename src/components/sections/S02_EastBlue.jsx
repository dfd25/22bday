import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Waves from '../decorative/Waves';

/**
 * Section 2: East Blue (2023) — Friendship
 * Small island with polaroids, notebook doodles, handwritten captions.
 */
export default function S02_EastBlue() {
  const [hoveredPolaroid, setHoveredPolaroid] = useState(null);
  const [secretFound, setSecretFound] = useState(false);

  const polaroids = [
    { id: 1, rotation: -5, caption: 'The day it all started', x: 80, y: 120, bg: '#E8D5B7' },
    { id: 2, rotation: 3, caption: 'Two strangers, one storyline', x: 350, y: 180, bg: '#D4C3A8' },
    { id: 3, rotation: -2, caption: 'Accidentally brilliant', x: 650, y: 100, bg: '#C9B896' },
    { id: 4, rotation: 6, caption: 'Chapter one', x: 950, y: 200, bg: '#DED0B8' },
  ];

  const doodles = [
    { type: 'star', x: 250, y: 80 },
    { type: 'heart', x: 550, y: 320 },
    { type: 'arrow', x: 800, y: 150 },
    { type: 'star', x: 1050, y: 350 },
    { type: 'secret', x: 180, y: 380 },
  ];

  return (
    <section
      id="east-blue"
      className="relative flex-shrink-0 snap-center"
      style={{ width: 1400, minWidth: '100vw', height: '100%' }}
    >
      {/* Island ground */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(180deg,
            #87CEEB 0%,
            #7BB3D4 35%,
            #4E8DB5 55%,
            #3A6E91 100%
          )
        `,
      }} />

      {/* Island landmass */}
      <svg className="absolute bottom-0 w-full" height="350" viewBox="0 0 1400 350" preserveAspectRatio="none">
        <path
          d="M0,350 L0,280 Q100,200 250,220 Q400,180 500,200 Q650,150 800,180 Q950,140 1100,170 Q1250,200 1400,250 L1400,350 Z"
          fill="#EAD9B7"
        />
        <path
          d="M0,350 L0,290 Q100,220 250,240 Q400,200 500,220 Q650,170 800,200 Q950,160 1100,190 Q1250,220 1400,260 L1400,350 Z"
          fill="#D4C39E"
          opacity="0.5"
        />
      </svg>

      {/* Notebook paper overlay on island */}
      <div
        className="absolute paper-texture"
        style={{
          bottom: 0,
          left: '5%',
          right: '5%',
          height: 320,
          background: 'rgba(255,248,237,0.3)',
          borderRadius: '20px 20px 0 0',
        }}
      >
        {/* Notebook lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          {Array.from({ length: 12 }, (_, i) => (
            <line
              key={i}
              x1="0" y1={30 + i * 25}
              x2="100%" y2={30 + i * 25}
              stroke="#4E8DB5"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Section title */}
      <motion.div
        className="absolute"
        style={{ top: 40, left: 60, zIndex: 25 }}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="display-text" style={{ fontSize: '2.2rem', color: '#FFF8ED' }}>
          East Blue
        </h2>
        <p className="handwritten" style={{ fontSize: '1.3rem', color: 'rgba(255,248,237,0.7)', marginTop: 4 }}>
          2023 — where it began
        </p>
      </motion.div>

      {/* Story text */}
      <motion.div
        className="absolute"
        style={{ top: 60, right: 60, maxWidth: 350, zIndex: 25 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <p className="handwritten" style={{ fontSize: '1.2rem', color: '#FFF8ED', lineHeight: 1.7 }}>
          "In early 2023, two future AI engineers accidentally entered the same storyline."
        </p>
      </motion.div>

      {/* Palm trees */}
      <svg className="absolute" style={{ bottom: 200, left: 100, zIndex: 20 }} width="60" height="120" viewBox="0 0 60 120">
        <line x1="30" y1="120" x2="28" y2="50" stroke="#8B7355" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="15" cy="45" rx="20" ry="8" fill="#6B8E23" opacity="0.8" transform="rotate(-30 15 45)" />
        <ellipse cx="45" cy="42" rx="22" ry="7" fill="#6B8E23" opacity="0.7" transform="rotate(25 45 42)" />
        <ellipse cx="28" cy="38" rx="18" ry="7" fill="#7BA832" opacity="0.9" transform="rotate(-10 28 38)" />
      </svg>

      <svg className="absolute" style={{ bottom: 180, right: 200, zIndex: 20 }} width="50" height="100" viewBox="0 0 50 100">
        <line x1="25" y1="100" x2="23" y2="40" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="12" cy="36" rx="16" ry="6" fill="#6B8E23" opacity="0.7" transform="rotate(-25 12 36)" />
        <ellipse cx="38" cy="34" rx="18" ry="6" fill="#6B8E23" opacity="0.8" transform="rotate(20 38 34)" />
      </svg>

      {/* Polaroid photos */}
      {polaroids.map((p, i) => (
        <motion.div
          key={p.id}
          className="polaroid absolute cursor-pointer"
          style={{
            left: p.x,
            bottom: p.y,
            zIndex: 30,
            transform: `rotate(${p.rotation}deg)`,
            width: 160,
          }}
          initial={{ opacity: 0, y: 30, rotate: p.rotation }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          whileHover={{
            scale: 1.08,
            rotate: p.rotation - 2,
            zIndex: 40,
            transition: { duration: 0.3 },
          }}
          onHoverStart={() => setHoveredPolaroid(p.id)}
          onHoverEnd={() => setHoveredPolaroid(null)}
        >
          {/* Photo area */}
          <div
            style={{
              width: '100%',
              aspectRatio: '1',
              backgroundColor: p.bg,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Illustrated placeholder */}
            <svg width="80" height="80" viewBox="0 0 80 80" opacity="0.4">
              <circle cx="40" cy="30" r="12" fill="#8B7355" />
              <path d="M20,70 Q30,45 40,50 Q50,45 60,70 Z" fill="#8B7355" />
              {p.id === 1 && <text x="15" y="75" fontSize="8" fill="#8B7355" fontFamily="var(--font-annotation)">photo here</text>}
            </svg>
          </div>
          {/* Caption */}
          <p className="polaroid__caption" style={{ fontSize: '0.9rem' }}>{p.caption}</p>

          {/* Washi tape */}
          <div
            className={`washi-tape washi-tape--${['pink', 'blue', 'gold', 'pink'][i]}`}
            style={{
              top: -14,
              left: '50%',
              transform: `translateX(-50%) rotate(${-3 + i * 2}deg)`,
              width: 80,
            }}
          />
        </motion.div>
      ))}

      {/* Doodles */}
      {doodles.map((d, i) => (
        <motion.svg
          key={i}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="absolute"
          style={{ left: d.x, bottom: d.y - 50, zIndex: 25, cursor: d.type === 'secret' ? 'pointer' : 'default' }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.15 }}
          onClick={() => d.type === 'secret' && setSecretFound(true)}
          whileHover={d.type === 'secret' ? { scale: 1.5, opacity: 1 } : {}}
        >
          {d.type === 'star' && (
            <path d="M12 2 L14 9 L21 9 L15.5 13.5 L17.5 21 L12 16.5 L6.5 21 L8.5 13.5 L3 9 L10 9 Z" fill="none" stroke="#F7B267" strokeWidth="1.5" />
          )}
          {d.type === 'heart' && (
            <path d="M12 21 C5 15 2 10 5 6 C8 2 12 5 12 8 C12 5 16 2 19 6 C22 10 19 15 12 21Z" fill="none" stroke="#F4978E" strokeWidth="1.5" />
          )}
          {d.type === 'arrow' && (
            <path d="M4 12 L18 12 M14 8 L18 12 L14 16" fill="none" stroke="#5C4033" strokeWidth="1.5" strokeLinecap="round" />
          )}
          {d.type === 'secret' && (
            <path d="M12 2 L14 9 L21 9 L15.5 13.5 L17.5 21 L12 16.5 L6.5 21 L8.5 13.5 L3 9 L10 9 Z" fill="#F7B267" stroke="#D4A853" strokeWidth="1" />
          )}
        </motion.svg>
      ))}

      {/* Secret note popup */}
      <AnimatePresence>
        {secretFound && (
          <motion.div
            className="absolute p-5 rounded-lg"
            style={{
              bottom: 250,
              left: 100,
              zIndex: 50,
              backgroundColor: 'rgba(255,248,237,0.95)',
              border: '2px dashed #D4A853',
              maxWidth: 250,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <p className="handwritten" style={{ fontSize: '1rem', color: '#5C4033' }}>
              🌟 You found a secret! This star marks the exact moment two timelines merged into one. — I.
            </p>
            <button
              className="mt-2 annotation"
              style={{ fontSize: '0.8rem', color: '#8B7355', cursor: 'pointer', border: 'none', background: 'none' }}
              onClick={() => setSecretFound(false)}
            >
              (close)
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Waves at bottom */}
      <Waves color="#3A6E91" opacity={0.5} />
    </section>
  );
}

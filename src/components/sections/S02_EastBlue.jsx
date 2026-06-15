import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Waves from '../decorative/Waves';

/**
 * Section 2: East Blue (2023) — Friendship
 * Small island with polaroids, notebook doodles, handwritten captions.
 */
export default function S02_EastBlue() {
  const [hoveredPolaroid, setHoveredPolaroid] = useState(null);
  const [secretFound, setSecretFound] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const basePath = import.meta.env.BASE_URL;
  const polaroids = [
    { id: 1, rotation: -5, caption: 'The day it all started', bg: '#E8D5B7', photo: `${basePath}photos/IMG-20231229-WA0192.jpg` },
    { id: 2, rotation: 3, caption: 'Two strangers, one storyline', bg: '#D4C3A8', photo: `${basePath}photos/IMG_20240327_184609_617.jpg` },
    { id: 3, rotation: -2, caption: 'Accidentally brilliant', bg: '#C9B896', photo: `${basePath}photos/IMG_20241008_112518.jpg` },
    { id: 4, rotation: 6, caption: 'Chapter one', bg: '#DED0B8', photo: `${basePath}photos/IMG_20240615_161557.jpg` },
  ];

  return (
    <section
      id="east-blue"
      className="relative flex-shrink-0 snap-center"
      style={{
        width: isMobile ? '100vw' : 1400,
        minWidth: '100vw',
        height: isMobile ? 'auto' : '100%',
        minHeight: isMobile ? '100vh' : undefined,
      }}
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
      <svg className="absolute bottom-0 w-full" height={isMobile ? '200' : '350'} viewBox="0 0 1400 350" preserveAspectRatio="none">
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

      {/* Section title */}
      <motion.div
        className="absolute"
        style={{
          top: isMobile ? 20 : 40,
          left: isMobile ? 20 : 60,
          zIndex: 25,
        }}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="display-text" style={{ fontSize: isMobile ? '1.6rem' : '2.2rem', color: '#FFF8ED' }}>
          East Blue
        </h2>
        <p className="handwritten" style={{ fontSize: isMobile ? '1rem' : '1.3rem', color: 'rgba(255,248,237,0.7)', marginTop: 4 }}>
          2023 — where it began
        </p>
      </motion.div>

      {/* Story text */}
      <motion.div
        className="absolute"
        style={{
          top: isMobile ? 80 : 60,
          right: isMobile ? 16 : 60,
          maxWidth: isMobile ? 200 : 350,
          zIndex: 25,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <p className="handwritten" style={{ fontSize: isMobile ? '0.95rem' : '1.2rem', color: '#FFF8ED', lineHeight: 1.7 }}>
          "In early 2023, two future AI engineers accidentally entered the same storyline."
        </p>
      </motion.div>

      {/* Polaroid photos — grid on mobile, scattered on desktop */}
      {isMobile ? (
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            padding: '140px 16px 100px',
            zIndex: 30,
          }}
        >
          {polaroids.map((p, i) => (
            <motion.div
              key={p.id}
              className="polaroid cursor-pointer"
              style={{
                transform: `rotate(${p.rotation}deg)`,
                width: '100%',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  backgroundColor: p.bg,
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <img src={p.photo} alt={p.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
              <p className="polaroid__caption" style={{ fontSize: '0.8rem' }}>{p.caption}</p>
              <div
                className={`washi-tape washi-tape--${['pink', 'blue', 'gold', 'pink'][i]}`}
                style={{ top: -10, left: '50%', transform: `translateX(-50%) rotate(${-3 + i * 2}deg)`, width: 60 }}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <>
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

          {/* Desktop polaroids — absolute positioned */}
          {polaroids.map((p, i) => {
            const desktopPositions = [
              { left: 80, bottom: 120 },
              { left: 350, bottom: 180 },
              { left: 650, bottom: 100 },
              { left: 950, bottom: 200 },
            ];
            const pos = desktopPositions[i];
            return (
              <motion.div
                key={p.id}
                className="polaroid absolute cursor-pointer"
                style={{
                  left: pos.left,
                  bottom: pos.bottom,
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
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    backgroundColor: p.bg,
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <img src={p.photo} alt={p.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
                <p className="polaroid__caption" style={{ fontSize: '0.9rem' }}>{p.caption}</p>
                <div
                  className={`washi-tape washi-tape--${['pink', 'blue', 'gold', 'pink'][i]}`}
                  style={{ top: -14, left: '50%', transform: `translateX(-50%) rotate(${-3 + i * 2}deg)`, width: 80 }}
                />
              </motion.div>
            );
          })}
        </>
      )}

      {/* Secret star — only on desktop */}
      {!isMobile && (
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="absolute"
          style={{ left: 180, bottom: 330, zIndex: 25, cursor: 'pointer' }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          onClick={() => setSecretFound(true)}
          whileHover={{ scale: 1.5, opacity: 1 }}
        >
          <path d="M12 2 L14 9 L21 9 L15.5 13.5 L17.5 21 L12 16.5 L6.5 21 L8.5 13.5 L3 9 L10 9 Z" fill="#F7B267" stroke="#D4A853" strokeWidth="1" />
        </motion.svg>
      )}

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

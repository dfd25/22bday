import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONSTELLATION_DREAMS } from '../../utils/constants';
import Stars from '../decorative/Stars';
import Waves from '../decorative/Waves';

/**
 * Section 6: The AI Engineers — Shared Ambitions
 * Tech-themed island with glowing constellations revealing future goals.
 */
export default function S06_AIEngineers() {
  const [activeConstellation, setActiveConstellation] = useState(null);

  // Constellation star positions
  const constellationPositions = [
    { cx: 200, cy: 80, stars: [[200,80],[230,60],[260,90],[240,120]] },
    { cx: 500, cy: 100, stars: [[500,100],[530,70],[560,110],[520,140],[550,140]] },
    { cx: 800, cy: 70, stars: [[800,70],[840,50],[870,80],[850,120]] },
    { cx: 1050, cy: 90, stars: [[1050,90],[1080,60],[1120,85],[1090,130]] },
  ];

  return (
    <section
      id="ai-engineers"
      className="relative flex-shrink-0 flex items-center justify-center snap-center"
      style={{ width: 1400, minWidth: '100vw', height: '100%' }}
    >
      {/* Night sky background */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(180deg,
            #0F1B2E 0%,
            #1A2940 20%,
            #1F3552 45%,
            #2E5A7A 70%,
            #3A6E91 100%
          )
        `,
      }} />

      <Stars count={40} color="#E8C97A" />

      {/* Small tech island */}
      <svg className="absolute bottom-0 w-full" height="250" viewBox="0 0 1400 250" preserveAspectRatio="none">
        <path
          d="M400,250 L400,200 Q500,140 700,160 Q900,140 1000,200 L1000,250 Z"
          fill="#2E4F55"
        />
        <path
          d="M420,250 L420,210 Q500,160 700,175 Q900,160 980,210 L980,250 Z"
          fill="#3A5E55"
          opacity="0.5"
        />
      </svg>

      {/* Laptop doodle on island */}
      <svg className="absolute" style={{ bottom: 180, left: '48%', zIndex: 15 }} width="50" height="35" viewBox="0 0 50 35">
        <rect x="5" y="2" width="40" height="24" rx="2" fill="#2C3E50" stroke="#5C7080" strokeWidth="1" />
        <rect x="8" y="5" width="34" height="18" rx="1" fill="#1A2940" />
        {/* Code lines */}
        <line x1="12" y1="10" x2="28" y2="10" stroke="#4EDB8B" strokeWidth="1" opacity="0.6" />
        <line x1="12" y1="14" x2="22" y2="14" stroke="#F7B267" strokeWidth="1" opacity="0.6" />
        <line x1="14" y1="18" x2="32" y2="18" stroke="#7BB3D4" strokeWidth="1" opacity="0.6" />
        <path d="M0,28 L5,26 L45,26 L50,28 Q50,33 25,33 Q0,33 0,28 Z" fill="#3C4F60" />
      </svg>

      {/* Robot doodle */}
      <svg className="absolute" style={{ bottom: 185, left: '55%', zIndex: 15 }} width="30" height="40" viewBox="0 0 30 40">
        <rect x="8" y="12" width="14" height="16" rx="3" fill="none" stroke="#7BB3D4" strokeWidth="1.5" />
        <circle cx="13" cy="19" r="2" fill="#F7B267" />
        <circle cx="17" cy="19" r="2" fill="#F7B267" />
        <line x1="15" y1="6" x2="15" y2="12" stroke="#7BB3D4" strokeWidth="1.5" />
        <circle cx="15" cy="5" r="2" fill="#F7B267" />
        <line x1="4" y1="20" x2="8" y2="20" stroke="#7BB3D4" strokeWidth="1.5" />
        <line x1="22" y1="20" x2="26" y2="20" stroke="#7BB3D4" strokeWidth="1.5" />
        <line x1="12" y1="28" x2="10" y2="36" stroke="#7BB3D4" strokeWidth="1.5" />
        <line x1="18" y1="28" x2="20" y2="36" stroke="#7BB3D4" strokeWidth="1.5" />
      </svg>

      {/* Constellation map */}
      <svg
        className="absolute"
        style={{ top: '8%', left: '5%', width: '90%', height: '55%', zIndex: 20 }}
        viewBox="0 0 1260 250"
      >
        {constellationPositions.map((constellation, idx) => {
          const dream = CONSTELLATION_DREAMS[idx];
          const isActive = activeConstellation === dream.id;

          return (
            <g key={dream.id}>
              {/* Connection lines */}
              {constellation.stars.slice(0, -1).map((star, j) => (
                <motion.line
                  key={j}
                  x1={star[0]}
                  y1={star[1]}
                  x2={constellation.stars[j + 1][0]}
                  y2={constellation.stars[j + 1][1]}
                  stroke={isActive ? '#F7B267' : 'rgba(232,201,122,0.2)'}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  strokeDasharray="4,3"
                  transition={{ duration: 0.3 }}
                />
              ))}

              {/* Stars */}
              {constellation.stars.map((star, j) => (
                <motion.circle
                  key={j}
                  cx={star[0]}
                  cy={star[1]}
                  r={isActive ? 5 : 3}
                  fill={isActive ? '#F7B267' : '#E8C97A'}
                  className="cursor-pointer"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: isActive ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: j * 0.3 }}
                  onClick={() => setActiveConstellation(isActive ? null : dream.id)}
                  whileHover={{ scale: 1.5 }}
                  style={{ filter: isActive ? 'drop-shadow(0 0 6px rgba(247,178,103,0.8))' : 'none' }}
                />
              ))}

              {/* Constellation label */}
              <text
                x={constellation.cx}
                y={constellation.cy + 55}
                textAnchor="middle"
                fill={isActive ? '#F7B267' : 'rgba(232,201,122,0.4)'}
                fontSize="11"
                fontFamily="var(--font-annotation)"
                className="cursor-pointer"
                onClick={() => setActiveConstellation(isActive ? null : dream.id)}
              >
                {dream.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Active constellation description */}
      <AnimatePresence>
        {activeConstellation && (
          <motion.div
            className="absolute p-5"
            style={{
              top: '55%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 30,
              background: 'rgba(15,27,46,0.9)',
              border: '1px solid rgba(232,201,122,0.3)',
              borderRadius: 12,
              maxWidth: 350,
              backdropFilter: 'blur(10px)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <p className="handwritten" style={{ color: '#E8C97A', fontSize: '1.1rem', textAlign: 'center' }}>
              {CONSTELLATION_DREAMS.find(d => d.id === activeConstellation)?.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote */}
      <motion.p
        className="absolute handwritten text-center"
        style={{
          bottom: 270,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '1.4rem',
          color: 'rgba(232,201,122,0.7)',
          maxWidth: 450,
          zIndex: 25,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        "Some couples collect souvenirs. We collected dreams."
      </motion.p>

      <Waves color="#1A2940" opacity={0.4} />
    </section>
  );
}

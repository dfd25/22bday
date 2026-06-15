import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOTTLE_MEMORIES } from '../../utils/constants';
import Waves from '../decorative/Waves';

/**
 * Section 3: The First Treasure — Growing Closer
 * Treasure map aesthetics, golden light, floating message bottles.
 */
export default function S03_FirstTreasure() {
  const [openBottle, setOpenBottle] = useState(null);

  return (
    <section
      id="first-treasure"
      className="relative flex-shrink-0 flex items-center justify-center snap-center"
      style={{ width: 1400, minWidth: '100vw', height: '100%' }}
    >
      {/* Ocean background with golden light */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(180deg,
            #6B9CC4 0%,
            #4E8DB5 30%,
            #3A7BA5 60%,
            #2E5A7A 100%
          )
        `,
      }} />

      {/* Golden light overlay */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(247,178,103,0.25) 0%, transparent 60%)',
      }} />

      {/* Parchment map overlay in center */}
      <div
        className="absolute paper-texture"
        style={{
          top: '10%',
          left: '10%',
          right: '10%',
          bottom: '25%',
          background: 'rgba(244,228,193,0.15)',
          borderRadius: 20,
          border: '1px solid rgba(212,168,83,0.2)',
        }}
      >
        {/* Map compass lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          {[0, 30, 60, 90, 120, 150].map((angle) => (
            <line
              key={angle}
              x1="50%"
              y1="50%"
              x2={`${50 + 50 * Math.cos((angle * Math.PI) / 180)}%`}
              y2={`${50 + 50 * Math.sin((angle * Math.PI) / 180)}%`}
              stroke="#D4A853"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Section title */}
      <motion.div
        className="absolute"
        style={{ top: 50, left: 80, zIndex: 25 }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="display-text" style={{ fontSize: '2rem', color: '#F7B267' }}>
          The First Treasure
        </h2>
        <p className="handwritten" style={{ fontSize: '1.2rem', color: 'rgba(255,248,237,0.7)', marginTop: 4 }}>
          growing closer
        </p>
      </motion.div>

      {/* Dotted trail path connecting bottles */}
      <svg
        className="absolute"
        style={{ top: '20%', left: '5%', width: '90%', height: '50%', zIndex: 15 }}
        viewBox="0 0 1200 400"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M50,200 C200,100 350,300 500,200 C650,100 800,280 1000,180"
          stroke="rgba(212,168,83,0.3)"
          strokeWidth="2"
          strokeDasharray="8,6"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        {/* X marks the spots */}
        {[{ x: 150, y: 170 }, { x: 500, y: 200 }, { x: 870, y: 190 }].map((pos, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 + i * 0.3 }}
          >
            <line x1={pos.x - 8} y1={pos.y - 8} x2={pos.x + 8} y2={pos.y + 8} stroke="#D4A853" strokeWidth="2" />
            <line x1={pos.x + 8} y1={pos.y - 8} x2={pos.x - 8} y2={pos.y + 8} stroke="#D4A853" strokeWidth="2" />
          </motion.g>
        ))}
      </svg>

      {/* Message Bottles */}
      {BOTTLE_MEMORIES.map((bottle, i) => {
        const positions = [
          { left: '12%', top: '35%' },
          { left: '42%', top: '30%' },
          { left: '72%', top: '38%' },
        ];

        return (
          <motion.div
            key={bottle.id}
            className="memory-bottle absolute cursor-pointer"
            style={{ ...positions[i], '--mobile-index': i, zIndex: 30 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.3 }}
          >
            <motion.div
              className="bottle-glow"
              animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
              onClick={() => setOpenBottle(openBottle === bottle.id ? null : bottle.id)}
            >
              <svg width="50" height="80" viewBox="0 0 50 80">
                {/* Bottle body */}
                <path
                  d="M15,25 L15,65 Q15,75 25,75 Q35,75 35,65 L35,25 Q35,20 30,18 L30,10 Q30,5 25,5 Q20,5 20,10 L20,18 Q15,20 15,25 Z"
                  fill="rgba(78,141,181,0.3)"
                  stroke="#7BB3D4"
                  strokeWidth="1.5"
                />
                {/* Cork */}
                <rect x="20" y="4" width="10" height="6" rx="2" fill="#C4A67D" stroke="#A08B6D" strokeWidth="0.5" />
                {/* Message inside */}
                <rect x="20" y="35" width="10" height="18" rx="1" fill="#F4E4C1" opacity="0.7" transform="rotate(10, 25, 44)" />
                {/* Shine */}
                <path d="M18,30 Q20,28 18,40" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
              </svg>
            </motion.div>

            {/* Opened message */}
            <AnimatePresence>
              {openBottle === bottle.id && (
                <motion.div
                  className="absolute left-16 top-0 p-5"
                  style={{
                    width: 280,
                    background: 'linear-gradient(135deg, #F4E4C1 0%, #FFF8ED 100%)',
                    borderRadius: 8,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    zIndex: 50,
                    border: '1px solid rgba(212,168,83,0.3)',
                  }}
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <div className="absolute -left-2 top-4 w-4 h-4 rotate-45"
                    style={{ backgroundColor: '#F4E4C1' }}
                  />
                  <p className="handwritten relative" style={{ fontSize: '1.05rem', color: '#5C4033', lineHeight: 1.7 }}>
                    {bottle.text}
                  </p>
                  <button
                    className="mt-3 annotation"
                    style={{ fontSize: '0.75rem', color: '#8B7355', border: 'none', background: 'none', cursor: 'pointer' }}
                    onClick={(e) => { e.stopPropagation(); setOpenBottle(null); }}
                  >
                    × close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Story text at bottom */}
      <motion.p
        className="absolute handwritten text-center"
        style={{
          bottom: 160,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '1.15rem',
          color: 'rgba(255,248,237,0.7)',
          maxWidth: 400,
          zIndex: 25,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        Click the bottles to read memories lost at sea...
      </motion.p>

      <Waves color="#2E5A7A" opacity={0.5} />
    </section>
  );
}

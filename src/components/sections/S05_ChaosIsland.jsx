import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAOS_MEMORIES } from '../../utils/constants';
import Waves from '../decorative/Waves';

/**
 * Section 5: Chaos Island — Funny Memories
 * Chaotic collage of sticky notes, speech bubbles, doodles.
 */
export default function S05_ChaosIsland() {
  const [revealedMemories, setRevealedMemories] = useState(new Set());

  const toggleMemory = (id) => {
    setRevealedMemories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Scattered positions for memories
  const positions = [
    { left: '5%', top: '12%', rotate: -4 },
    { left: '38%', top: '35%', rotate: 3 },
    { left: '10%', top: '50%', rotate: -2 },
  ];

  return (
    <section
      id="chaos-island"
      className="relative flex-shrink-0 flex items-center justify-center snap-center"
      style={{ width: 1400, minWidth: '100vw', height: '100%' }}
    >
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(180deg,
            #87CEEB 0%,
            #7BB3D4 40%,
            #4E8DB5 70%,
            #3A6E91 100%
          )
        `,
      }} />

      {/* Messy island */}
      <svg className="absolute bottom-0 w-full" height="300" viewBox="0 0 1400 300" preserveAspectRatio="none">
        <path
          d="M0,300 L0,250 Q200,180 350,200 Q500,150 650,190 Q800,140 950,180 Q1100,150 1250,200 Q1350,220 1400,210 L1400,300 Z"
          fill="#EAD9B7"
        />
      </svg>

      {/* Cork board / bulletin board backdrop */}
      <div
        className="absolute paper-texture"
        style={{
          top: '5%',
          left: '3%',
          right: '3%',
          bottom: '20%',
          background: 'rgba(210,180,140,0.15)',
          borderRadius: 16,
          border: '2px solid rgba(139,115,85,0.15)',
        }}
      />

      {/* Pinned photo — restaurant cheers */}
      <motion.div
        className="polaroid absolute"
        style={{
          bottom: '25%',
          right: '8%',
          zIndex: 35,
          transform: 'rotate(4deg)',
          width: 170,
        }}
        initial={{ opacity: 0, scale: 0.8, rotate: 4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.08, rotate: 0, zIndex: 50 }}
      >
        <div style={{
          width: '100%',
          aspectRatio: '4/3',
          overflow: 'hidden',
          borderRadius: 2,
        }}>
          <img
            src={`${import.meta.env.BASE_URL}photos/IMG-20231229-WA0192.jpg`}
            alt="Cheers at the restaurant"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
        <p className="polaroid__caption" style={{ fontSize: '0.8rem' }}>exhibit A: the chaos 🍹</p>
        <div
          className="washi-tape washi-tape--gold"
          style={{
            top: -14,
            left: '50%',
            transform: 'translateX(-50%) rotate(3deg)',
            width: 70,
          }}
        />
      </motion.div>

      {/* Section title — playful */}
      <motion.div
        className="absolute"
        style={{ top: 30, left: '50%', transform: 'translateX(-50%)', zIndex: 25, textAlign: 'center' }}
        initial={{ opacity: 0, rotate: -3, y: -20 }}
        whileInView={{ opacity: 1, rotate: 0, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="handwritten" style={{ fontSize: '2.5rem', color: '#FFF8ED' }}>
          Chaos Island 🌀
        </h2>
        <p className="annotation" style={{ fontSize: '1rem', color: 'rgba(255,248,237,0.6)' }}>
          click the notes to uncover the chaos
        </p>
      </motion.div>

      {/* Memory cards — sticky notes and speech bubbles */}
      {CHAOS_MEMORIES.map((memory, i) => {
        const pos = positions[i];
        const isRevealed = revealedMemories.has(memory.id);

        return (
          <motion.div
            key={memory.id}
            className="chaos-memory absolute cursor-pointer"
            style={{
              ...pos,
              '--mobile-index': i,
              zIndex: isRevealed ? 40 : 30,
              width: memory.type === 'sticky' ? 220 : 250,
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: pos.rotate }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 45 }}
            onClick={() => toggleMemory(memory.id)}
          >
            {memory.type === 'sticky' ? (
              <div className="sticky-note" style={{ transform: `rotate(${pos.rotate}deg)` }}>
                <p style={{ fontWeight: 600, marginBottom: 6, fontSize: '1rem' }}>
                  {memory.title}
                </p>
                <AnimatePresence>
                  {isRevealed ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ fontSize: '0.9rem' }}
                    >
                      {memory.text}
                    </motion.p>
                  ) : (
                    <motion.p style={{ fontSize: '0.8rem', opacity: 0.5, fontStyle: 'italic' }}>
                      tap to read...
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="speech-bubble" style={{ transform: `rotate(${pos.rotate}deg)` }}>
                <p style={{
                  fontWeight: 600,
                  marginBottom: 6,
                  fontFamily: 'var(--font-annotation)',
                  fontSize: '1rem',
                }}>
                  {memory.title}
                </p>
                <AnimatePresence>
                  {isRevealed ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ fontSize: '0.9rem', fontFamily: 'var(--font-annotation)' }}
                    >
                      {memory.text}
                    </motion.p>
                  ) : (
                    <motion.p style={{ fontSize: '0.8rem', opacity: 0.5, fontStyle: 'italic', fontFamily: 'var(--font-annotation)' }}>
                      tap to read...
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Scattered doodles */}
      {[
        { x: '30%', y: '75%', type: 'exclaim' },
        { x: '80%', y: '30%', type: 'zigzag' },
        { x: '10%', y: '35%', type: 'swirl' },
        { x: '90%', y: '65%', type: 'star' },
      ].map((d, i) => (
        <motion.svg
          key={i}
          width="30"
          height="30"
          viewBox="0 0 30 30"
          className="absolute pointer-events-none"
          style={{ left: d.x, top: d.y, zIndex: 20 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
        >
          {d.type === 'exclaim' && (
            <>
              <text x="8" y="22" fontSize="24" fill="#F7B267" fontFamily="var(--font-annotation)" fontWeight="bold">!</text>
              <text x="16" y="22" fontSize="24" fill="#F4978E" fontFamily="var(--font-annotation)" fontWeight="bold">?</text>
            </>
          )}
          {d.type === 'zigzag' && (
            <path d="M5,25 L10,5 L15,25 L20,5 L25,25" fill="none" stroke="#F7B267" strokeWidth="2" strokeLinecap="round" />
          )}
          {d.type === 'swirl' && (
            <path d="M15,25 Q5,15 15,10 Q25,5 20,15 Q15,25 15,15" fill="none" stroke="#F4978E" strokeWidth="1.5" />
          )}
          {d.type === 'star' && (
            <path d="M15 3 L17 12 L26 12 L19 17 L21 26 L15 21 L9 26 L11 17 L4 12 L13 12 Z" fill="#F7B267" opacity="0.5" />
          )}
        </motion.svg>
      ))}

      <Waves color="#3A6E91" opacity={0.5} />
    </section>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HIDDEN_OBJECTS } from '../../utils/constants';
import Waves from '../decorative/Waves';

/**
 * Section 7: The Pokémon Forest — Things Akshat Loves
 * Magical forest with hidden objects to find.
 */
export default function S07_PokemonForest() {
  const [foundObjects, setFoundObjects] = useState(new Set());
  const [activeNote, setActiveNote] = useState(null);

  const findObject = (id) => {
    setFoundObjects(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setActiveNote(id);
  };

  // Hidden object positions in the forest
  const objectPositions = [
    { id: 1, x: '15%', y: '45%', icon: 'lightning' },
    { id: 2, x: '40%', y: '60%', icon: 'candy' },
    { id: 3, x: '70%', y: '35%', icon: 'ball' },
    { id: 4, x: '55%', y: '55%', icon: 'fox' },
    { id: 5, x: '85%', y: '50%', icon: 'star' },
  ];

  return (
    <section
      id="pokemon-forest"
      className="relative flex-shrink-0 flex items-center justify-center snap-center"
      style={{ width: 1400, minWidth: '100vw', height: '100%' }}
    >
      {/* Forest background */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(180deg,
            #1A3A2A 0%,
            #2D5A3A 20%,
            #3A7A4A 40%,
            #2D6E3D 60%,
            #1F5530 80%,
            #2E5A7A 100%
          )
        `,
      }} />

      {/* Mystical fog */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '30%',
          left: '-10%',
          width: '120%',
          height: '40%',
          background: 'linear-gradient(90deg, transparent, rgba(200,230,200,0.08), transparent)',
          zIndex: 5,
        }}
        animate={{ x: ['-5%', '5%', '-5%'], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Forest trees - multiple layers */}
      {/* Back layer */}
      <svg className="absolute bottom-0 w-full" height="500" viewBox="0 0 1400 500" preserveAspectRatio="none" style={{ zIndex: 3 }}>
        {[100, 250, 400, 550, 700, 850, 1000, 1150, 1300].map((x, i) => (
          <g key={i} opacity="0.4">
            <polygon points={`${x},120 ${x-40},320 ${x+40},320`} fill="#1A4A2A" />
            <polygon points={`${x},80 ${x-30},220 ${x+30},220`} fill="#1A4A2A" />
          </g>
        ))}
      </svg>

      {/* Middle layer trees */}
      <svg className="absolute bottom-0 w-full" height="500" viewBox="0 0 1400 500" preserveAspectRatio="none" style={{ zIndex: 8 }}>
        {[50, 200, 380, 520, 680, 830, 980, 1130, 1280].map((x, i) => (
          <g key={i} opacity="0.6">
            <rect x={x-4} y="250" width="8" height="100" fill="#4A3020" rx="2" />
            <polygon points={`${x},100 ${x-50},280 ${x+50},280`} fill="#2D6E3D" />
            <polygon points={`${x},60 ${x-35},200 ${x+35},200`} fill="#3A8A4A" />
            <polygon points={`${x},30 ${x-22},140 ${x+22},140`} fill="#4AA05A" />
          </g>
        ))}
      </svg>

      {/* Ground */}
      <svg className="absolute bottom-0 w-full" height="150" viewBox="0 0 1400 150" preserveAspectRatio="none" style={{ zIndex: 10 }}>
        <path
          d="M0,150 L0,80 Q200,50 400,70 Q600,40 800,65 Q1000,45 1200,60 L1400,70 L1400,150 Z"
          fill="#1A4A2A"
        />
        <path
          d="M0,150 L0,100 Q200,80 400,90 Q600,70 800,85 Q1000,75 1200,85 L1400,90 L1400,150 Z"
          fill="#154020"
        />
      </svg>

      {/* Section title */}
      <motion.div
        className="absolute"
        style={{ top: 30, left: '50%', transform: 'translateX(-50%)', zIndex: 25, textAlign: 'center' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="display-text" style={{ fontSize: '2rem', color: '#A8E6A3' }}>
          The Pokémon Forest
        </h2>
        <p className="annotation" style={{ fontSize: '0.9rem', color: 'rgba(168,230,163,0.6)', marginTop: 4 }}>
          find {foundObjects.size} / {HIDDEN_OBJECTS.length} hidden treasures
        </p>
      </motion.div>

      {/* Journal border */}
      <div
        className="absolute"
        style={{
          top: 80,
          left: '8%',
          right: '8%',
          bottom: '25%',
          border: '2px solid rgba(168,230,163,0.1)',
          borderRadius: 8,
          zIndex: 12,
        }}
      />

      {/* Hidden objects */}
      {objectPositions.map((obj) => {
        const isFound = foundObjects.has(obj.id);
        const hidden = HIDDEN_OBJECTS.find(h => h.id === obj.id);

        return (
          <motion.div
            key={obj.id}
            className="absolute cursor-pointer"
            style={{
              left: obj.x,
              top: obj.y,
              zIndex: 20,
            }}
            whileHover={{ scale: 1.3 }}
            onClick={() => findObject(obj.id)}
          >
            <motion.svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              animate={isFound ? {} : { opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                filter: isFound ? 'drop-shadow(0 0 8px rgba(168,230,163,0.6))' : 'none',
                opacity: isFound ? 1 : undefined,
              }}
            >
              {obj.icon === 'lightning' && (
                <path d="M20 4 L10 18 L16 18 L14 32 L26 16 L20 16 Z" fill={isFound ? '#F7B267' : '#5A8A5A'} />
              )}
              {obj.icon === 'candy' && (
                <>
                  <rect x="10" y="12" width="16" height="12" rx="6" fill={isFound ? '#7BB3D4' : '#4A7A4A'} />
                  <path d="M8,18 Q4,14 6,10" fill="none" stroke={isFound ? '#F4978E' : '#4A7A4A'} strokeWidth="2" />
                  <path d="M28,18 Q32,14 30,10" fill="none" stroke={isFound ? '#F4978E' : '#4A7A4A'} strokeWidth="2" />
                </>
              )}
              {obj.icon === 'ball' && (
                <>
                  <circle cx="18" cy="18" r="12" fill={isFound ? '#F4978E' : '#5A7A5A'} />
                  <line x1="6" y1="18" x2="30" y2="18" stroke={isFound ? '#2C1810' : '#3A5A3A'} strokeWidth="2" />
                  <circle cx="18" cy="18" r="4" fill={isFound ? 'white' : '#4A6A4A'} stroke={isFound ? '#2C1810' : '#3A5A3A'} strokeWidth="1.5" />
                </>
              )}
              {obj.icon === 'fox' && (
                <>
                  <ellipse cx="18" cy="22" rx="10" ry="8" fill={isFound ? '#C9956B' : '#5A7A5A'} />
                  <polygon points="10,16 8,6 16,14" fill={isFound ? '#C9956B' : '#5A7A5A'} />
                  <polygon points="26,16 28,6 20,14" fill={isFound ? '#C9956B' : '#5A7A5A'} />
                  <circle cx="14" cy="20" r="2" fill={isFound ? '#2C1810' : '#3A5A3A'} />
                  <circle cx="22" cy="20" r="2" fill={isFound ? '#2C1810' : '#3A5A3A'} />
                </>
              )}
              {obj.icon === 'star' && (
                <path d="M18 4 L21 14 L32 14 L23 20 L26 30 L18 24 L10 30 L13 20 L4 14 L15 14 Z" fill={isFound ? '#E8C97A' : '#5A8A5A'} />
              )}
            </motion.svg>
          </motion.div>
        );
      })}

      {/* Note popup */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            className="absolute p-5"
            style={{
              bottom: '30%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 50,
              background: 'rgba(26,58,42,0.95)',
              border: '1px solid rgba(168,230,163,0.3)',
              borderRadius: 12,
              maxWidth: 350,
              backdropFilter: 'blur(10px)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <p className="handwritten" style={{ color: '#A8E6A3', fontSize: '1.1rem', textAlign: 'center' }}>
              {HIDDEN_OBJECTS.find(h => h.id === activeNote)?.note}
            </p>
            <button
              className="mt-3 annotation block mx-auto"
              style={{ fontSize: '0.75rem', color: 'rgba(168,230,163,0.5)', border: 'none', background: 'none', cursor: 'pointer' }}
              onClick={() => setActiveNote(null)}
            >
              × close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fireflies */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${20 + Math.random() * 60}%`,
            width: 4,
            height: 4,
            backgroundColor: '#C8E6A0',
            zIndex: 15,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <Waves color="#1A3A2A" opacity={0.3} />
    </section>
  );
}

import { motion } from 'framer-motion';

function Seagull({ delay = 0, startX = 0, startY = 50 }) {
  return (
    <motion.svg
      width="32"
      height="16"
      viewBox="0 0 32 16"
      fill="none"
      className="absolute"
      style={{ left: startX, top: startY }}
      animate={{
        x: [0, 120, 240, 360],
        y: [0, -25, -10, -30],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      {/* Static seagull shape — avoid Framer Motion path morphing which causes undefined d errors */}
      <motion.g
        animate={{
          scaleY: [1, 0.7, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
        style={{ transformOrigin: '16px 8px' }}
      >
        <path
          d="M0 8 Q8 0 16 6 Q24 0 32 8"
          stroke="#5C4033"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>
    </motion.svg>
  );
}

export default function Seagulls({ count = 4 }) {
  const birds = Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: i * 2.5,
    startX: 100 + i * 200,
    startY: 30 + Math.random() * 60,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
      {birds.map((bird) => (
        <Seagull key={bird.id} {...bird} />
      ))}
    </div>
  );
}

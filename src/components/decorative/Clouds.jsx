import { motion } from 'framer-motion';

export default function Clouds({ count = 8, baseY = 20 }) {
  const clouds = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: baseY + Math.random() * 30,
    scale: 0.5 + Math.random() * 0.8,
    speed: 40 + Math.random() * 60,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}px`,
            transform: `scale(${cloud.scale})`,
            opacity: cloud.opacity,
          }}
          animate={{
            x: [0, 80, 0],
          }}
          transition={{
            duration: cloud.speed,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width="200" height="80" viewBox="0 0 200 80" fill="none">
            <ellipse cx="70" cy="50" rx="60" ry="25" fill="white" opacity="0.8" />
            <ellipse cx="110" cy="45" rx="45" ry="20" fill="white" opacity="0.7" />
            <ellipse cx="50" cy="55" rx="35" ry="18" fill="white" opacity="0.6" />
            <ellipse cx="90" cy="35" rx="30" ry="22" fill="white" opacity="0.9" />
            <ellipse cx="130" cy="50" rx="30" ry="16" fill="white" opacity="0.5" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

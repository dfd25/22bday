import { motion } from 'framer-motion';

export default function Stars({ count = 50, color = '#F7B267' }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 40,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: color,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Larger decorative stars */}
      {stars.slice(0, 8).map((star) => (
        <motion.svg
          key={`star-${star.id}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="absolute"
          style={{
            left: `${(star.x + 10) % 100}%`,
            top: `${star.y + 5}%`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: star.duration * 3,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        >
          <path
            d="M8 0 L9.5 6 L16 8 L9.5 10 L8 16 L6.5 10 L0 8 L6.5 6 Z"
            fill={color}
            opacity="0.6"
          />
        </motion.svg>
      ))}
    </div>
  );
}

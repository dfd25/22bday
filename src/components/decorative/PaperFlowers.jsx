import { motion } from 'framer-motion';

export default function PaperFlowers({ count = 6 }) {
  const flowers = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 10 + (i / count) * 80,
    y: 50 + Math.random() * 30,
    size: 24 + Math.random() * 20,
    delay: i * 0.3,
    rotation: Math.random() * 360,
    color: ['#F4978E', '#F7B267', '#F4978E', '#E8C97A', '#7BB3D4', '#F4978E'][i % 6],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 15 }}>
      {flowers.map((flower) => (
        <motion.svg
          key={flower.id}
          width={flower.size}
          height={flower.size}
          viewBox="0 0 40 40"
          className="absolute"
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
          }}
          initial={{ scale: 0, rotate: flower.rotation, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 1.2, delay: flower.delay, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {/* Petals */}
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx="20"
              cy="10"
              rx="6"
              ry="10"
              fill={flower.color}
              opacity="0.7"
              transform={`rotate(${angle} 20 20)`}
            />
          ))}
          {/* Center */}
          <circle cx="20" cy="20" r="5" fill="#F7B267" opacity="0.9" />
        </motion.svg>
      ))}
    </div>
  );
}

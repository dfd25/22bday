import { motion } from 'framer-motion';

export default function Waves({ color = '#4E8DB5', opacity = 0.4, y = 'auto' }) {
  return (
    <div
      className="absolute left-0 right-0 pointer-events-none overflow-hidden"
      style={{
        bottom: y === 'auto' ? 0 : undefined,
        top: y !== 'auto' ? y : undefined,
        height: 120,
        zIndex: 4,
      }}
    >
      {/* Wave layer 1 — slowest */}
      <motion.svg
        className="absolute bottom-0 w-full"
        style={{ minWidth: '200%' }}
        height="100"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        animate={{ x: [0, -720] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <path
          d="M0,60 C120,30 240,80 360,50 C480,20 600,70 720,40 C840,10 960,60 1080,35 C1200,10 1320,55 1440,30 L1440,100 L0,100 Z"
          fill={color}
          opacity={opacity * 0.6}
        />
        <path
          d="M0,60 C120,30 240,80 360,50 C480,20 600,70 720,40 C840,10 960,60 1080,35 C1200,10 1320,55 1440,30 L1440,100 L0,100 Z"
          fill={color}
          opacity={opacity * 0.6}
          transform="translate(720, 0)"
        />
      </motion.svg>

      {/* Wave layer 2 — medium */}
      <motion.svg
        className="absolute bottom-0 w-full"
        style={{ minWidth: '200%' }}
        height="80"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        animate={{ x: [0, -720] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        <path
          d="M0,40 C180,65 360,15 540,45 C720,75 900,25 1080,50 C1260,75 1350,30 1440,45 L1440,80 L0,80 Z"
          fill={color}
          opacity={opacity * 0.8}
        />
        <path
          d="M0,40 C180,65 360,15 540,45 C720,75 900,25 1080,50 C1260,75 1350,30 1440,45 L1440,80 L0,80 Z"
          fill={color}
          opacity={opacity * 0.8}
          transform="translate(720, 0)"
        />
      </motion.svg>

      {/* Wave layer 3 — fastest, foreground */}
      <motion.svg
        className="absolute bottom-0 w-full"
        style={{ minWidth: '200%' }}
        height="50"
        viewBox="0 0 1440 50"
        preserveAspectRatio="none"
        animate={{ x: [0, -720] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <path
          d="M0,25 C240,45 480,10 720,30 C960,50 1200,15 1440,35 L1440,50 L0,50 Z"
          fill={color}
          opacity={opacity}
        />
        <path
          d="M0,25 C240,45 480,10 720,30 C960,50 1200,15 1440,35 L1440,50 L0,50 Z"
          fill={color}
          opacity={opacity}
          transform="translate(720, 0)"
        />
      </motion.svg>
    </div>
  );
}

import { motion } from 'framer-motion';

export default function ScrollProgress({ progress }) {
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3"
      style={{ zIndex: 'var(--z-ui)' }}
    >
      {/* Map path indicator */}
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          width: 200,
          height: 6,
          backgroundColor: 'rgba(212, 168, 83, 0.2)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #D4A853, #F7B267, #F4978E)',
            width: `${progress * 100}%`,
          }}
          transition={{ type: 'tween', duration: 0.1 }}
        />
        {/* Ship dot on the progress bar */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2"
          style={{
            left: `${progress * 100}%`,
            marginLeft: -6,
            backgroundColor: '#FFF8ED',
            borderColor: '#D4A853',
            boxShadow: '0 0 6px rgba(212, 168, 83, 0.5)',
          }}
        />
      </div>

      {/* Percentage */}
      <span
        className="text-xs font-medium"
        style={{
          fontFamily: 'var(--font-annotation)',
          color: 'rgba(212, 168, 83, 0.8)',
          minWidth: 32,
        }}
      >
        {Math.round(progress * 100)}%
      </span>
    </div>
  );
}

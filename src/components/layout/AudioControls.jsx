import { motion } from 'framer-motion';

export default function AudioControls({ oceanEnabled, musicEnabled, toggleOcean, toggleMusic }) {
  return (
    <motion.div
      className="audio-controls fixed top-5 right-5 flex flex-col gap-3"
      style={{ zIndex: 'var(--z-ui)' }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {/* Ocean sounds toggle */}
      <button
        onClick={toggleOcean}
        className="group relative flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: oceanEnabled ? 'rgba(78, 141, 181, 0.2)' : 'rgba(244, 228, 193, 0.8)',
          borderColor: oceanEnabled ? '#4E8DB5' : '#D4C39E',
          backdropFilter: 'blur(8px)',
        }}
        title={oceanEnabled ? 'Mute ocean sounds' : 'Play ocean sounds'}
        aria-label={oceanEnabled ? 'Mute ocean sounds' : 'Play ocean sounds'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 15 Q6 12 9 14 Q12 16 15 13 Q18 10 21 12"
            stroke={oceanEnabled ? '#4E8DB5' : '#8B7355'}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M3 19 Q6 16 9 18 Q12 20 15 17 Q18 14 21 16"
            stroke={oceanEnabled ? '#4E8DB5' : '#8B7355'}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
        </svg>
        {!oceanEnabled && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ fontSize: '10px', color: '#8B7355' }}
          >
            <div className="absolute w-6 h-0.5 bg-current rotate-45 rounded" />
          </div>
        )}
      </button>

      {/* Music toggle */}
      <button
        onClick={toggleMusic}
        className="group relative flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: musicEnabled ? 'rgba(247, 178, 103, 0.2)' : 'rgba(244, 228, 193, 0.8)',
          borderColor: musicEnabled ? '#F7B267' : '#D4C39E',
          backdropFilter: 'blur(8px)',
        }}
        title={musicEnabled ? 'Mute music' : 'Play music'}
        aria-label={musicEnabled ? 'Mute music' : 'Play music'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18V5l12-2v13"
            stroke={musicEnabled ? '#F7B267' : '#8B7355'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="6" cy="18" r="3" fill={musicEnabled ? '#F7B267' : '#8B7355'} opacity="0.7" />
          <circle cx="18" cy="16" r="3" fill={musicEnabled ? '#F7B267' : '#8B7355'} opacity="0.7" />
        </svg>
        {!musicEnabled && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-6 h-0.5 rotate-45 rounded" style={{ backgroundColor: '#8B7355' }} />
          </div>
        )}
      </button>
    </motion.div>
  );
}

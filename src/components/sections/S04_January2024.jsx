import { motion } from 'framer-motion';
import PaperFlowers from '../decorative/PaperFlowers';
import Waves from '../decorative/Waves';

/**
 * Section 4: January 2024 — Relationship Begins
 * Heart-shaped harbor, paper flowers, warm sunset, cinematic emphasis.
 * This is the emotional peak of the first half.
 */
export default function S04_January2024() {
  return (
    <section
      id="january-2024"
      className="relative flex-shrink-0 flex items-center justify-center snap-center"
      style={{ width: 1600, minWidth: '100vw', height: '100%' }}
    >
      {/* Warm sunset gradient */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(180deg,
            #F7B267 0%,
            #F4978E 20%,
            #E88A7D 35%,
            #C97B6B 50%,
            #8B6FA0 65%,
            #4E6E91 80%,
            #2E5A7A 100%
          )
        `,
      }} />

      {/* Warm golden light */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(247,178,103,0.4) 0%, transparent 50%)',
      }} />

      {/* Heart-shaped harbor SVG */}
      <svg
        className="absolute"
        style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
        width="900"
        height="350"
        viewBox="0 0 900 350"
      >
        {/* Heart-shaped land mass */}
        <motion.path
          d="M450,320 C350,280 150,200 200,120 C230,70 300,60 350,100 C380,130 420,170 450,200 C480,170 520,130 550,100 C600,60 670,70 700,120 C750,200 550,280 450,320 Z"
          fill="#EAD9B7"
          stroke="#D4C39E"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        {/* Inner harbor water */}
        <path
          d="M450,280 C380,250 280,200 310,150 C330,120 380,130 410,160 C430,180 440,200 450,210 C460,200 470,180 490,160 C520,130 570,120 590,150 C620,200 520,250 450,280 Z"
          fill="#7BB3D4"
          opacity="0.4"
        />

        {/* Tiny dock */}
        <rect x="440" y="270" width="20" height="40" fill="#8B7355" rx="2" />
        <rect x="435" y="265" width="30" height="6" fill="#A0845C" rx="1" />
      </svg>

      {/* Paper flowers bloom around the harbor */}
      <PaperFlowers count={8} />

      {/* Main story text — large, cinematic */}
      <motion.div
        className="relative text-center"
        style={{ zIndex: 25, marginTop: -80 }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <motion.p
          className="annotation"
          style={{
            fontSize: '1rem',
            color: 'rgba(255,248,237,0.6)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          January 2024
        </motion.p>

        <motion.h2
          className="display-text"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#FFF8ED',
            textShadow: '0 2px 30px rgba(0,0,0,0.15)',
            lineHeight: 1.2,
            maxWidth: 600,
            margin: '0 auto',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
        >
          And just like that, the ship found a harbor it didn't want to leave.
        </motion.h2>

        <motion.div
          className="mt-8 mx-auto"
          style={{ width: 60, height: 2, backgroundColor: 'rgba(255,248,237,0.3)' }}
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.8 }}
        />

        <motion.p
          className="handwritten mt-6"
          style={{
            fontSize: '1.3rem',
            color: 'rgba(255,248,237,0.8)',
            maxWidth: 450,
            margin: '1.5rem auto 0',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 1 }}
        >
          Some harbors are shaped like hearts. This one was ours.
        </motion.p>
      </motion.div>

      {/* Floating hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="absolute"
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + Math.sin(i) * 15}%`,
            zIndex: 15,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut',
          }}
        >
          <path
            d="M8 14 C3 10 1 6 3 4 C5 1 8 3 8 5 C8 3 11 1 13 4 C15 6 13 10 8 14Z"
            fill="#F4978E"
            opacity="0.4"
          />
        </motion.svg>
      ))}

      {/* Postage stamp decoration */}
      <motion.div
        className="postage-stamp absolute"
        style={{ top: 60, right: 80, zIndex: 25, transform: 'rotate(5deg)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
      >
        <div className="postage-stamp__inner" style={{ width: 80, height: 90 }}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path d="M20 35 C10 28 5 20 10 14 C14 8 20 12 20 16 C20 12 26 8 30 14 C35 20 30 28 20 35Z" fill="#F4978E" />
          </svg>
          <span className="annotation" style={{ fontSize: '0.55rem', color: '#5C4033', marginTop: 2 }}>
            JAN '24
          </span>
        </div>
      </motion.div>

      <Waves color="#2E4A6A" opacity={0.4} />
    </section>
  );
}

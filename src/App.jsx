import { useState, useRef, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Layout
import LoadingScreen from './components/layout/LoadingScreen';
import ShipTracker from './components/layout/ShipTracker';
import AudioControls from './components/layout/AudioControls';
import ScrollProgress from './components/layout/ScrollProgress';

// Sections
import S01_Opening from './components/sections/S01_Opening';
import S02_EastBlue from './components/sections/S02_EastBlue';
import S03_FirstTreasure from './components/sections/S03_FirstTreasure';
import S04_January2024 from './components/sections/S04_January2024';
import S05_ChaosIsland from './components/sections/S05_ChaosIsland';
import S06_AIEngineers from './components/sections/S06_AIEngineers';
import S07_PokemonForest from './components/sections/S07_PokemonForest';
import S08_GrandLine from './components/sections/S08_GrandLine';
import S09_LaughTale from './components/sections/S09_LaughTale';
import S10_Treasure from './components/sections/S10_Treasure';

import { useScrollProgress } from './hooks/useScrollProgress';
import { useAudio } from './hooks/useAudio';

// Ocean connector between islands
function OceanGap({ width = 600, variant = 0 }) {
  const colors = [
    ['#5A9EC4', '#4E8DB5', '#3A7BA5'],
    ['#4E8DB5', '#3A6E91', '#2E5A7A'],
    ['#3A7BA5', '#2E5A7A', '#1F3552'],
    ['#2E5A7A', '#1F3552', '#0F1B2E'],
  ];
  const [c1, c2, c3] = colors[variant % colors.length];

  return (
    <div
      className="relative flex-shrink-0"
      style={{
        width,
        height: '100%',
        background: `linear-gradient(180deg, #87CEEB 0%, ${c1} 30%, ${c2} 60%, ${c3} 100%)`,
      }}
    >
      {/* Gentle wave dashes on the ocean */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {[30, 45, 55, 65, 75].map((y, i) => (
          <line
            key={i}
            x1="10%"
            y1={`${y}%`}
            x2="90%"
            y2={`${y + 2}%`}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            strokeDasharray="20,30"
          />
        ))}
      </svg>

      {/* Dotted map trail */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
        <line
          x1="0"
          y1="70%"
          x2="100%"
          y2="70%"
          stroke="rgba(212,168,83,0.15)"
          strokeWidth="2"
          strokeDasharray="8,12"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [chestOpened, setChestOpened] = useState(false);
  const scrollContainerRef = useRef(null);

  const { progress } = useScrollProgress(scrollContainerRef);
  const { oceanEnabled, musicEnabled, toggleOcean, toggleMusic } = useAudio();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleChestOpen = useCallback(() => {
    setChestOpened(true);
    // Smoothly scroll to the final section
    const container = scrollContainerRef.current;
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollTo({ left: maxScroll, behavior: 'smooth' });
    }
  }, []);

  // Smooth scroll momentum with requestAnimationFrame
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isLoading) return;

    let velocity = 0;
    let animationFrame;
    let isScrolling = false;

    const onWheel = (e) => {
      e.preventDefault();
      // Map vertical scroll to horizontal
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      velocity += delta * 0.8;

      if (!isScrolling) {
        isScrolling = true;
        animate();
      }
    };

    const animate = () => {
      if (Math.abs(velocity) < 0.5) {
        velocity = 0;
        isScrolling = false;
        return;
      }

      container.scrollLeft += velocity;
      velocity *= 0.92; // Friction
      animationFrame = requestAnimationFrame(animate);
    };

    container.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheel);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main horizontal scroll container */}
      {!isLoading && (
        <>
          <div
            ref={scrollContainerRef}
            className="flex h-full no-scrollbar snap-x snap-mandatory"
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollBehavior: 'auto',
            }}
          >
            <S01_Opening />
            <OceanGap width={500} variant={0} />
            <S02_EastBlue />
            <OceanGap width={600} variant={0} />
            <S03_FirstTreasure />
            <OceanGap width={500} variant={1} />
            <S04_January2024 />
            <OceanGap width={600} variant={1} />
            <S05_ChaosIsland />
            <OceanGap width={500} variant={2} />
            <S06_AIEngineers />
            <OceanGap width={600} variant={3} />
            <S07_PokemonForest />
            <OceanGap width={500} variant={2} />
            <S08_GrandLine />
            <OceanGap width={600} variant={3} />
            <S09_LaughTale onChestOpen={handleChestOpen} />
            <OceanGap width={400} variant={1} />
            <S10_Treasure />
          </div>

          {/* Fixed UI overlays */}
          <ShipTracker progress={progress} />
          <ScrollProgress progress={progress} />
          <AudioControls
            oceanEnabled={oceanEnabled}
            musicEnabled={musicEnabled}
            toggleOcean={toggleOcean}
            toggleMusic={toggleMusic}
          />
        </>
      )}
    </>
  );
}

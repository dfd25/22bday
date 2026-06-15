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

// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// Ocean connector between islands (horizontal mode only)
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
      className="relative flex-shrink-0 ocean-gap-hide-mobile"
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
  const isMobile = useIsMobile();

  const { progress } = useScrollProgress(scrollContainerRef, isMobile);
  const { oceanEnabled, musicEnabled, toggleOcean, toggleMusic } = useAudio();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleChestOpen = useCallback(() => {
    setChestOpened(true);
    const container = scrollContainerRef.current;
    if (container) {
      if (isMobile) {
        const maxScroll = container.scrollHeight - container.clientHeight;
        container.scrollTo({ top: maxScroll, behavior: 'smooth' });
      } else {
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollTo({ left: maxScroll, behavior: 'smooth' });
      }
    }
  }, [isMobile]);

  // Desktop: smooth scroll momentum with requestAnimationFrame
  useEffect(() => {
    if (isMobile) return; // Mobile uses native touch scrolling
    const container = scrollContainerRef.current;
    if (!container || isLoading) return;

    let velocity = 0;
    let animationFrame;
    let isScrolling = false;

    const onWheel = (e) => {
      e.preventDefault();
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
      velocity *= 0.92;
      animationFrame = requestAnimationFrame(animate);
    };

    container.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheel);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isLoading, isMobile]);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main scroll container */}
      {!isLoading && (
        <>
          <div
            ref={scrollContainerRef}
            className={`no-scrollbar ${isMobile ? 'mobile-scroll-container' : 'desktop-scroll-container'}`}
          >
            <S01_Opening />
            {!isMobile && <OceanGap width={500} variant={0} />}
            <S02_EastBlue />
            {!isMobile && <OceanGap width={600} variant={0} />}
            <S03_FirstTreasure />
            {!isMobile && <OceanGap width={500} variant={1} />}
            <S04_January2024 />
            {!isMobile && <OceanGap width={600} variant={1} />}
            <S05_ChaosIsland />
            {!isMobile && <OceanGap width={500} variant={2} />}
            <S06_AIEngineers />
            {!isMobile && <OceanGap width={600} variant={3} />}
            <S07_PokemonForest />
            {!isMobile && <OceanGap width={500} variant={2} />}
            <S08_GrandLine />
            {!isMobile && <OceanGap width={600} variant={3} />}
            <S09_LaughTale onChestOpen={handleChestOpen} />
            {!isMobile && <OceanGap width={400} variant={1} />}
            <S10_Treasure />
          </div>

          {/* Fixed UI overlays */}
          {!isMobile && <ShipTracker progress={progress} />}
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

// ============================================
// THE GRAND LINE OF US — Constants & Content
// ============================================

export const COLORS = {
  oceanBlue: '#4E8DB5',
  oceanBlueLight: '#7BB3D4',
  oceanBlueDark: '#3A6E91',
  sandyBeige: '#EAD9B7',
  warmCream: '#FFF8ED',
  sunsetOrange: '#F7B267',
  coralPink: '#F4978E',
  deepNavy: '#1F3552',
  deepNavyLight: '#2E4F75',
  gold: '#D4A853',
  goldLight: '#E8C97A',
  parchment: '#F4E4C1',
  ink: '#2C1810',
  inkLight: '#5C4033',
};

export const LOADING_MESSAGES = [
  'Charting a course...',
  'Following old memories...',
  'Crossing the Grand Line...',
  'Approaching Laugh Tale...',
];

// Map total width (px) — the entire horizontal world
export const MAP_WIDTH = 14000;
export const VIEWPORT_SECTIONS = 10;

// Section positions along the horizontal map (in px from left)
export const ISLAND_POSITIONS = {
  opening:        { x: 0,     width: 1400 },
  eastBlue:       { x: 1500,  width: 1400 },
  firstTreasure:  { x: 3000,  width: 1400 },
  january2024:    { x: 4500,  width: 1600 },
  chaosIsland:    { x: 6200,  width: 1400 },
  aiEngineers:    { x: 7700,  width: 1400 },
  pokemonForest:  { x: 9200,  width: 1400 },
  grandLine:      { x: 10700, width: 1400 },
  laughTale:      { x: 12200, width: 1800 },
};

// Memories for message bottles (Section 3)
export const BOTTLE_MEMORIES = [
  {
    id: 1,
    text: "Remember when we spent hours debugging that one impossible error — and it turned out to be a missing semicolon? We laughed so hard we forgot to save the fix.",
  },
  {
    id: 2,
    text: "That late night when we talked about everything and nothing until the sun came up. The world felt a little smaller that night, and a lot warmer.",
  },
  {
    id: 3,
    text: "The first time we shared a playlist. Your taste was chaos and I loved every second of it.",
  },
];

// Chaos Island memories (Section 5)
export const CHAOS_MEMORIES = [
  {
    id: 1,
    title: "When We Almost Gave Up 🏆",
    text: "AtliQ Manthan Hackathon — we nearly called it quits at 10 PM. Then we pulled an all-nighter, showed up with a brand new version at 10 AM... and it turned out to be the winner. Never giving up is kind of our thing.",
    type: "sticky",
  },
  {
    id: 2,
    title: "The Fake Fights Era 💬",
    text: "Our WhatsApp group fights were LEGENDARY. Except... they weren't real fights at all. It was just our chaotic, ridiculous way of flirting. Everyone thought we were arguing. We were falling.",
    type: "bubble",
  },
  {
    id: 3,
    title: "3-4 Startups (Coming Soon™) 🚀",
    text: "We have 3-4 entire startup ideas that we've planned, brainstormed, and gotten excited about. Have we actually worked on any of them? Not yet. But the energy? Unmatched. The ambition? Through the roof. The execution? ...pending.",
    type: "sticky",
  },
];

// Future dreams / constellations (Section 6)
export const CONSTELLATION_DREAMS = [
  { id: 1, name: "Build Something Amazing", description: "A startup that changes how people think about AI" },
  { id: 2, name: "Travel the Real Grand Line", description: "Japan → Korea → everywhere the wind takes us" },
  { id: 3, name: "Ship Great Code", description: "Projects that make us proud at 3 AM" },
  { id: 4, name: "Never Stop Learning", description: "Two engineers, infinite curiosity" },
];

// Hidden objects in Pokemon Forest (Section 7)
export const HIDDEN_OBJECTS = [
  { id: 1, name: "Pikachu", note: "For the boy who always chooses the electric type — bold, bright, unstoppable." },
  { id: 2, name: "Rare Candy", note: "Because you level up everyone around you just by being yourself." },
  { id: 3, name: "Pokéball", note: "You caught my attention and never let it go." },
  { id: 4, name: "Eevee", note: "Infinite possibilities — just like you." },
  { id: 5, name: "Star Piece", note: "Rare, valuable, and worth searching for." },
];

// Birthday letter (Section 10)
export const BIRTHDAY_LETTER = {
  to: "To Akshat",
  paragraphs: [
    "If someone told me a year ago that a random encounter would turn into this — into us — I would have laughed. But here we are, and honestly? This has been the most beautiful, chaotic, wonderful adventure I never planned for.",
    "You are brilliant in ways that go far beyond code. You see the world differently — with curiosity, humor, and a stubbornness that makes me crazy and grateful in equal measure.",
    "Thank you for the 3 AM conversations that felt like they lasted five minutes. For making me laugh when I forgot how. For believing in the wildest dreams and making them feel possible.",
    "Every chapter of us has been my favorite. Every island we've visited, every storm we've sailed through — I'd do it all again. I'd choose this crew every time.",
    "This year, I want you to know: you are the treasure at the end of every map I'll ever draw.",
  ],
  closing: "Happy 22nd Birthday.",
  signature: "Love,\nIshita",
  finalMessage: "The greatest adventures are the people we share them with.",
};

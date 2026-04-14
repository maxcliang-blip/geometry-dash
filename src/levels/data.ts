export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'block' | 'spike' | 'portal' | 'orb' | 'pad';
}

export interface LevelData {
  name: string;
  difficulty: string;
  objects: GameObject[];
  backgroundColor: string;
  groundColor: string;
}

const createBlocks = (startX: number, count: number, y: number = 0): GameObject[] => {
  const blocks: GameObject[] = [];
  for (let i = 0; i < count; i++) {
    blocks.push({ x: startX + i * 30, y: y, width: 30, height: 30, type: 'block' });
  }
  return blocks;
};

export const STEREO_MADNESS: LevelData = {
  name: 'Stereo Madness',
  difficulty: 'Easy',
  backgroundColor: '#4C4CFF',
  groundColor: '#0000FF',
  objects: [
    ...createBlocks(400, 10),
    { x: 750, y: 0, width: 30, height: 30, type: 'spike' },
    ...createBlocks(900, 5),
    { x: 1050, y: 0, width: 30, height: 30, type: 'spike' },
    { x: 1080, y: 0, width: 30, height: 30, type: 'spike' },
    ...createBlocks(1200, 8),
    { x: 1350, y: 0, width: 30, height: 30, type: 'spike' },
    { x: 1380, y: 0, width: 30, height: 30, type: 'spike' },
    { x: 1410, y: 0, width: 30, height: 30, type: 'spike' },
    ...createBlocks(1600, 3, 30),
    ...createBlocks(1750, 3, 60),
    ...createBlocks(1900, 3, 90),
    { x: 2100, y: 0, width: 30, height: 30, type: 'spike' },
  ]
};

export const CANT_LET_GO: LevelData = {
  name: "Can't Let Go",
  difficulty: 'Hard',
  backgroundColor: '#5A0000',
  groundColor: '#3A0000',
  objects: [
    ...createBlocks(400, 8),
    { x: 640, y: 0, width: 30, height: 30, type: 'spike' },
    { x: 670, y: 0, width: 30, height: 30, type: 'spike' },
    ...createBlocks(800, 3, 60),
    { x: 830, y: 90, width: 30, height: 30, type: 'spike' },
    ...createBlocks(1000, 15, 0),
    { x: 1100, y: 30, width: 30, height: 30, type: 'spike' },
    { x: 1130, y: 30, width: 30, height: 30, type: 'spike' },
    ...createBlocks(1400, 5, 120),
    { x: 1460, y: 150, width: 30, height: 30, type: 'spike' },
    ...createBlocks(1700, 10, 0),
    { x: 1800, y: 0, width: 30, height: 30, type: 'spike' },
    { x: 1830, y: 0, width: 30, height: 30, type: 'spike' },
    { x: 1860, y: 0, width: 30, height: 30, type: 'spike' },
  ]
};

export const DEADLOCKED: LevelData = {
  name: 'Deadlocked',
  difficulty: 'Demon',
  backgroundColor: '#1A1A1A',
  groundColor: '#000000',
  objects: [
    { x: 400, y: 0, width: 30, height: 30, type: 'spike' },
    { x: 430, y: 0, width: 30, height: 30, type: 'spike' },
    { x: 460, y: 0, width: 30, height: 30, type: 'spike' },
    ...createBlocks(600, 1, 60),
    { x: 600, y: 90, width: 30, height: 30, type: 'spike' },
    ...createBlocks(750, 2, 30),
    { x: 750, y: 60, width: 30, height: 30, type: 'spike' },
    { x: 780, y: 60, width: 30, height: 30, type: 'spike' },
    ...createBlocks(950, 5, 0),
    { x: 1000, y: 30, width: 30, height: 30, type: 'spike' },
    { x: 1030, y: 30, width: 30, height: 30, type: 'spike' },
    ...createBlocks(1200, 2, 90),
    { x: 1200, y: 120, width: 30, height: 30, type: 'spike' },
    ...createBlocks(1350, 2, 150),
    { x: 1350, y: 180, width: 30, height: 30, type: 'spike' },
    ...createBlocks(1500, 1, 60),
    { x: 1500, y: 0, width: 30, height: 30, type: 'spike' },
    { x: 1530, y: 0, width: 30, height: 30, type: 'spike' },
    { x: 1560, y: 0, width: 30, height: 30, type: 'spike' },
    ...createBlocks(1700, 5, 0),
    { x: 1760, y: 30, width: 30, height: 30, type: 'spike' },
    { x: 1790, y: 60, width: 30, height: 30, type: 'spike' },
    { x: 1820, y: 90, width: 30, height: 30, type: 'spike' },
  ]
};

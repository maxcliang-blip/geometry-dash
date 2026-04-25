import './style.css';
import { Game } from './engine/Game';
import { STEREO_MADNESS, CANT_LET_GO, DEADLOCKED, LevelData } from './levels/data';

let currentGame: Game | null = null;
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ui = document.getElementById('ui') as HTMLDivElement;
const levelSelect = document.getElementById('level-select') as HTMLElement;

function startGame(levelKey: string) {
  let levelData: LevelData;

  switch (levelKey) {
    case 'stereo-madness':
      levelData = STEREO_MADNESS;
      break;
    case 'cant-let-go':
      levelData = CANT_LET_GO;
      break;
    case 'deadlocked':
      levelData = DEADLOCKED;
      break;
    default:
      levelData = STEREO_MADNESS;
  }

  if (currentGame) {
    currentGame.stop();
  }

  // Use classes for visibility for CSP compliance and performance
  ui.classList.add('hidden');
  canvas.classList.remove('hidden');

  currentGame = new Game(canvas, levelData);
  currentGame.start();
}

function backToMenu() {
  if (currentGame) {
    currentGame.stop();
    currentGame = null;
  }
  ui.classList.remove('hidden');
  canvas.classList.add('hidden');
}

// Optimization: Event delegation for level selection
levelSelect.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const levelKey = target.getAttribute('data-level');
  if (levelKey) {
    startGame(levelKey);
  }
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    currentGame?.handleInput();
  } else if (e.code === 'Escape') {
    backToMenu();
  }
});

window.addEventListener('mousedown', () => {
  currentGame?.handleInput();
});

window.addEventListener('touchstart', (e) => {
  if (currentGame) {
    e.preventDefault();
    currentGame.handleInput();
  }
}, { passive: false });

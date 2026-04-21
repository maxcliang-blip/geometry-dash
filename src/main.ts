import { Game } from './engine/Game';
import { STEREO_MADNESS, CANT_LET_GO, DEADLOCKED, LevelData } from './levels/data';

let currentGame: Game | null = null;
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ui = document.getElementById('ui') as HTMLDivElement;
const levelButtons = document.querySelectorAll('#level-select button');

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

  ui.style.display = 'none';
  canvas.style.display = 'block';

  currentGame = new Game(canvas, levelData);
  currentGame.start();
}

// Add event listeners to level buttons
levelButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const level = button.getAttribute('data-level');
    if (level) {
      startGame(level);
    }
  });
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    currentGame?.handleInput();
  }

  if (e.code === 'Escape') {
    if (currentGame) {
      currentGame.stop();
      currentGame = null;
      ui.style.display = 'flex';
      canvas.style.display = 'none';
    }
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
});

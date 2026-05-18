import { Game } from './engine/Game';
import { STEREO_MADNESS, CANT_LET_GO, DEADLOCKED, LevelData } from './levels/data';

let currentGame: Game | null = null;
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ui = document.getElementById('ui') as HTMLDivElement;

function startGame(levelKey: string | null) {
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

// Add event listeners to level select buttons
const levelButtons = document.querySelectorAll('#level-select button');
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
});

import { Game } from './engine/Game';
import { STEREO_MADNESS, CANT_LET_GO, DEADLOCKED, LevelData } from './levels/data';

let currentGame: Game | null = null;
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ui = document.getElementById('ui') as HTMLDivElement;

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

// Attach event listeners to level select buttons
document.querySelectorAll('#level-select button').forEach((button) => {
  button.addEventListener('click', () => {
    const level = (button as HTMLButtonElement).dataset.level;
    if (level) {
      startGame(level);
    }
  });
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    currentGame?.handleInput();
  }
});

window.addEventListener('mousedown', () => {
  currentGame?.handleInput();
});

window.addEventListener('touchstart', (e) => {
  e.preventDefault();
  currentGame?.handleInput();
});

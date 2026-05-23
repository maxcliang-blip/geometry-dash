import { Player } from './Player';
import { LevelData, GameObject } from '../levels/data';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private level: LevelData;
  private animationFrameId: number | null = null;
  private cameraX: number = 0;
  private groundY: number;
  private maxObjWidth: number = 0;
  private levelLength: number = 0;

  constructor(canvas: HTMLCanvasElement, level: LevelData) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.player = new Player();
    // Optimization: Sort objects by x-coordinate to allow binary search for spatial pruning
    this.level = {
      ...level,
      objects: [...level.objects].sort((a, b) => a.x - b.x),
    };

    // Track max width to ensure binary search includes wide objects starting before the viewport
    // And calculate total level length for progress bar
    for (const obj of this.level.objects) {
      if (obj.width > this.maxObjWidth) this.maxObjWidth = obj.width;
      if (obj.x + obj.width > this.levelLength) this.levelLength = obj.x + obj.width;
    }

    this.canvas.width = 800;
    this.canvas.height = 450;
    this.groundY = this.canvas.height * 0.8;
  }

  start() {
    this.player.reset();
    this.cameraX = 0;
    this.gameLoop();
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private gameLoop = () => {
    this.update();
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };

  private update() {
    // Update camera
    this.cameraX = this.player.x - 150;

    // Collision detection
    this.checkCollisions();

    this.player.update();

    if (this.player.isDead) {
      this.player.reset();
      this.cameraX = 0;
    }
  }

  private checkCollisions() {
    let groundedOnObject = false;
    const pLeft = this.player.x;
    const pRight = this.player.x + this.player.width;
    const pTop = this.player.y - this.player.height;

    const startIndex = this.findFirstIndexAfter(pLeft - 30);
    for (let i = startIndex; i < this.level.objects.length; i++) {
      const obj = this.level.objects[i];
      if (obj.x > pRight + 30) break;

      const objTop = -obj.y - obj.height;
      const objLeft = obj.x;

      if (this.rectIntersect(pLeft, pTop, this.player.width, this.player.height, objLeft, objTop, obj.width, obj.height)) {
        if (obj.type === 'spike') {
          this.player.isDead = true;
          return;
        } else if (obj.type === 'block') {
          // Check if we are landing on top of the block
          const prevPlayerBottom = this.player.y - this.player.vy;
          // If we are above the block or falling into it from above
          if (this.player.vy >= 0 && prevPlayerBottom <= objTop + 1) {
            this.player.y = objTop;
            this.player.vy = 0;
            groundedOnObject = true;
          } else {
            // Check if it's just a floor-level block we are sliding into
            if (obj.y === 0 && this.player.y === 0) {
              // Sliding on floor, ignore side collision with ground-level block
              groundedOnObject = true;
            } else {
              // Hit the side or bottom of a block
              this.player.isDead = true;
              return;
            }
          }
        }
      }
    }

    if (groundedOnObject) {
      this.player.isGrounded = true;
    }
    if (groundedOnObject) this.player.isGrounded = true;
  }

  private rectIntersect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number) {
    return x2 < x1 + w1 && x2 + w2 > x1 && y2 < y1 + h1 && y2 + h2 > y1;
  }

  /**
   * Finds the first object index that could possibly be visible or colliding,
   * using binary search on the x-sorted objects array.
   */
  private findFirstIndexAfter(minX: number): number {
    let low = 0;
    let high = this.level.objects.length - 1;
    let result = 0;

    const searchX = minX - this.maxObjWidth;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (this.level.objects[mid].x >= searchX) {
        result = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return result;
  }

  private draw() {
    const { ctx, canvas, level, player, cameraX, groundY } = this;

    // Background
    ctx.fillStyle = level.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Camera transform
    ctx.save();
    ctx.translate(-cameraX, groundY);

    // Ground
    ctx.fillStyle = level.groundColor;
    ctx.fillRect(cameraX, 0, canvas.width, canvas.height - groundY);

    const blockPath = new Path2D();
    const spikePath = new Path2D();
    let hasBlocks = false;
    let hasSpikes = false;

    // Draw objects
    const startIndex = this.findFirstIndexAfter(cameraX);
    for (let i = startIndex; i < level.objects.length; i++) {
      const obj = level.objects[i];
      if (obj.x > cameraX + canvas.width) break;
      if (obj.type === 'block') {
        blockPath.rect(obj.x, -obj.y - obj.height, obj.width, obj.height);
        hasBlocks = true;
      } else if (obj.type === 'spike') {
        spikePath.moveTo(obj.x, -obj.y);
        spikePath.lineTo(obj.x + obj.width / 2, -obj.y - obj.height);
        spikePath.lineTo(obj.x + obj.width, -obj.y);
        hasSpikes = true;
      }
    }

    if (hasBlocks) {
      ctx.fillStyle = '#eee';
      ctx.fill(blockPath);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke(blockPath);
    }

    if (hasSpikes) {
      ctx.fillStyle = '#ff4444';
      ctx.fill(spikePath);
    }

    // Draw player
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y - player.height / 2);
    ctx.rotate((player.rotation * Math.PI) / 180);
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(-player.width / 2, -player.height / 2, player.width, player.height);
    ctx.restore(); // Restore camera transform
    ctx.restore(); // Restore global context (for cameraX, groundY translation)

    // Progress bar (Overlay, should be drawn last after coordinate restores)
    this.drawProgressBar();
  }

  private drawProgressBar() {
    const { ctx, canvas, player, levelLength } = this;
    const padding = 10;
    const barWidth = canvas.width - padding * 2;
    const barHeight = 6;
    const progress = Math.min(1, Math.max(0, player.x / levelLength));

    ctx.save();
    // Container
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(padding, padding, barWidth, barHeight);

    // Progress
    ctx.fillStyle = '#fff';
    ctx.fillRect(padding, padding, barWidth * progress, barHeight);

    // Text
    ctx.fillStyle = '#fff';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.floor(progress * 100)}%`, canvas.width / 2, padding + barHeight + 14);
    ctx.restore();
  }

  handleInput() {
    this.player.jump();
  }
}

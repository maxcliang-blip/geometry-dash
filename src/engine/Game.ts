import { Player } from './Player';
import { LevelData, GameObject } from '../levels/data';

const DEG_TO_RAD = Math.PI / 180;

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
    this.ctx = canvas.getContext('2d', { alpha: false })!; // Optimization: Disable alpha if not needed
    this.player = new Player();
    // Optimization: Sort objects by x-coordinate to allow binary search for spatial pruning
    this.level = {
      ...level,
      objects: [...level.objects].sort((a, b) => a.x - b.x),
    };

    // Track max width to ensure binary search includes wide objects starting before the viewport
    // Also determine level length for the progress bar
    for (const obj of this.level.objects) {
      if (obj.width > this.maxObjWidth) this.maxObjWidth = obj.width;
      const rightEdge = obj.x + obj.width;
      if (rightEdge > this.levelLength) this.levelLength = rightEdge;
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

  /**
   * Performs O(log N) lookup to find objects in a specific X range.
   * Uses a callback to avoid array allocations in hot loops.
   */
  private forEachInRange(minX: number, maxX: number, callback: (obj: GameObject) => void): void {
    const objects = this.level.objects;
    let start = 0;
    let end = objects.length - 1;
    let startIndex = 0;

    // Binary search for first object that could overlap the range [minX, maxX]
    // An object overlaps if obj.x + obj.width >= minX AND obj.x <= maxX.
    // Since they are sorted by x, we find the first index where obj.x >= minX - maxObjWidth.
    const searchX = minX - this.maxObjWidth;

    while (start <= end) {
      const mid = (start + end) >> 1;
      if (objects[mid].x >= searchX) {
        startIndex = mid;
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    for (let i = startIndex; i < objects.length; i++) {
      const obj = objects[i];
      if (obj.x > maxX) break;
      if (obj.x + obj.width >= minX) {
        callback(obj);
      }
    }
  }

  private checkCollisions() {
    let groundedOnObject = false;

    // Optimization: Hoist player properties to avoid repeated property access
    const { width: pWidth, height: pHeight, x: pLeft, vy: pVy } = this.player;
    const pRight = pLeft + pWidth;

    this.forEachInRange(pLeft - 1, pRight + 1, (obj) => {
      if (this.player.isDead) return; // Stop processing if already dead

      const pTop = this.player.y - pHeight;
      const pBottom = this.player.y;
      const objTop = -obj.y - obj.height;
      const objLeft = obj.x;

      if (this.rectIntersect(pLeft, pTop, pWidth, pHeight, objLeft, objTop, obj.width, obj.height)) {
        if (obj.type === 'spike') {
          this.player.isDead = true;
        } else if (obj.type === 'block') {
          // Check if we are landing on top of the block
          const prevPlayerBottom = pBottom - pVy;
          // If we are above the block or falling into it from above
          if (pVy >= 0 && prevPlayerBottom <= objTop + 1) {
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
            }
          }
        }
      }
    });

    if (groundedOnObject) {
      this.player.isGrounded = true;
    }
  }

  private rectIntersect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number) {
    return x2 < x1 + w1 && x2 + w2 > x1 && y2 < y1 + h1 && y2 + h2 > y1;
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

    // Optimization: Use Path2D for batching objects of the same type
    const blocksPath = new Path2D();
    const spikesPath = new Path2D();
    let hasBlocks = false;
    let hasSpikes = false;

    // Viewport culling with spatial pruning
    this.forEachInRange(cameraX, cameraX + canvas.width, (obj) => {
      if (obj.type === 'block') {
        blocksPath.rect(obj.x, -obj.y - obj.height, obj.width, obj.height);
        hasBlocks = true;
      } else if (obj.type === 'spike') {
        spikesPath.moveTo(obj.x, -obj.y);
        spikesPath.lineTo(obj.x + obj.width / 2, -obj.y - obj.height);
        spikesPath.lineTo(obj.x + obj.width, -obj.y);
        spikesPath.closePath();
        hasSpikes = true;
      }
    });

    if (hasBlocks) {
      ctx.fillStyle = '#eee';
      ctx.fill(blocksPath);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke(blocksPath);
    }

    if (hasSpikes) {
      ctx.fillStyle = '#ff4444';
      ctx.fill(spikesPath);
    }

    // Draw player
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y - player.height / 2);
    ctx.rotate(player.rotation * DEG_TO_RAD); // Precomputed constant
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(-player.width / 2, -player.height / 2, player.width, player.height);
    ctx.restore();

    ctx.restore();

    // Progress Bar
    const progress = this.levelLength > 0 ? Math.min(player.x / this.levelLength, 1) : 0;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0, 0, canvas.width, 5);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width * progress, 5);
  }

  handleInput() {
    this.player.jump();
  }
}

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
  private sortedObjects: GameObject[];

  constructor(canvas: HTMLCanvasElement, level: LevelData) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.player = new Player();
    this.level = level;

    // Clone and sort objects by X-coordinate for efficient spatial pruning
    this.sortedObjects = [...level.objects].sort((a, b) => a.x - b.x);

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

    // Spatial pruning: only check objects within a reasonable range of the player
    const playerX = this.player.x;
    const range = 100; // Look ahead and behind 100 pixels

    for (const obj of this.sortedObjects) {
      // Since objects are sorted by X, we can skip those far behind and break early for those far ahead
      if (obj.x + obj.width < playerX - range) continue;
      if (obj.x > playerX + this.player.width + range) break;

      const playerTop = this.player.y - this.player.height;
      const playerBottom = this.player.y;
      const playerLeft = this.player.x;
      const playerRight = this.player.x + this.player.width;

      const objTop = -obj.y - obj.height;
      const objBottom = -obj.y;
      const objLeft = obj.x;
      const objRight = obj.x + obj.width;

      if (this.rectIntersect(playerLeft, playerTop, this.player.width, this.player.height, objLeft, objTop, obj.width, obj.height)) {
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

    // Draw objects with frustum culling and batching
    const blockBatch = new Path2D();
    const spikeBatch = new Path2D();

    for (const obj of this.sortedObjects) {
      // Frustum culling: skip objects outside the viewport
      if (obj.x + obj.width < cameraX) continue;
      if (obj.x > cameraX + canvas.width) break;

      if (obj.type === 'block') {
        blockBatch.rect(obj.x, -obj.y - obj.height, obj.width, obj.height);
      } else if (obj.type === 'spike') {
        spikeBatch.moveTo(obj.x, -obj.y);
        spikeBatch.lineTo(obj.x + obj.width / 2, -obj.y - obj.height);
        spikeBatch.lineTo(obj.x + obj.width, -obj.y);
      }
    }

    // Fill and stroke batches
    ctx.fillStyle = '#eee';
    ctx.fill(blockBatch);
    ctx.strokeStyle = '#000';
    ctx.stroke(blockBatch);

    ctx.fillStyle = '#ff4444';
    ctx.fill(spikeBatch);

    // Draw player
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y - player.height / 2);
    ctx.rotate((player.rotation * Math.PI) / 180);
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(-player.width / 2, -player.height / 2, player.width, player.height);
    ctx.restore();

    ctx.restore();
  }

  handleInput() {
    this.player.jump();
  }
}

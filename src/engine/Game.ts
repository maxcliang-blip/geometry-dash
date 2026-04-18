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

  constructor(canvas: HTMLCanvasElement, level: LevelData) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.player = new Player();
    this.level = level;

    // Sort objects by x-coordinate for efficient collision detection and rendering
    this.level.objects.sort((a, b) => a.x - b.x);

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

    const playerLeft = this.player.x;
    const playerRight = this.player.x + this.player.width;

    for (const obj of this.level.objects) {
      // Since objects are sorted by x, we can skip those that are already behind us
      if (obj.x + obj.width < playerLeft) continue;
      // And we can stop once we encounter objects that are further than our right edge
      if (obj.x > playerRight) break;

      // playerTop and playerBottom must be calculated inside the loop because
      // player.y can be modified (snapped) when landing on a block.
      const playerTop = this.player.y - this.player.height;
      const objTop = -obj.y - obj.height;
      const objLeft = obj.x;

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
    const viewportRight = cameraX + canvas.width;
    const blockPath = new Path2D();
    const spikePath = new Path2D();
    let hasBlocks = false;
    let hasSpikes = false;

    for (const obj of level.objects) {
      // Frustum culling: skip objects outside the viewport
      if (obj.x + obj.width < cameraX) continue;
      // Since objects are sorted by x, we can stop early
      if (obj.x > viewportRight) break;

      if (obj.type === 'block') {
        blockPath.rect(obj.x, -obj.y - obj.height, obj.width, obj.height);
        hasBlocks = true;
      } else if (obj.type === 'spike') {
        spikePath.moveTo(obj.x, -obj.y);
        spikePath.lineTo(obj.x + obj.width / 2, -obj.y - obj.height);
        spikePath.lineTo(obj.x + obj.width, -obj.y);
        spikePath.closePath();
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
    ctx.restore();

    ctx.restore();
  }

  handleInput() {
    this.player.jump();
  }
}

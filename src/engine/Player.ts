export class Player {
  x: number = 100;
  y: number = 0;
  width: number = 30;
  height: number = 30;
  vy: number = 0;
  rotation: number = 0;
  isGrounded: boolean = false;
  isDead: boolean = false;

  readonly gravity: number = 0.6;
  readonly jumpForce: number = -10;
  readonly speed: number = 5;

  constructor() {}

  update() {
    if (this.isDead) return;

    this.isGrounded = false; // Reset every frame, will be set by collision logic

    this.vy += this.gravity;
    this.y += this.vy;
    this.x += this.speed;

    if (!this.isGrounded) {
      this.rotation += 6;
    } else {
      // Snap rotation to nearest 90 degrees when grounded
      const targetRotation = Math.round(this.rotation / 90) * 90;
      this.rotation += (targetRotation - this.rotation) * 0.3;
    }

    // Basic ground collision (floor)
    if (this.y >= 0) {
      this.y = 0;
      this.vy = 0;
      this.isGrounded = true;
    }
  }

  jump() {
    if (this.isGrounded) {
      this.vy = this.jumpForce;
      this.isGrounded = false;
    }
  }

  reset(startX: number = 100, startY: number = 0) {
    this.x = startX;
    this.y = startY;
    this.vy = 0;
    this.rotation = 0;
    this.isGrounded = false;
    this.isDead = false;
  }
}

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Game variables
let player = { x: 50, y: 500, width: 50, height: 50, speed: 5, jumpPower: 15, velocityY: 0, grounded: false };
let gravity = 0.8;

let platforms = [
  { x: 0, y: 550, width: 800, height: 50 },
  { x: 200, y: 400, width: 150, height: 20 },
  { x: 400, y: 300, width: 150, height: 20 }
];

let obstacle = { x: 600, y: 500, width: 50, height: 50, speed: 3 };

// Key tracking
let keys = {};

// Event listeners for movement
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw platforms
  ctx.fillStyle = '#654321';
  platforms.forEach(platform => {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });

  // Draw player
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw obstacle
  ctx.fillStyle = '#0000FF';
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

  // Player movement
  if (keys['a'] || keys['A']) player.x -= player.speed;
  if (keys['d'] || keys['D']) player.x += player.speed;

  // Jumping
  if ((keys['w'] || keys['W']) && player.grounded) {
    player.velocityY = -player.jumpPower;
    player.grounded = false;
  }

  // Gravity
  player.velocityY += gravity;
  player.y += player.velocityY;

  // Ground collision
  platforms.forEach(platform => {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y < platform.y + platform.height &&
      player.y + player.height > platform.y
    ) {
      player.y = platform.y - player.height;
      player.velocityY = 0;
      player.grounded = true;
    }
  });

  // Obstacle movement
  obstacle.x += obstacle.speed;
  if (obstacle.x + obstacle.width > canvas.width || obstacle.x < 0) {
    obstacle.speed *= -1;
  }

  // Collision detection with obstacle (Game Over logic placeholder)
  if (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  ) {
    alert('Game Over!');
    player.x = 50;
    player.y = 500;
    obstacle.x = 600;
  }
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
ctx.fillStyle = 'red';
ctx.fillRect(100, 100, 200, 100);

  requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();

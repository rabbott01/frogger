const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let playerX = canvas.width / 2;
let playerY = canvas.height - 50;
let obstacles = []; // Array to store obstacles

// Create obstacles (example: moving cars)
for (let i = 0; i < 5; i++) {
  obstacles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height - 100),
    width: 40,
    height: 20,
    speed: Math.random() * 2 + 1 // Varying speeds
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillRect(playerX, playerY, 20, 20);

  // Draw and move obstacles
  for (let obstacle of obstacles) {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    obstacle.x += obstacle.speed; // Move obstacles
    if (obstacle.x > canvas.width) {
      obstacle.x = -obstacle.width; // Reset off-screen obstacles
    }

    // Collision detection (basic example)
    if (
      playerX < obstacle.x + obstacle.width &&
      playerX + 20 > obstacle.x &&
      playerY < obstacle.y + obstacle.height &&
      playerY + 20 > obstacle.y
    ) {
      alert("Game Over!"); // Handle collision (restart, etc.)
    }
  }

  requestAnimationFrame(gameLoop);
}

// Keyboard input handler
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp': playerY -= 10; break;
    case 'ArrowDown': playerY += 10; break;
    case 'ArrowLeft': playerX -= 10; break;
    case 'ArrowRight': playerX += 10; break;
  }
});

gameLoop();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let playerX = canvas.width / 2;
let playerY = canvas.height - 50;
let obstacles = [];
let gameOver = false;

// Obstacle creation (you'll likely want to customize this)
for (let i = 0; i < 5; i++) {
  obstacles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height - 100),
    width: 40,
    height: 20,
    speed: Math.random() * 2 + 1
  });
}

// ... your other game variables ...

let obstacleInterval;

function startObstacleCreation() {
  obstacleInterval = setInterval(createObstacle, 2000); // Create obstacle every 2 seconds
}

function createObstacle() {
  obstacles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height - 100),
    width: 40, // Adjust width based on image
    height: 20, // Adjust height based on image
    speed: Math.random() * 2 + 1,
    image: new Image() // Add image property
  });
  const lastObstacle = obstacles[obstacles.length - 1];
  lastObstacle.image.src = 'path/to/your/obstacle/image.png'; // Set image source
}

// Start obstacle creation when the game starts
startObstacleCreation();

function gameLoop() {
  if (gameOver) {
    return; // Stop the game loop if game over
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = 'green'; // Set player color to green
  ctx.fillRect(playerX, playerY, 20, 20);

  // Draw and move obstacles
  for (let obstacle of obstacles) {
    ctx.fillStyle = 'red'; // Set obstacle color to red
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    obstacle.x += obstacle.speed;
    if (obstacle.x > canvas.width) {
      obstacle.x = -obstacle.width;
    }

    // Collision detection
    if (
      playerX < obstacle.x + obstacle.width &&
      playerX + 20 > obstacle.x &&
      playerY < obstacle.y + obstacle.height &&
      playerY + 20 > obstacle.y
    ) {
      gameOver = true;
      showGameOverScreen();
    }
  }

  requestAnimationFrame(gameLoop);
}

function showGameOverScreen() {
  const gameOverDiv = document.createElement('div');
  gameOverDiv.id = 'gameOver'; // Give the div an ID for styling
  gameOverDiv.innerHTML = `
    <h2>Game Over!</h2>
    <button id="restartButton">Play Again</button>
  `;
  document.body.appendChild(gameOverDiv);

  document.getElementById('restartButton').addEventListener('click', resetGame);
}

function resetGame() {
  // Reset player position
  playerX = canvas.width / 2;
  playerY = canvas.height - 50;

  // Reset obstacles (or randomize positions)
  obstacles = []; // Clear obstacles
  for (let i = 0; i < 5; i++) { // Create new obstacles
    obstacles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height - 100),
      width: 40,
      height: 20,
      speed: Math.random() * 2 + 1
    });
  }

  gameOver = false;

  // Remove the game over screen
  const gameOverDiv = document.getElementById('gameOver');
  if (gameOverDiv) {
    gameOverDiv.remove();
  }

  gameLoop();
}

// Keyboard input handler
document.addEventListener('keydown', (event) => {
  if (!gameOver) { // Only allow movement if game is not over
    switch (event.key) {
      case 'ArrowUp': playerY -= 10; break;
      case 'ArrowDown': playerY += 10; break;
      case 'ArrowLeft': playerX -= 10; break;
      case 'ArrowRight': playerX += 10; break;
    }
  }
});

gameLoop();

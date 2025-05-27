
// --- Ads Section with Game Button ---

// Create the ads section
const adsSection = document.createElement('div');
adsSection.id = 'ads-section';
adsSection.style.position = 'fixed';
adsSection.style.bottom = '20px';
adsSection.style.right = '20px';
adsSection.style.background = '#fff8dc';
adsSection.style.border = '2px solid #f1c40f';
adsSection.style.padding = '20px';
adsSection.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
adsSection.style.zIndex = 99999;
adsSection.style.borderRadius = '8px';

// Add some ad-like content and the button
adsSection.innerHTML = `
  <div style="margin-bottom:10px;font-size:1.15em;">
    <b>Sponsored:</b> Click below for a surprise game!
  </div>
  <button id="play-game-btn" style="
    background:#2ecc40;
    color:#fff;
    font-size:1em;
    border:none;
    border-radius:4px;
    padding:10px 20px;
    cursor:pointer;
    transition:background 0.2s;
  ">Play Game</button>
`;

// Append ads section to the body
document.body.appendChild(adsSection);

// --- Dinosaur Game Logic ---
function startDinoGame() {
  // Remove all elements from document body
  document.body.innerHTML = '';

  // Set up the game canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'dino-game-canvas';
  canvas.width = 800;
  canvas.height = 300;
  canvas.style.display = 'block';
  canvas.style.margin = '40px auto';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  // Game variables
  let dino = { x: 50, y: 230, w: 44, h: 44, vy: 0, jumping: false };
  let gravity = 1.2;
  let ground = 274;
  let obstacles = [];
  let frame = 0;
  let score = 0;
  let gameOver = false;

  // Dinosaur sprite (simple box)
  function drawDino() {
    ctx.fillStyle = '#555';
    ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
    // Eye
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(dino.x + 32, dino.y + 12, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(dino.x + 33, dino.y + 12, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Obstacle sprite
  function drawObstacles() {
    ctx.fillStyle = '#228B22';
    obstacles.forEach(ob => {
      ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
    });
  }

  function drawGround() {
    ctx.strokeStyle = '#888';
    ctx.beginPath();
    ctx.moveTo(0, ground + dino.h);
    ctx.lineTo(canvas.width, ground + dino.h);
    ctx.stroke();
  }

  function jump() {
    if (!dino.jumping) {
      dino.vy = -18;
      dino.jumping = true;
    }
  }

  // Key controls
  window.onkeydown = function(e) {
    if ((e.code === 'Space' || e.key === 'ArrowUp' || e.key === 'w') && !gameOver) {
      jump();
    }
    if (gameOver && (e.code === 'Space' || e.key === 'ArrowUp' || e.key === 'w')) {
      restartGame();
    }
  };

  function collision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y
    );
  }

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move dino
    dino.y += dino.vy;
    dino.vy += gravity;
    if (dino.y >= ground) {
      dino.y = ground;
      dino.vy = 0;
      dino.jumping = false;
    }

    // Obstacles logic
    if (frame % 90 === 0) {
      let h = 40 + Math.floor(Math.random() * 30);
      obstacles.push({
        x: canvas.width,
        y: ground + dino.h - h,
        w: 20 + Math.floor(Math.random() * 20),
        h: h
      });
    }

    obstacles.forEach(ob => { ob.x -= 8; });
    obstacles = obstacles.filter(ob => ob.x + ob.w > 0);

    // Collision & score
    for (let ob of obstacles) {
      if (collision(dino, ob)) {
        gameOver = true;
      }
    }
    if (!gameOver) score++;

    // Draw everything
    drawGround();
    drawObstacles();
    drawDino();

    // Draw score
    ctx.fillStyle = '#222';
    ctx.font = '24px monospace';
    ctx.fillText('Score: ' + score, 20, 38);

    if (gameOver) {
      ctx.fillStyle = '#f00';
      ctx.font = '40px sans-serif';
      ctx.fillText('GAME OVER', canvas.width/2 - 120, canvas.height/2 - 20);
      ctx.font = '22px sans-serif';
      ctx.fillStyle = '#333';
      ctx.fillText('Press Space to Restart', canvas.width/2 - 120, canvas.height/2 + 20);
      return;
    }

    frame++;
    requestAnimationFrame(gameLoop);
  }

  function restartGame() {
    dino = { x: 50, y: 230, w: 44, h: 44, vy: 0, jumping: false };
    obstacles = [];
    frame = 0;
    score = 0;
    gameOver = false;
    gameLoop();
  }

  // Start the game loop
  gameLoop();
}

// --- Event Listener for the Button ---
document.getElementById('play-game-btn').onclick = startDinoGame;

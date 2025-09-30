const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let blocks = [];
let score = 0;

function spawnBlock() {
  const size = 30 + Math.random() * 20;
  blocks.push({
    x: Math.random() * canvas.width,
    y: -size,
    size,
    speed: 1 + Math.random() * 3,
    color: "#00ffff"
  });
}

function drawBlock(block) {
  ctx.fillStyle = block.color;
  ctx.fillRect(block.x, block.y, block.size, block.size);
}

function updateBlocks() {
  blocks.forEach(block => {
    block.y += block.speed;
  });
  blocks = blocks.filter(block => block.y < canvas.height);
}

function checkCollision(mouseX, mouseY) {
  blocks.forEach((block, i) => {
    if (
      mouseX > block.x &&
      mouseX < block.x + block.size &&
      mouseY > block.y &&
      mouseY < block.y + block.size
    ) {
      blocks.splice(i, 1);
      score++;
    }
  });
}

canvas.addEventListener("mousemove", e => {
  checkCollision(e.clientX, e.clientY);
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateBlocks();
  blocks.forEach(drawBlock);
  ctx.fillStyle = "#fff";
  ctx.font = "20px Segoe UI";
  ctx.fillText(`Score: ${score}`, 20, 40);
  requestAnimationFrame(gameLoop);
}

setInterval(spawnBlock, 500);
gameLoop();

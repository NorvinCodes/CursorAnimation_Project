const cursor = document.querySelector('.cursor');
const ring = document.querySelector('.cursor-ring'); 
const trailArea = document.getElementById('trail-area');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

const TRAIL_COUNT = 5;
const trails = [];

for (let i = 0; i < TRAIL_COUNT; i++) {
  const dot = document.createElement('div');
  dot.className = 'trail';
  trailArea.appendChild(dot);
  trails.push({el: dot, x: mouseX, y: mouseY});
}

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animate() {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';

  let prevX = mouseX;
  let prevY = mouseY;

  trails.forEach((trail, i) => {
    trail.x += (prevX - trail.x) * 0.3;
    trail.y += (prevY - trail.y) * 0.3;
    trail.el.style.left = trail.x + 'px';
    trail.el.style.top = trail.y + 'px';
    trail.el.style.opacity = (0.6 * (1 - i / TRAIL_COUNT)).toFixed(2);
    prevX = trail.x;
    prevY = trail.y;
  });

  requestAnimationFrame(animate);
}

animate();

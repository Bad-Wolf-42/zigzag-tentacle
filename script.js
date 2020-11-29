const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 500;

let segmentsArray = [];
const maxSegments = 10;

let mouse = {
  x: null,
  y: null
}

class Segment {
  constructor(index, width) {
    this.index = index;
    this.width = width;
    this.ax = (this.index === 0) ? canvas.width/2 : segmentsArray[index - 1].bx;
    this.ay = (this.index === 0) ? canvas.height : segmentsArray[index - 1].by;
    this.theta = 0;
    this.length = 30;
    this.dx = Math.cos(this.theta) * this.length;
    this.dy = Math.sin(this.theta) * this.length;
    this.bx = this.ax + this.dx;
    this.by = this.ay + this.dy;
  }
  draw() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = this.width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.ax, this.ay);
    ctx.lineTo(this.bx, this.by);
    ctx.stroke();
  }
  update() {
    this.ax = (this.index === 0) ? canvas.width/2 : segmentsArray[this.index - 1].bx;
    this.ay = (this.index === 0) ? canvas.height : segmentsArray[this.index - 1].by;
    if (this.index !== 0) this.theta = segmentsArray[this.index - 1].theta - 0.5;
    else if (this.index === 0) this.theta = calculateAngle(this.ax, this.ay);
    this.dx = Math.cos(this.theta) * this.length;
    this.dy = -Math.abs(Math.sin(this.theta) * this.length);
    this.bx = this.ax + this.dx;
    this.by = this.ay + this.dy;
  }
}

function calculateAngle(xPos, yPos) {
  let y = mouse.y - yPos;
  let x = mouse.x - yPos;
  let newAngle = Math.atan2(y, x);
  return newAngle;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < segmentsArray.length; i++) {
    segmentsArray[i].update();
    segmentsArray[i].draw();
  }
  requestAnimationFrame(animate);
}

function init() {
  let segmentWidth = maxSegments;
  for (i = 0; i < maxSegments; i++) {
    segmentsArray.push(new Segment(i, segmentWidth));
    segmentWidth -= 1;
  }
  animate();
}

window.addEventListener('mousemove', function(e) {
  const boundary = canvas.getBoundingClientRect();
  mouse.x = e.x - boundary.left;
  mouse.y = e.y - boundary.top;
});

init();

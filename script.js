const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 500;

let segmentsArray = [];
const maxSegments = 1;

class Segment {
  constructor(index, width) {
    this.index = index;
    this.width = width;
    this.ax = (this.index === 0) ? canvas.width/2 : segmentsArray[index - 1].bx;
    this.ay = (this.index === 0) ? canvas.height : segmentsArray[index - 1].by;
    this.theta = -Math.PI / 2;
    this.length = 100;
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
}

segmentsArray.push(new Segment(0, 10));
segmentsArray.push(new Segment(1, 8));
segmentsArray[0].draw();
segmentsArray[1].draw();

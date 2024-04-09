let scoops = [];
let colorArray = [
  "#F9AFD2",
  "#FEE8E7",
  "#D28475",
  "#ADE9E2",
  "#D4EF8F",
  "#DEB0F6",
];

function setup() {
  createCanvas(400, 400);

  let maxBubbles = 10;

  for (let i = 0; i < maxBubbles; i++) {
    let x = random(width);
    let y = random(height);
    let c = (colorArray[i % colorArray.length]);

    scoops.push(new Scoop(x, y, c));
  }
}

function draw() {
  background(220);

  for (scoop of scoops) {
    scoop.move();
    scoop.display();
  }
}

function newScoop() {
  let x = random(width);
  let y = -50;
  let c = (colorArray[floor(random(colorArray.length))]);

  scoops.push(new Scoop(x, y, c));
}

class Scoop {
  constructor(x, y, c) {
    this.color = c;
    this.radius = 20;
    this.speed = createVector(0, 1);
    this.pos = createVector(x, y);
  }

  move() {
    if (this.pos.y > height) {
      this.terminate();
      newScoop();
    }
    this.pos.add(this.speed);
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.radius);
  }

  terminate() {
    scoops = scoops.filter(s => s !== this);
  }
}

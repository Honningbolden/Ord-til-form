let scoops = [];
let text = "Img/SVG/Asset 1.svg";
let logo = "Img/hjemis-logo.png";
let imageArray = [
  "Img/1207840.png.avif",
  "Img/1207851.png.avif",
  "Img/1207855.png.avif",
  "Img/36940035.png.avif",
  "Img/champagnebrus.png",
  "Img/Cornetto.png",
  "Img/kungfu.png",
  "Img/Nogger.png",
  "Img/Solbaerstang.png",
  "Img/frysepizza.png",
];

function preload() {
  imageArray.forEach((image, index) => {
    imageArray[index] = loadImage(image);
  });
  logo = loadImage(logo);
  text = loadImage(text);
}

function setup() {
  let canvasAspectRatio = 842 / 1191;
  let windowAspectRatio = windowWidth / windowHeight;
  let canvasWidth, canvasHeight;

  if (windowAspectRatio > canvasAspectRatio) {
    // Window is wider than the canvas aspect ratio, so constrain by height
    canvasHeight = windowHeight;
    canvasWidth = canvasHeight * canvasAspectRatio;
  } else {
    // Window is taller than the canvas aspect ratio, so constrain by width
    canvasWidth = windowWidth;
    canvasHeight = canvasWidth / canvasAspectRatio;
  }

  let canvas = createCanvas(canvasWidth, canvasHeight);
  
  canvas.parent("canvasContainer");
  imageMode(CENTER);
  titleFont = textFont("breakers", 128);
  subtitleFont = textFont("breakers", 42);

  let maxBubbles = 30;

  for (let i = 0; i < maxBubbles; i++) {
    let x = random(width);
    let y = random(height);
    let img = imageArray[i % imageArray.length];
    let speedMult = random(0.5);

    scoops.push(new Scoop(x, y, img, speedMult));
  }
}

function draw() {
  background("#2DA9E1");

  image(logo, width - height / 10, height - height / 10, height / 8, height / 8);

  for (scoop of scoops) {
    scoop.move();
    scoop.display();
  }

  let displayWidth = width * 0.7; // 70% of the canvas width
  let aspectRatio = text.width / text.height;
  let displayHeight = displayWidth / aspectRatio;

  image(text, (width) / 2, (height) / 2, displayWidth, displayHeight);
}

function newScoop(imgSize) {
  let x = random(width);
  let y = -imgSize;
  let img = imageArray[floor(random(imageArray.length))];
  let speedMult = random(0.5);

  scoops.push(new Scoop(x, y, img, speedMult));
}

class Scoop {
  constructor(x, y, img, speedMult) {
    this.image = img;
    this.radius = height / 10;
    this.speed = createVector(0, 1).mult(speedMult + 1);
    this.pos = createVector(x, y);
  }

  move() {
    if (this.pos.y > height + this.radius) {
      this.terminate();
      newScoop(this.radius);
    }
    this.pos.add(this.speed);
  }

  display() {
    image(this.image, this.pos.x, this.pos.y, this.radius, this.radius);
  }

  terminate() {
    scoops = scoops.filter((s) => s !== this);
  }
}

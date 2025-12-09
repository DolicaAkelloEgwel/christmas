let video;
let snowflakes = [];
let halfWidth;
let halfHeight;
let videoStretch;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  halfWidth = windowWidth / 2;
  halfHeight = windowHeight / 2;
  
  videoStretch = 512 * (windowHeight / 512)
  
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  
  video = createCapture(VIDEO);
  video.size(512, 512);
  video.hide();
  
  for (let i = 0; i < 80; i++) {
    snowflakes.push(new Snowflake());
  }
}

function draw() { 
  background(0);
  
  image(video, halfWidth, halfHeight, videoStretch, height);
  
  for (let flake of snowflakes) {
    flake.update();
    push();
    translate(flake.posX, flake.posY);
    rotate(frameCount * 0.75);
    flake.display();
    pop();
  }
}

class Snowflake {
  constructor() {
    this.posX = random(0, width);
    this.posY = random(-height, 0);
    this.size = random(30, 100);
    
  }
  update() {
    let ySpeed = 80 / this.size;
    this.posY += ySpeed;
    
    if (this.posY > height + 50) {
      this.posY = -50;
    }
  }
  display() {
    textSize(this.size);
    fill(171, 209, 243);
    text("❄", 0, 0);
  }
}

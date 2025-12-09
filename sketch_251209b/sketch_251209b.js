let video;
let snowflakes = [];
let halfWidth;
let halfHeight;
let videoStretch;

let N_SNOWFLAKES = 80;

let sleigh;

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
  
  for (let i = 0; i < N_SNOWFLAKES; i++) {
    snowflakes.push(new Snowflake());
  }
  
  sleigh = new Sleigh();
}

function draw() { 
  background(0);
  
  image(video, halfWidth, halfHeight, videoStretch, height);
  
  for (let flake of snowflakes) {
    flake.update();
    push();
    translate(flake.posX, flake.posY);
    rotate((flake.angleOffset + frameCount) * 0.75);
    flake.display();
    pop();
  }
  sleigh.update();
  sleigh.display();
}

class Snowflake {
  constructor() {
    this.posX = random(0, width);
    this.posY = random(-height, 0);
    this.size = random(30, 100);
    this.angleOffset = random(0, 360);
    
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

class Reindeer {
  constructor(x, y) {
    this.posX = x;
    this.posY = y;
  }
  display() {
    textSize(150);
    text("🦌", this.posX, this.posY);
  }
}

class Sleigh {
  constructor() {
    let current_x = 0;
    this.N_REINDEER = 9;
    let REINDEER_X_DIST = 150;
    
    this.first_x = width * 2;
    this.first_y = random(30, height - 30);
    
    this.speed = 3;
    
    this.reindeer = [new Reindeer(this.first_x, this.first_y)];
    
    for (let i = 1; i < this.N_REINDEER; i++) {
      current_x = this.first_x + (i * REINDEER_X_DIST);
      this.reindeer.push(new Reindeer(current_x, this.first_y));
    }
  }
  update() {
    for (let reindeer of this.reindeer) {
      reindeer.posX -= this.speed;
    }
    if (this.reindeer[this.N_REINDEER - 1].posX < -200) {
      let new_y = random(30, height - 30);
      for (let reindeer of this.reindeer) {
        reindeer.posY = new_y;
        reindeer.posX += width * 2.5;
      }
    }
  }
  display() {
    for (let reindeer of this.reindeer) {
      reindeer.display();
    }
  }
}

let video;
let snowflakes = [];
let halfWidth;
let halfHeight;
let videoStretch;

let N_SNOWFLAKES = 80;
let RESIZE_FACTOR = 0.9;
let VIDEO_SIZE = 512;
let SNOWFLAKE_ROTATION_SPEED = 0.75;

let sleigh;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  halfWidth = windowWidth / 2;
  halfHeight = windowHeight / 2;
  
  videoStretch = VIDEO_SIZE * (windowHeight * RESIZE_FACTOR / VIDEO_SIZE);
  
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  
  video = createCapture(VIDEO);
  video.size(VIDEO_SIZE, VIDEO_SIZE);
  video.hide();
  
  //background = loadImage('https://w.wallhaven.cc/full/p9/wallhaven-p98w6e.jpg');
  
  for (let i = 0; i < N_SNOWFLAKES; i++) {
    snowflakes.push(new Snowflake());
  }
  
  sleigh = new Sleigh();
}

function draw() { 
  background(0);
  
  //image(background, halfWidth, halfHeight);
  image(video, halfWidth, halfHeight, videoStretch, height * RESIZE_FACTOR);
  
  for (let flake of snowflakes) {
    flake.update();
    push();
    translate(flake.posX, flake.posY);
    rotate((flake.angleOffset + frameCount) * SNOWFLAKE_ROTATION_SPEED);
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
    text("🦌", 0, 0);
  }
}

class Sleigh {
  constructor() {
    let current_x = 0;
    this.N_REINDEER = 9;
    let REINDEER_X_DIST = 150;
    this.Y_BORDER = 200
    
    this.first_x = width * 2;
    this.first_y = random(this.Y_BORDER, height - this.Y_BORDER);
    
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
      reindeer.posY = this.first_y + sin(reindeer.posX * 0.75) * 50;
    }
    if (this.reindeer[this.N_REINDEER - 1].posX < -200) {
      this.first_y = random(this.Y_BORDER, height - this.Y_BORDER);
      let width_increase = width * 2.5;
      for (let reindeer of this.reindeer) {
        reindeer.posY = this.first_y;
        reindeer.posX += width_increase;
      }
    }
  }
  display() {
    for (let reindeer of this.reindeer) {
      push();
      translate(reindeer.posX, reindeer.posY);
      rotate(cos(reindeer.posX * 0.75) * 22.5);
      reindeer.display();
      pop();
    }
  }
}

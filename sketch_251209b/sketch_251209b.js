let video;
let snowflakes = [];
let halfWidth;
let halfHeight;
let videoWidthStretch;
let videoHeightStretch;

let RESIZE_FACTOR = 0.9;
let VIDEO_SIZE = 512;

let N_SNOWFLAKES = 80;
let SNOWFLAKE_ROTATION_SPEED = 0.75;
let MIN_SNOWFLAKE_SIZE = 30;
let MAX_SNOWFLAKE_SIZE = 100;
let SNOWFLAKE_Y_LIMIT = 50;

let N_REINDEER = 9;
let REINDEER_FONT_SIZE = 150;
let REINDEER_Y_BORDER = 300;
let REINDEER_X_SEPARATION = 150;
let MAX_REINDEER_ROTATION = 35;
let REINDEER_X_LIMIT = -200;
let REINDEER_FREQUENCY_FACTOR = 0.375;

let sleigh;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  halfWidth = windowWidth / 2;
  halfHeight = windowHeight / 2;
  
  videoWidthStretch = VIDEO_SIZE * (windowHeight * RESIZE_FACTOR / VIDEO_SIZE);
  videoHeightStretch = height * RESIZE_FACTOR;
  
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
  image(video, halfWidth, halfHeight, videoWidthStretch, videoHeightStretch);
  
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
    this.size = random(MIN_SNOWFLAKE_SIZE, MAX_SNOWFLAKE_SIZE);
    this.angleOffset = random(0, 360);
    this.ySpeed = 80 / this.size;
  }
  update() {
    this.posY += this.ySpeed;
    if (this.posY > height + SNOWFLAKE_Y_LIMIT) {
      this.posY = -SNOWFLAKE_Y_LIMIT;
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
    textSize(REINDEER_FONT_SIZE);
    text("🦌", 0, 0);
  }
}

class Sleigh {
  constructor() {
    let reindeer_x = width * 2;

    this.centre_y = random(REINDEER_Y_BORDER, height - REINDEER_Y_BORDER);
    this.speed = 5;
    this.reindeer_x_shift = width * 2.5;
    this.reindeer = [];
    
    for (let i = 0; i < N_REINDEER; i++) {
      this.reindeer.push(new Reindeer(reindeer_x, this.centre_y));
      reindeer_x += REINDEER_X_SEPARATION;
    }
  }
  update() {
    for (let reindeer of this.reindeer) {
      reindeer.posX -= this.speed;
      reindeer.posY = this.centre_y + sin(reindeer.posX * REINDEER_FREQUENCY_FACTOR) * 75;
    }
    if (this.reindeer[N_REINDEER - 1].posX < REINDEER_X_LIMIT) {
      this.centre_y = random(REINDEER_Y_BORDER, height - REINDEER_Y_BORDER);
      for (let reindeer of this.reindeer) {
        reindeer.posX += this.reindeer_x_shift;
      }
    }
  }
  display() {
    for (let reindeer of this.reindeer) {
      push();
      translate(reindeer.posX, reindeer.posY);
      rotate(cos(reindeer.posX * REINDEER_FREQUENCY_FACTOR) * MAX_REINDEER_ROTATION);
      reindeer.display();
      pop();
    }
  }
}

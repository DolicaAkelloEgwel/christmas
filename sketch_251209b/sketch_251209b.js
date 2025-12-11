let video;
let snowflakes = [];
let halfWidth;
let halfHeight;
let videoWidthStretch;
let videoHeightStretch;
let bg;

let columns;
let rows;

let RESIZE_FACTOR = 0.8;
let VIDEO_SIZE = 512;
let BG_IMAGE_SIZE = 240;

let N_SNOWFLAKES = 80;
let SNOWFLAKE_ROTATION_SPEED = 0.75;
let MIN_SNOWFLAKE_SIZE = 30;
let MAX_SNOWFLAKE_SIZE = 100;
let SNOWFLAKE_Y_LIMIT = 50;

let N_REINDEER = 9;
let REINDEER_FONT_SIZE = 120;
let REINDEER_Y_BORDER = 300;
let REINDEER_X_SEPARATION = 150;
let MAX_REINDEER_ROTATION = 45;
let REINDEER_X_LIMIT = -200;
let REINDEER_Y_AMPLITUDE = 150;
let REINDEER_FREQUENCY_FACTOR = 0.375;

let sleigh;

function preload() {
  bg = loadImage('https://raw.githubusercontent.com/DolicaAkelloEgwel/christmas/refs/heads/main/assets/christmas-lights.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  halfWidth = windowWidth / 2;
  halfHeight = windowHeight / 2;
  
  videoWidthStretch = VIDEO_SIZE * (windowHeight * RESIZE_FACTOR / VIDEO_SIZE);
  videoHeightStretch = height * RESIZE_FACTOR;
  
  // determine the number of times the background image will need to be repeated
  columns = ceil(width / BG_IMAGE_SIZE);
  rows = ceil(height / BG_IMAGE_SIZE);
  
  angleMode(DEGREES);
  
  // centre text so that snowflake rotation looks right
  textAlign(CENTER, CENTER);
  
  // retrieve webcam video - which is coming from Autolume through OBS Studio
  video = createCapture(VIDEO);
  video.size(VIDEO_SIZE, VIDEO_SIZE);
  video.hide();
  
  // initialise snowflakes
  for (let i = 0; i < N_SNOWFLAKES; i++) {
    snowflakes.push(new Snowflake());
  }
  
  // initialise the sleigh
  sleigh = new Sleigh();
}

function draw() { 
  background(0);
  
  // tile the background image
  imageMode(CORNER);
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      image(bg, i * BG_IMAGE_SIZE, j * BG_IMAGE_SIZE, BG_IMAGE_SIZE, BG_IMAGE_SIZE);   
    }
  }
  //image(bg, 0, 0);

  // put the Autolume video in the centre
  imageMode(CENTER);
  image(video, halfWidth, halfHeight, videoWidthStretch, videoHeightStretch);
  
  // move the slowflakes
  for (let flake of snowflakes) {
    flake.update();
    push();
    translate(flake.posX, flake.posY);
    rotate(flake.angleOffset + (frameCount * SNOWFLAKE_ROTATION_SPEED));
    flake.display();
    pop();
  }
  
  // update and display the sleigh
  sleigh.update();
  sleigh.display();
}

class Snowflake {
  constructor() {
    this.posX = random(0, width);
    this.posY = random(-height, 0);
    this.size = random(MIN_SNOWFLAKE_SIZE, MAX_SNOWFLAKE_SIZE);
    this.angleOffset = random(0, 60);
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
    let reindeerX = width * 2;

    this.centreY = random(REINDEER_Y_BORDER, height - REINDEER_Y_BORDER);
    this.xSpeed = 5;
    this.reindeerXShift = width * 2.5;
    this.reindeer = [];
    
    for (let i = 0; i < N_REINDEER; i++) {
      this.reindeer.push(new Reindeer(reindeerX, this.centreY));
      reindeerX += REINDEER_X_SEPARATION;
    }
  }
  update() {
    for (let reindeer of this.reindeer) {
      reindeer.posX -= this.xSpeed;
      reindeer.posY = this.centreY + sin(reindeer.posX * REINDEER_FREQUENCY_FACTOR) * REINDEER_Y_AMPLITUDE;
    }
    if (this.reindeer[N_REINDEER - 1].posX < REINDEER_X_LIMIT) {
      this.centreY = random(REINDEER_Y_BORDER, height - REINDEER_Y_BORDER);
      for (let reindeer of this.reindeer) {
        reindeer.posX += this.reindeerXShift;
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

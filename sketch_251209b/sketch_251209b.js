/*
WEBCAM INPUT
Getting webcam input with p5.js is super easy! We create a variable for it, start the capture in setup(), and can display the result with the image() command! In upcoming examples, we'll also see how we can access the pixels from the webcam
*/

let video;
let snowflakes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  
  video = createCapture(VIDEO);
  video.size(512, 512);
  video.hide();
  
  for (let i = 0; i < 100; i++) {
    snowflakes.push(new Snowflake());
  }
}

function draw() { 
  // Display the video just like an image! 
  background(0);
  
  image(video, windowWidth/2,windowHeight/2, 512 * (height / 512), height);
  
  for (let flake of snowflakes) {
    flake.update();
    flake.display();
  }
}

class Snowflake {
  constructor() {
    this.posX = random(0, width);
    this.posY = random(-height, 0);
    this.size = random(20, 50);
    
  }
  update() {
    let ySpeed = 24 / this.size;
    this.posY += ySpeed;
    
    if (this.posY > height + 50) {
      this.posY = -50;
    }
  }
  display() {
    textSize(this.size);
    fill(171, 209, 243);
    text("❄", this.posX, this.posY);
  }
}

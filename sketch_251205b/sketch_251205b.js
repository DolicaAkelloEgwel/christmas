// Define array to hold snowflake objects
let snowflakes = [];



function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  textAlign(CENTER);
  

  // Create snowflake objects
  for (let i = 0; i < 50; i++) {
    // Add a new snowflake object to the array
    snowflakes.push(new Snowflake());
  }

  // Create screen reader accessible description
  describe('Snowflakes falling on a black background.');
}

function draw() {
  background(0);

  // Update and display each snowflake in the array
  let currentTime = frameCount / 60;

  for (let flake of snowflakes) {
    // Update each snowflake position and display
    flake.update(currentTime);
    //push();
    //translate(flake.posX, flake.posY);
    //rotate((frameCount % 360) * flake.speed);
    flake.display();
    //pop();
  }
}

// Define the snowflake class

class Snowflake {
  constructor() {
    this.posX = 0;
    this.posY = random(-height, 0);
    this.initialAngle = random(0, 360);
    this.size = random(20, 50);
    this.radius = sqrt(random(pow(width / 2, 2)));
    this.speed = this.size * 0.1 * (floor(random(0,2)) * 2 - 1);
  }

  update(time) {
    // Define angular speed (degrees / second)
    let angularSpeed = 35;

    // Calculate the current angle
    let angle = this.initialAngle + angularSpeed * time;

    // x position follows a sine wave
    this.posX = width / 4 + this.radius * sin(angle * 0.25);

    // Different size snowflakes fall at different y speeds
    let ySpeed = 25 / this.size;
    this.posY += ySpeed;

    // When snowflake reaches the bottom, move it to the top
    if (this.posY > height) {
      this.posY = -50;
    }
  }

  display() {
    textSize(this.size);
    noStroke();
    text("ha", this.posX, this.posY);
  }
}

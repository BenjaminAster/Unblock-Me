

function setup() {
	createCanvas(windowWidth, windowHeight);

	game = new Game();
	game.nextLevel();

	windowResized();
}

function draw() {
	background(0);

	game.draw();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	game.unit = width / 100;
	game.windowResized();
}

function mousePressed() {
	game.mousePressed();
}

function mouseReleased() {
	game.mouseReleased();
}
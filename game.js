class Game {
	constructor() {
		this.unit;

		this.gridUWid = 6;  // grid width in units
		this.gridUHei = 6;  // grid height in units
		/*
		this.grid = Array(this.gridUHei).fill(0).map(x => Array(this.gridUWid).fill(false));
		this.blocks = [];
		*/

		this.exit = createVector(this.gridUWid, 2);
		this.levels = new Levels();
		this.levelNum = -1;
	}

	windowResized() {
		this.gridPWid = min(width, height); // grid width in pixels
		this.gridPHei = min(width, height); // grid height in pixels

		this.tileSize = this.gridPWid / this.gridUWid;

		for (let i in this.blocks) {
			this.blocks[i].windowResized();
		}
	}

	nextLevel() {
		this.levelNum++;
		this.grid = [];
		this.grid = Array(this.gridUHei).fill(0).map(x => Array(this.gridUWid).fill(false));
		/*
		this.grid = Array(this.gridUHei).fill(0)
		this.grid.forEach((item, index) => { this.grid[index] = Array(this.gridUWid).fill(false) });
		*/
		this.blocks = [];
		let level = this.levels.getLevel(this.levelNum);
		for (let i in level) {
			let block = level[i];
			this.blocks.push(new Block(block.x, block.y, block.l, block.h, (i == 0)));
		}
	}

	draw() {

		noFill();
		stroke(0xff);
		let strokeWei = this.unit / 6;
		strokeWeight(strokeWei);
		rect(strokeWei / 2, strokeWei / 2, this.gridPWid - strokeWei, this.gridPHei - strokeWei);
		if (this.blocks[0].moving) {
			this.blocks[0].update();
		}
		for (let i in this.blocks) {
			this.blocks[i].draw();
		}
		strokeCap(SQUARE);
		stroke("red");
		line(this.exit.x * this.tileSize - strokeWei / 2, this.exit.y * this.tileSize, this.exit.x * this.tileSize - strokeWei / 2, (this.exit.y + 1) * this.tileSize);
	}

	mousePressed() {
		for (let i in this.blocks) {
			if (this.blocks[i].checkMouseTouching()) {
				let movingBlockDummy = this.blocks[i];
				this.blocks.splice(i, 1);
				this.blocks.unshift(movingBlockDummy);
				this.blocks[0].startMoving();
				break;
			}
		}
	}

	mouseReleased() {
		if (this.blocks[0].moving) {
			this.blocks[0].stopMoving();
		}
	}
}

let game;
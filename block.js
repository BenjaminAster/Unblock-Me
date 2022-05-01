class Block {
	constructor(uX, uY, uLen, horizontal, isRedBlock) {
		this.uX = uX;
		this.uY = uY;
		this.horizontal = horizontal;
		this.uLen = uLen
		this.uWid = this.horizontal ? this.uLen : 1;
		this.uHei = this.horizontal ? 1 : this.uLen;

		this.moving = false;
		this.isRedBlock = isRedBlock;
		this.col = this.isRedBlock ? color("red") : color(0xff);
		this.pWid = this.uWid * game.tileSize;
		this.pHei = this.uHei * game.tileSize;

		this.stampToGrid();
	}

	windowResized() {
		this.pWid = this.uWid * game.tileSize;
		this.pHei = this.uHei * game.tileSize;
	}

	update() {
		if (this.horizontal) {
			this.uX = mouseX / game.tileSize - this.relMousePos * this.uWid;
			this.uX = constrain(this.uX, this.spaceBegin, this.spaceEnd - this.uLen);
			if (this.isRedBlock && this.uX + this.uLen > game.gridUWid) {
				game.nextLevel();
			}
		} else {
			this.uY = mouseY / game.tileSize - this.relMousePos * this.uHei;
			this.uY = constrain(this.uY, this.spaceBegin, this.spaceEnd - this.uLen);
			if (this.isRedBlock && this.uY + this.uLen > game.gridUHei) {
				game.nextLevel();
			}
		}
	}

	draw() {
		this.pX = this.uX * game.tileSize;
		this.pY = this.uY * game.tileSize;

		let borderSpace = game.unit / 2;
		fill(this.col);
		noStroke();
		rect(this.pX + borderSpace, this.pY + borderSpace, this.pWid - borderSpace * 2, this.pHei - borderSpace * 2);
	}

	checkMouseTouching() {
		if (mouseX > this.pX && mouseX < this.pX + this.pWid &&
			mouseY > this.pY && mouseY < this.pY + this.pHei) {
			return true;
		}
		return false;
	}

	startMoving() {
		this.moving = true;
		if (this.horizontal) {
			this.relMousePos = norm(mouseX, this.pX, this.pX + this.pWid);
			this.spaceBegin = 0;
			this.spaceEnd = this.isRedBlock ? 9999 : game.gridUWid;

			for (let i = 0; i < this.uLen; i++) {
				game.grid[this.uY][this.uX + i] = false;
			}
			for (let i = this.uX; i >= 0; i--) {
				if (game.grid[this.uY][i]) {
					this.spaceBegin = i + 1;
					break;
				}
			}
			for (let i = this.uX + this.uLen; i < game.gridUWid; i++) {
				if (game.grid[this.uY][i]) {
					this.spaceEnd = i;
					break;
				}
			}
		} else {
			this.relMousePos = norm(mouseY, this.pY, this.pY + this.pHei);
			this.spaceBegin = 0;
			this.spaceEnd = this.isRedBlock ? 9999 : game.gridUHei;

			for (let i = 0; i < this.uLen; i++) {
				game.grid[this.uY + i][this.uX] = false;
			}
			for (let i = this.uY - 1; i >= 0; i--) {
				if (game.grid[i][this.uX]) {
					this.spaceBegin = i + 1;
					break;
				}
			}
			for (let i = this.uY + this.uLen; i < game.gridUHei; i++) {
				if (game.grid[i][this.uX]) {
					this.spaceEnd = i;
					break;
				}
			}
		}
	}

	stopMoving() {
		this.moving = false;
		this.uX = round(this.uX);
		this.uY = round(this.uY);
		this.stampToGrid();
	}

	stampToGrid() {
		if (this.horizontal) {
			for (let i = 0; i < this.uLen; i++) {
				game.grid[this.uY][this.uX + i] = true;
			}
		} else {
			for (let i = 0; i < this.uLen; i++) {
				game.grid[this.uY + i][this.uX] = true;
			}
		}
	}
}

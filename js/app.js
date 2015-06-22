// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

/*
* Enemy.init - handles stuff that happens at the beginning of each game (IE:
* immediately upon enemy object creation. In this case, we load up the bug image.
* For everything else related to "building a better bug", see the reset function.
*/
Enemy.prototype.init = function () {
	this.sprite.init();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	if (0 < this.delay) {
		// At first, this bug is not yet moving. Count down to when it will take off.
		this.delay -= dt;
	} else {
		this.x = this.x + this.speed * dt;
		if ((board.COLS * board.COL_WIDTH) < this.x) {
			//Hey! We made it all the way across the board... let's start again...
			this.reset();
		}
	}
};
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/*
* Enemy.setSpeed - return a number of pixels per second - the speed at which the
* bug will appear to crawl across the screen. Currently, this is a pretty sedate
* one board column width per second.
*
* Future enhancments could vary the bug's speed on subsequent runs, just to make
* the game more challenging.
*/
Enemy.prototype.setSpeed = function () {
	return board.COL_WIDTH; //For now, move a constant column's width per second
};

/*
* Enemy.setDelay - return a number of seconds that this bug will hide off screen
* before taking another run across the screen. Currently, this is a random number
* between one and five seconds.
*
* Future enhancements might tune this up to make the game more or less challenging.
*/
Enemy.prototype.setDelay = function () {
	return Math.floor(Math.random() * 5) + 1;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [],
	enemyIndex,
	player = new Player();

for (enemyIndex = 0; enemyIndex < 4; enemyIndex++) {
	allEnemies.push(new Enemy());
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

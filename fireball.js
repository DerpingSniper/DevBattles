var collision = require('./collision.js');
module.exports = function (faceRight, x, y, w, h) {
    this.w = 20;
    this.h = 20;
    this.y = y + 15;

	if (faceRight == true) {
		this.x = x + w + 1;
        this.speed = 4;
	} else {
		this.x = x - 21;
		this.speed = -4;
	}

	this.move = function () {
		this.x += this.speed;
	}
    
    this.collidePlatforms = function () {
		var platform;
		for (var p in platforms) {
			platform = platforms[p];
			if (this.collide(platform)) {
                this.erase();
				return platform;
			}
		}
		return false;
	}

	this.collide = function (obj) {
		return collision(this.x, this.y, this.w, this.h, obj.x, obj.y, obj.w, obj.h);
	}
}
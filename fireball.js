var collision = require('./collision.js');
module.exports = function (id, faceRight, x, y, w, h) {
    this.w = 40;
    this.h = 20;
    this.y = y + this.h/2 - 5;
    this.id = id;
    this.faceRight = faceRight;
    
	if (faceRight) {
		this.x = x + w + 1;
        this.speed = 4;
	} else {
		this.x = x - (this.w + 1);
		this.speed = -4;
	}

	this.move = function () {
		this.x += this.speed;
        
        if (this.speed > 0) {
            this.speed = this.speed - 0.03;
        } else {
            this.speed = this.speed + 0.03;
        }
        
        if (this.speed > -0.02 && this.speed < 0.02) {
            this.erase();
        }
	}
    
    this.erase = function () {
        delete fireballs[this.id];
    }

	this.collide = function (obj) {
		return collision(this.x, this.y, this.w, this.h, obj.x, obj.y, obj.w, obj.h);
	}
}
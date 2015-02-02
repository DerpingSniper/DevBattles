var collision = require('./collision.js');
module.exports = function (id, x, y, w, h) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 20;
    
	this.collide = function (obj) {
		return collision(this.x, this.y, this.w, this.h, obj.x, obj.y, obj.w, obj.h);
	}
}
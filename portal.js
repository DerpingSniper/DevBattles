var collision = require('./collision.js');
module.exports = function (id, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    
    this.collide = function (obj) {
		return collision(this.x, this.y, this.w, this.h, obj.x, obj.y, obj.w, obj.h);
	}
}
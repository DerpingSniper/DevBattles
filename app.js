var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var player = require('./player.js');

//globals
users = {};
players = {};
platforms = [];
fireballs = [];

CANVAS_W = 600;
CANVAS_H = 600;
PLAYER_W = 50;
PLAYER_H = 50;
JUMP = 40;
MAX_YSPEED = 7;
MAX_XSPEED = 3;
STOMP_SPEED = 3;
ACCEL_TICKS = 10;
FPS = 150;

server.listen(3000);

app.use(express.static(__dirname + '/img'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	socket.on('login', function (data, callback) {

		if (data in users) {
			callback(false);
		} else if (data) {
			callback({
				CANVAS_W: CANVAS_W,
				CANVAS_H: CANVAS_H,
				platforms: platforms
			});
			socket.nickname = data;
			users[socket.nickname] = socket;
			players[socket.nickname] = new player(socket.nickname, CANVAS_W / 2 - PLAYER_W / 2, 0, PLAYER_W, PLAYER_H);
			io.sockets.emit('usernames', Object.keys(users));
		} else {
			callback(false);
		}
	});
	socket.on('keyDown', function (data) {
		players[socket.nickname].keyDown(data);
	});
	socket.on('keyUp', function (data) {
		players[socket.nickname].keyUp(data);
	});
	socket.on('disconnect', function (data) {
		if (socket.nickname) {
			delete users[socket.nickname];
			delete players[socket.nickname];
			io.sockets.emit('usernames', Object.keys(users));
		} else {
			return;
		}
	});
});
//Give the platforms a position
platforms[platforms.length] = {
	x: 0,
	y: CANVAS_H - PLAYER_H/2,
	w: 455,
	h: 50
};
platforms[platforms.length] = {
	x: PLAYER_W*3,
	y: CANVAS_H-PLAYER_H/1.5,
	w: 200,
	h: PLAYER_H
};
platforms[platforms.length] = {
	x: PLAYER_W*3.5,
	y: CANVAS_H-PLAYER_H/1.1,
	w: PLAYER_W*3,
	h: PLAYER_H
};
platforms[platforms.length] = {
	x: PLAYER_W*5,
	y: CANVAS_H-PLAYER_H*3,
	w: PLAYER_W*5,
	h: PLAYER_H/2
};
platforms[platforms.length] = {
	x: PLAYER_W*2,
	y: CANVAS_H-PLAYER_H * 5 + 2,
	w: PLAYER_W*3,
	h: PLAYER_H/5
};
platforms[platforms.length] = {
	x: PLAYER_W * 6,
	y: ~~(CANVAS_H - PLAYER_H*1.01),
	w: CANVAS_W,
	h: 100
};

setInterval(gameLoop, 1000 / FPS);

function gameLoop() {
	var player, test;
	var update = {};
	update.players = {};
	update.fireballs = {};

	for (var p in players) {
		players[p].move();
	}

	for (var p in players) {
		player = players[p];
		update.players[player.nickname] = {
			x: player.x,
			y: player.y,
			w: player.w,
			h: player.h
		}
	}

	for (var f in fireballs) {
		fireballs[f].move();
	}

	for (var f in fireballs) {
		fireball = fireballs[f];
		update.fireballs[f] = {
			x: fireball.x,
			y: fireball.y,
			w: fireball.w,
			h: fireball.h
		}
	}

	io.sockets.emit('update', update);
}
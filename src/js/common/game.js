var screenSize = require('../config/screenSize');

/* Create new game */
var game = module.exports = new Phaser.Game(
	screenSize.CANVAS_WIDTH,
	screenSize.CANVAS_HEIGHT,
	Phaser.CANVAS,
	'game'
);
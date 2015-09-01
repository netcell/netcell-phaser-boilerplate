var _    = require('lodash');
/**
 * Performance Control Plugin for Phaser
 * TODO: Move this plugin to another repository
 *
 */
class Node {
	constructor(){
		this.init(...arguments);
	}
	init(fps, time, timeStep){
		this.fps      = fps;
		this.time     = time;
		this.timeStep = timeStep;
		this.alive    = true;
	}
	get alive(){
		if (!this._alive) return false;
		else if (Date.now() - this.time > this.timeStep) {
			return this._alive = false;
		} else return true;
	}
	set alive(bool){
		this._alive = bool;
	}
}

function checkAlive(node){
	return node.alive;
}

function checkDead(node){
	return !node.alive;
}

export default class Performance extends Phaser.Plugin {
	constructor(game, thresolds = [25, 35]){
		super(game);
		/** Enable advancedTiming for Phaser */
		game.time.advancedTiming = true;
		/** Array of the data nodes */
		this.nodes       = [];
		this.currentType = 'High';
		/** TODO: Write a comment */
		this.timeStep  = 3000;
		this.thresolds = [{
			type : 'Low',
			max  : thresolds[0],
			min  : 0
		}, {
			type : 'Medium',
			max  : thresolds[1],
			min  : thresolds[0]
		}, {
			type : 'High',
			max  : Number.MAX_VALUE,
			min  : thresolds[1]
		}];
		/** Performance events */
		this.events = {
			onLow    : new Phaser.Signal(),
			onMedium : new Phaser.Signal(),
			onHigh   : new Phaser.Signal()
		};
	}
	get alive(){
		return this.nodes.filter(checkAlive);
	}
	get average(){
		var alive = this.alive;
		if (!alive.length) return 0;
		else return _.sum(alive, 'fps')/alive.length;
	}
	/** Quick check for current type */
	get isLow(){
		return this.currentType === 'Low';
	}
	get isMedium(){
		return this.currentType === 'Medium';
	}
	get isHigh(){
		return this.currentType === 'High';
	}
	/** Object pool */
	createNode(){
		var newNode = _.find(this.nodes, checkDead);
		if (!newNode) {
			newNode = new Node(...arguments);
			this.nodes.push(newNode);
		} else {
			newNode.init(...arguments);
		}
	}
	update(){
		var fps  = this.game.time.fps;
		var time = Date.now();
		this.createNode(fps, time, this.timeStep);

		var average   = this.average;
		var thresolds = this.thresolds;

		for (var i = thresolds.length - 1; i >= 0; i--) {
			var high = thresolds[i].max;
			var low  = thresolds[i].min;
			if (_.inRange(average, low, high)) {
				var type = thresolds[i].type;
				if (this.currentType != type) {
					this.currentType = type;
					this.events[`on${type}`].dispatch();
				}
				return;
			}
		};
	}
}
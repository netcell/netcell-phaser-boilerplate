var signals  = require('../../common/signals');
var fileList = require('../../config/fileList');
/**
 * This is a class that should be extended to create states.
 * Remember to call super.methodName at the beginning of
 * the method definition.
 */
export default class State {
	constructor() {

	}
	preload() {
		fileList.load(game);
	}
	create() {
		fileList.loadNinePatch(game);
	}
	shutdown() {

	}
}
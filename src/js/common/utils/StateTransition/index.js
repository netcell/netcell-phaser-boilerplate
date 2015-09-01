/**
 * State Transition Plugin Wrapper
 * Supports effect disabling on receiving memory warning on Cocoonjs.
 * Wrap `to` method. The arguments includes:
 * - opts - The options of game.stateTransition.configure, set to null to use the defaultTransition.
 * - The rest are in the arguments of game.state.start.
 * TODO: Make some changes to the original plugin and issue a PR
 */

var defaultTransition = require('./defaultTransition');
/**
 * Disable transition animation on
 * receiving memory warning on Cocoonjs
 */
var disableTransition = false;
if (typeof Cocoon != 'undefined' && Cocoon.on) {
	Cocoon.on('memorywarning', () => disableTransition = true);
}

export default class StateTransition extends Phaser.Plugin.StateTransition {
	to(opts, ...args) {
		if (disableTransition) {
			/** No animation */
			return this.game.state.start(...args);
		} else {
			/** Reconfigure per transition */
			this.configure(opts || defaultTransition);
			return super.to(...args);
		}
	}
}
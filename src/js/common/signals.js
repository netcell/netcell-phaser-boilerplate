/**
 * This is the global signal manager.
 * The signals here can be access on any files
 * by requiring this file.
 */

var signals = {};
export default signals;

[

].forEach(signalName => {
	signals[signalName] = new Phaser.Signal();
});
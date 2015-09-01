var setSize = require('./setSize');
/**
 * Mimic background-cover css property
 * - Fills entire page with image, no white space
 * - Scales image as needed
 * - Retains image proportions (aspect ratio)
 * - Image is centered on page
 * TODO: Move to an external repository for maintainance.
 */
export default BackgroundCover extends Phaser.Image {
	constructor(game, key, frame){
		super(
			game,
			game.world.centerX,
			game.world.centerY,
			key, frame
		);
		this.anchor.setTo(0.5, 0.5);

		var ratio = this.width / this.height;
		var width = game.height * ratio;
		var height;

		if (width - game.width > 0) {
			setSize.call(this, null, game.height);
		} else {
			setSize.call(this, game.width);
		}
	}
}
var game  = require('../common/game');
var State = require('../classes/core/State');

var StateTransition = require('../common/utils/StateTransition');
var Performance     = require('../common/utils/Performance');

class boot extends State {
	create() {
		game.stateTransition = game.plugins.add(StateTransition);
		game.performance = game.plugins.add(Performance);

		game.physics.startSystem(Phaser.Physics.ARCADE);
		/** Default configuration for Cocoonjs */
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.stage.disableVisibilityChange = true;
		this.scale.pageAlignHorizontally   = true;
		this.scale.pageAlignVertically     = true;
		this.scale.setScreenSize(true);
		this.game.scale.refresh();
		/** Number of pointers */
		this.game.input.maxPointers = 1;
		/** Start the first preloader */
		this.game.state.start('preload');
	}
}
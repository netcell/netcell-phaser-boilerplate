var game   = require('./common/game');
var states = rfolder('./states');

/* State registering. */
states.forEach( (state, key) => game.state.add(key, state) );

game.state.start('boot');
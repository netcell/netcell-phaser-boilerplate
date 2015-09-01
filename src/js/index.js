var _      = require('lodash');
var game   = require('./common/game');
var states = rfolder('./states');

/* State registering. */
_.each(states, (state, key) => game.state.add(key, state) );

game.state.start('boot');
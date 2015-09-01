var gulp        = require('gulp');
var browserSync = require('browser-sync');
var duration    = require('gulp-duration');
var uglify      = require('gulp-uglify');
var notifier    = require('node-notifier');
var notify      = require('gulp-notify');
var config      = require('./config');
var source      = require('vinyl-source-stream');

module.exports = function rebundle(bundler, dest, minify) {
	var stream = bundler.bundle()
	.on('error', function(err) {
		var message = err.toString();
		notifier.notify({
			title   : 'BUILD FAILED',
			message : message
		});
		console.error(message);
	})
	.pipe(duration('rebundle'))
	.pipe(source('game.js'));

	if (minify) stream = stream.pipe(uglify())
	stream.pipe(gulp.dest(dest))
	.pipe(notify({
		title   : 'BUILD SUCCESS',
		message : 'Javascript Rebundled.',
	}));

	if (config.USE_LIVE_RELOAD) {
		stream.pipe(browserSync.reload({stream:true}))
	}
}
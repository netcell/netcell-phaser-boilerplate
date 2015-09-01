var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify   = require('babelify');
var rebundle   = require('./rebundle');
var folder     = require('./config').folder;
/**
 * Bundle the javascript files
 * @param  {String} dest - destination for the output file
 * @param  {Boolean} sourceMap - set to true to render source maps
 * @param  {Boolean} watch - set to true to use watchify
 * @param  {Boolean} minify - set to true to minify the output
 */
function browserify(dest, sourceMap, watch, minify) {
	/** source maps setting */
	watchify.args.debug = sourceMap;
	/** Browserify bundler */
	var bundler = browserify('./src/js/index.js', watchify.args);
	/** Watchify bundler if needed */
	watch && ( bundler = watchify(bundler) );
	/** Browserify transforms */
	bundler.transform(babelify.configure({
		comments : false,
		ignore   : 'node_modules'
	}));
	/** ! Browserify transforms */
	/** Rebundle on update if watchify is used */
	watch && bundler.on('update', function(){
		rebundle(bundler, dest, minify);
	});
	/** Bundle */
	return rebundle(bundler, dest, minify);
}

gulp.task('browserify:build', function() {
	return browserify(folder.build + '/js', false, false, true);
});

gulp.task('browserify:serve', function() {
	return browserify(folder.serve + '/js', true, true, false);
});
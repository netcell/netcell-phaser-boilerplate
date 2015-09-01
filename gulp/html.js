var gulp    = require('gulp');
var useref  = require('gulp-useref');
var gulpif  = require('gulp-if');
var uglify  = require('gulp-uglify');
var folder  = require('./config').folder;
var plumber = require('gulp-plumber');

function htmlBuild(dest, minify){
	var assets = useref.assets();
	var stream = gulp.src('./src/index.html')
		.pipe(plumber()).pipe(assets);
	if (minify) stream = stream.pipe(gulpif('*.js', uglify()))
	return stream.pipe(assets.restore())
	.pipe(useref())
	.pipe(gulp.dest(dest));
}

gulp.task('html:build', function () {
	return htmlBuild(folder.build, true);
})

gulp.task('html:serve', function () {
	return htmlBuild(folder.serve);
})
var gulp      = require('gulp');
var useref    = require('gulp-useref');
var gulpif    = require('gulp-if');
var uglify    = require('gulp-uglify');
var folder    = require('./config').folder;

function htmlBuild(dest, minify){
	var stream = gulp.src('./src/index.html');
	if (minify) {
		var assets = useref.assets();
		stream = stream.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(assets.restore());
	}
	return stream.pipe(useref())
	.pipe(gulp.dest(dest));
}

gulp.task('html:build', function () {
	return htmlBuild(folder.build);
})

gulp.task('html:serve', function () {
	return htmlBuild(folder.serve);
})
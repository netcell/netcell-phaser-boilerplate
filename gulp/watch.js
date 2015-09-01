var gulp = require('gulp');

gulp.task('watch:serve', function(){
	gulp.watch([
		'./src/index.html',
		'./bower_components/**/*.*'
	], ['html:serve']);
})
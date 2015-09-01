var gulp   = require('gulp');
var clean  = require('gulp-clean');
var folder = require('./config').folder;

gulp.task('clean:build', function () {
	return gulp.src([ folder.build ], {read: false}).pipe(clean({force: true}));
});

gulp.task('clean:serve', function () {
	return gulp.src([ folder.serve ], {read: false}).pipe(clean({force: true}));
});
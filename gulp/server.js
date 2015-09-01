var gulp        = require('gulp');
var browserSync = require('browser-sync');

gulp.task('server:serve', function() {
	browserSync({
		server    : {
			baseDir: './www',
			directory: true
		},
		browser   : 'google chrome',
		open      : true
    });
});

gulp.task('server:build', function() {
	browserSync({
		server    : {
			baseDir: './dist',
			directory: true
		},
		browser   : 'google chrome',
		open      : true
    });
});
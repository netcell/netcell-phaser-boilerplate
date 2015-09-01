var gulp     = require('gulp');
var watch    = require('gulp-watch');
var fileList = require('../src/js/config/fileList');
var folder   = require('./config').folder;

gulp.task('copy:build', function(callback){
	var srcAsset  = [
		'./src/css/**/*.*',
		'./src/fonts/**/*.*'
	];
	var files = fileList.getFileList().map(function(file)
		return './src/' + file;
	});
	srcAsset.push.apply(srcAsset, files)
	return gulp.src(srcAsset, { base: './src' })
	.pipe(gulp.dest(folder.build));
});

gulp.task('copy:serve', function(callback){
	var srcAsset  = [
		'./src/css/**/*.*',
		'./src/fonts/**/*.*',
		'./src/assets/**/*.*'
	];
	return gulp.src(srcAsset, { base: './src' })
	.pipe(watch(srcAsset, { base: './src' }))
	.pipe(gulp.dest(folder.serve));
});
var gulp     = require('gulp');
var watch    = require('gulp-watch');
var fileList = require('../src/js/config/fileList');
var folder   = require('./config').folder;
var plumber  = require('gulp-plumber');

gulp.task('copy:build', function(callback){
	var srcAsset  = [
		'./src/css/**/*.*',
		'./src/fonts/**/*.*'
	];
	var files = fileList.getFileList().map(function(file){
		return './src/' + file;
	});
	srcAsset.push.apply(srcAsset, files)
	return gulp.src(srcAsset, { base: './src' })
	.pipe(gulp.dest(folder.build));
});

function copyServe(doWatch){
	var srcAsset  = [
		'./src/css/**/*.*',
		'./src/fonts/**/*.*',
		'./src/assets/**/*.*'
	];
	var stream = gulp.src(srcAsset, { base: './src' });
	if (doWatch) stream = stream.pipe(watch(srcAsset, { base: './src', ignoreInitial : true })).pipe(plumber());
	return stream.pipe(gulp.dest(folder.serve));
}

gulp.task('copy:serve', function(callback){
	return copyServe(false);
});

gulp.task('copy:watch', function(callback){
	return copyServe(true)
});
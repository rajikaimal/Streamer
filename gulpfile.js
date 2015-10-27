var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('run',function(){
	nodemon({
		  script: 'app.js'
		, ext: 'js html'
	});
});
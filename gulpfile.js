var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var babel = require('gulp-babel');
var reload = browserSync.reload;

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
})
gulp.task('babel', () => {
	return gulp.src('./js/src/**/*.js')
		.pipe(babel({
    	presets: ['es2015']
     }))
    .pipe(gulp.dest('./js'));
});
gulp.task('watch', ['browser-sync', 'babel'], () => {
	gulp.watch("*.html").on("change", reload)	
	gulp.watch(['./js/src/*.js'], ['babel']).on('change', reload)
})
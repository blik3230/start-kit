/**
 * Created by ITUA on 14.11.2016.
 */


module.exports = function (gulp, paths, serv, defaultTask) {
	defaultTask.push('font:copy');
	
	gulp.task('font:copy', function () {
		return gulp.src(paths.font.src)
			.pipe(gulp.dest(paths.font.dist))
			.pipe(serv.stream());
	})
};
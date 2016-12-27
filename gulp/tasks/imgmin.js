/**
 * Created by ITUA on 14.11.2016.
 */
const imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	through2 = require('through2').obj;

module.exports = function (gulp, paths, serv, defaultTask) {
	defaultTask.push('img:min');
	
	gulp.task('img:min', function () {
		return gulp.src(paths.imgmin.src)
			.pipe(imagemin({
				progressive: true,
				use: [pngquant()],
				interlaced: true
			}))
			.pipe(gulp.dest(paths.imgmin.dist))
			.pipe(serv.stream());
	})
};
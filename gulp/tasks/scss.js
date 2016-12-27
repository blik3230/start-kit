/**
 * Created by ITUA on 11.11.2016.
 */
const sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer');

module.exports = function (gulp, paths, serv, defaultTask) {
	defaultTask.push('scss:build');
	
	gulp.task('scss:build', function() {
		
		return gulp.src(paths.scss.src)
			.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(sourcemaps.write())
			.pipe(rename('style.css'))
			.pipe(gulp.dest(paths.scss.dist))
			.pipe(serv.stream({match: '**/*.css'}));
	});
	
};
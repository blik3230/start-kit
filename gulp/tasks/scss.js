/**
 * Created by ITUA on 11.11.2016.
 */
const sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	watch = require('gulp-watch'),
	config = {
		src: ['./src/main.scss'],
		dist: './dist/css/',
		watch: ['./src/**/*.scss', '!./src/vendors/', './src/vendors/_tools.scss']
	};

module.exports = function (gulp, serv, defaultTask) {
	defaultTask.push('scss:build');
	
	gulp.task('scss:build', function() {
		
		return gulp.src(config.src)
			.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(sourcemaps.write())
			.pipe(rename('style.css'))
			.pipe(gulp.dest(config.dist))
			.pipe(serv.stream({match: '**/*.css'}));
	});
	
	// scss
	watch(config.watch, function (file) {
		gulp.start('scss:build');
	});
};
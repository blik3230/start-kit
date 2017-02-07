/**
 * Created by ITUA on 11.11.2016.
 */
const sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	cssGlobbing = require('gulp-css-globbing'),
	watch = require('gulp-watch'),
	config = {
		src: ['./src/main.scss'],
		dist: './dist/css/',
		watch: ['./src/**/*.scss', '!./src/vendors/', './src/vendors/_tools.scss']
	};

module.exports = function (gulp, serv, defaultTask) {
	defaultTask.push('scss:build');
	
	gulp.task('scss:build', function() {
		
		// return gulp.src(config.src)
		// 	.pipe(sourcemaps.init())
		// 	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		// 	.pipe(autoprefixer())
		// 	.pipe(sourcemaps.write())
		// 	.pipe(rename('style.css'))
		// 	.pipe(gulp.dest(config.dist))
		// 	.pipe(serv.stream({match: '**/*.css'}));
		
		return gulp.src(config.src)
			.pipe(cssGlobbing({
				// Configure it to use SCSS files
				extensions: ['.scss']
			}))
			.pipe(sourcemaps.init())
			.pipe(sass({
				cache_location: './cache',
				cache: true,
				outputStyle: 'expanded',
				precision: 3,
				includePaths: ['.']
			}).on('error', sass.logError))
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
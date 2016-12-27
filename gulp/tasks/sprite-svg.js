/**
 * Created by ITUA on 14.11.2016.
 */
const spritesheet = require('gulp-svg-spritesheet'),
	svgmin = require('gulp-svgmin');

module.exports = function (gulp, paths, serv, defaultTask) {
	defaultTask.push('sprite:svg');
	
	var opts = {
		cssPathSvg: paths.spriteSvg.cssPath,
		templateSrc: paths.spriteSvg.template,
		templateDest: paths.spriteSvg.scss,
		positioning: 'packed',
		padding: 5,
		units: 'px',
		pixelBase: 16
	};
	
	gulp.task('sprite:svg', function () {
		
		return gulp.src(paths.spriteSvg.src)
			.pipe(spritesheet(opts))
			.pipe(svgmin())
			.pipe(gulp.dest(paths.spriteSvg.dist))
	});
};
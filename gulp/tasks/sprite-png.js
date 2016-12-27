/**
 * Created by ITUA on 14.11.2016.
 */
const gulpSpritesmith = require('gulp.spritesmith'),
	buffer = require('vinyl-buffer'),
	imagemin = require('gulp-imagemin');


module.exports = function (gulp, paths, serv, defaultTask) {
	defaultTask.push('sprite:png');
	
	gulp.task('sprite:png', function (done) {
		var params = {
			imgName: 'sprite.png',
			imgPath: '../images/sprites/sprite.png',
			cssName: 'sprite.scss',
			padding: 25,
			cssFormat: 'scss',
			algorithm: 'binary-tree',
			cssTemplate: paths.spritePng.template
		};
		
		var spriteData = gulp.src(paths.spritePng.src)
			.pipe(gulpSpritesmith(params));
		
		spriteData.img
			.pipe(buffer())
			.pipe(imagemin())
			.pipe(gulp.dest(paths.spritePng.dist));
		
		spriteData.css
			.pipe(gulp.dest(paths.spritePng.scss));
		
		done();
	});
};
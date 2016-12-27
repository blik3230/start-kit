/**
 * Created by ITUA on 11.11.2016.
 */
const watch = require('gulp-watch');

module.exports = function (gulp, paths, serv, defaultTask) {
	defaultTask.push('watch');
	
	gulp.task('watch', function () {
		
		// pug
		watch(paths.watch.pug, function(file) {
			global.changedTempalteFile = file.path;
			gulp.start('pug:build');
		});
		
		// html
		watch(paths.watch.html)
			.on('change', function (event) {
				console.log(`change html ${event.path}`);
				serv.reload();
			});
		
		// scss
		watch(paths.watch.scss, function (file) {
			gulp.start('scss:build');
		});
		
		// fonts
		watch(paths.watch.font, function (file) {
			gulp.start('font:copy', done);
		});
		
		// imgmin
		watch(paths.watch.imgmin, function (file) {
			gulp.start('img:min');
		});
		
		// sprite png
		watch(paths.watch.spritePng, function (file) {
			gulp.start('sprite:png');
			serv.reload();
		});
		
		// sprite svg
		watch(paths.watch.spriteSvg, function (file) {
			gulp.start('sprite:svg');
			serv.reload();
		});
	});
};

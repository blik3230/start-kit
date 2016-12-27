'use strict';

const gulp = require('gulp'),
	initPug = require('./gulp/tasks/pug'),
	initServer = require('./gulp/tasks/server'),
	initWatch = require('./gulp/tasks/watch'),
	initScss = require('./gulp/tasks/scss'),
	initWebpack = require('./gulp/tasks/webpack'),
	initFont = require('./gulp/tasks/font'),
	initImgmin = require('./gulp/tasks/imgmin'),
	initSpritePng = require('./gulp/tasks/sprite-png'),
	initSpriteSvg = require('./gulp/tasks/sprite-svg');

global.isProd = process && !! process.env.NODE_ENV;
console.log('prod ' + global.isProd);

var paths = {
	pug: {
		src: ['./src/pages/**/*.pug', './src/index.pug'],
		dist: './dist/'
	},
	scss: {
		src: ['./src/main.scss'],
		dist: './dist/css/'
	},
	font: {
		src: './src/statics/fonts/**/*',
		dist: './dist/fonts/'
	},
	imgmin: {
		src: './src/statics/images/**/*',
		dist: 'dist/images/'
	},
	spritePng: {
		src: 'src/statics/for_sprite_png/*.*',
		dist: 'dist/images/sprites/',
		scss: 'src/utils/scss/mixins/',
		template: 'gulp/templates/scss.sprite.mustache'
	},
	spriteSvg: {
		src: 'src/statics/for_sprite_svg/*.svg',
		dist: 'dist/images/sprites/sprite.svg',
		scss: 'src/utils/scss/mixins/sprite_svg.scss',
		cssPath: '../images/sprites/sprite.svg',
		template: 'gulp/templates/scss.svg-sprite.mustache',
	},
	watch: {
		pug: ['./src/**/*.pug'],
		scss: ['./src/**/*.scss'],
		html: ['./dist/*.html'],
		css: ['./dist/css/**/*.css'],
		font: ['./src/statics/fonts/**/*'],
		imgmin: ['./src/statics/images/**/*'],
		spritePng: ['src/statics/for_sprite_png/*'],
		spriteSvg: ['src/statics/for_sprite_svg/*']
	}
};

let defaultTask = [];

const serv = initServer(gulp, defaultTask);

initPug(gulp, paths, defaultTask);

initScss(gulp, paths, serv, defaultTask);

initFont(gulp, paths, serv, defaultTask);

initImgmin(gulp, paths, serv, defaultTask);

initSpritePng(gulp, paths, serv, defaultTask);

initSpriteSvg(gulp, paths, serv, defaultTask);

if(!global.isProd) {
	initWatch(gulp, paths, serv, defaultTask);
}

initWebpack(gulp, paths, serv, defaultTask);


console.log(defaultTask);

gulp.task('default', defaultTask);

gulp.task('deploy', ['prod'], function() {
	//todo: do it
});

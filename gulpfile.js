'use strict';

const gulp = require('gulp'),
	initPug = require('./gulp/tasks/pug'),
	initServer = require('./gulp/tasks/server'),
	initScss = require('./gulp/tasks/scss'),
	initVendorsScss = require('./gulp/tasks/vendors-scss'),
	initWebpack = require('./gulp/tasks/webpack'),
	initFont = require('./gulp/tasks/font'),
	initImgmin = require('./gulp/tasks/imgmin'),
	initSpritePng = require('./gulp/tasks/sprite-png'),
	initSpriteSvg = require('./gulp/tasks/sprite-svg');

global.isProd = process && !! process.env.NODE_ENV;
console.log('prod ' + global.isProd);

let defaultTask = [];

const serv = initServer(gulp, defaultTask);

initPug(gulp, serv, defaultTask);

initVendorsScss(gulp, serv, defaultTask);

initScss(gulp, serv, defaultTask);

initFont(gulp, serv, defaultTask);

initImgmin(gulp, serv, defaultTask);

initSpritePng(gulp, serv, defaultTask);

initSpriteSvg(gulp, serv, defaultTask);

initWebpack(gulp, serv, defaultTask);

console.log(defaultTask);

gulp.task('default', defaultTask);

gulp.task('deploy', ['prod'], function() {
	//todo: do it
});

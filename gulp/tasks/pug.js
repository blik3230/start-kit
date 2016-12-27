/**
 * Created by ITUA on 10.11.2016.
 */

const pug = require('gulp-pug'),
	through2 = require('through2').obj,
	// pugInheritance = require('yellfy-pug-inheritance'),
	// gulpif = require('gulp-if'),
	// filter = require('gulp-filter'),
	fs = require('fs'),
	path = require('path');

var tree = {};

function updateTree(filepath) {
	
	tree[filepath] = getFileDependencies(filepath);
}

function getFileContent(filepath) {
	
	try {
		return fs.readFileSync(filepath).toString();
	} catch (err) {
		return false;
	}
}

function getFileDependencies(filepath) {
	var dependencies = [];
	var skip = -1;
	var content = getFileContent(filepath);
	
		
	if(!content) throw new Error('ошибка подключения файла ' + filepath);
	
	content.split('\n').forEach((line) => {
		const comment = /\/\//.exec(line);
		if (comment) {
			skip = comment.index;
			return;
		}
		const whiteSpaces = /^\s*/.exec(line);
		if (whiteSpaces[0].length <= skip || /^\S/.test(line)) {
			skip = -1;
		}
		const keyword = /(?:^\s*)(?:include|extends)(\b.*\b)(?:\.pug|\s*$)/g.exec(line);
		
		if (keyword && skip === -1) {
			var dir = path.dirname(filepath),
				dependence = (keyword[1]).trim(),
				dependencePath = path.join(dir, dependence).replace(/\.pug\s*/, '') + '.pug';
			
			//console.log('---+ ' + dependencePath + ' ----')
			dependencies.push(dependencePath);
			
			getFileDependencies(dependencePath).forEach((p) => {
				// todo: проверять может зависимость уже есть
				dependencies.push(p);
			});
			//dependencies.concat()
		}
	});
	
	return dependencies;
}
	

module.exports = function(gulp, paths, defaultTask) {
	defaultTask.push('pug:build');
	
	gulp.task('pug:build', function () {
		
		return gulp.src(paths.pug.src)
			.pipe(through2(function (file, enc, callback) {
				var filepath = file.base + file.relative;
				var dependencies = tree[filepath];
				
				if (!dependencies ||
					filepath == global.changedTempalteFile ||
					(tree[filepath] && tree[filepath].indexOf(global.changedTempalteFile) != -1)) {
					
					updateTree(filepath);
					console.log('---to pug--- ' + filepath);
					callback(null, file);
					
				} else {
					console.log('---not changed--- ' + filepath);
					callback();
				}
				
				/*tree[filepath].forEach((p)=>{
				 console.log(p);
			 	});*/
				
				return;
			}))
			.pipe(pug({
				pretty: '\t'
			}).on('error', function (e) {
				console.error(e.message);
				this.end();
			}))
			.pipe(gulp.dest(paths.pug.dist));
	});
};
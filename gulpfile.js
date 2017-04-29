'use strict';

const autoprefixer = require('gulp-autoprefixer');
const babel   = require('gulp-babel');
const concat  = require('gulp-concat');
const connect = require('gulp-connect');
const gulp    = require('gulp');
const path    = require('path');
const rename  = require('gulp-rename');
const sass    = require('gulp-sass');
const Server  = require('karma').Server;
const uglify  = require('gulp-uglify');

gulp.task('test', () => {
	new Server({
		configFile: __dirname + '/karma.conf.js',		
	}).start();
});

gulp.task('connect', () => {
    connect.server({
		root: 'dist',
		livereload: true
	})
});

gulp.task('js', () =>
	gulp.src(['./public/javascripts/*.js'])
		.pipe(babel({
            presets: ['latest']
        }))
		.pipe(concat('main.js'))
		.pipe(uglify())    
		.pipe(gulp.dest('dist/js'))
		.pipe(connect.reload())
);

gulp.task('sass', () =>
    gulp.src('./public/stylesheets/*.scss')
		.pipe(autoprefixer())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename('style.css'))
        .pipe(gulp.dest('./dist/css'))
		.pipe(connect.reload())
);

gulp.task('html', () =>
	gulp.src('./public/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload())
);

gulp.task('json', () =>
	gulp.src('./public/fazenda.json')
		.pipe(gulp.dest('dist/data'))
		.pipe(connect.reload())
);

gulp.task('assets', () =>
	gulp.src('./public/assets/*.*')
		.pipe(gulp.dest('dist/assets'))
		.pipe(connect.reload())
)

gulp.task('watch', () => {
    gulp.watch(['public/*.html'], ['html']);
	gulp.watch(['public/stylesheets/*.scss'], ['sass']);
	gulp.watch(['public/javascripts/*.js'], ['js']);
	gulp.watch(['public/*.json'], ['json']);
	gulp.watch(['public/assets/*.*'], ['assets']);
});

gulp.task('default', ['js', 'html', 'sass', 'json', 'assets', 'connect', 'watch']);

gulp.task('build', ['js', 'html', 'sass', 'json', 'assets']);
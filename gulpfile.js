// jshint node:true
"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var modernizr = require('gulp-modernizr');
var uglify = require('gulp-uglify');


//sass to css, add prefixes and convert to css.min
gulp.task('sass', function() {
    return gulp.src('./assets/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        // .pipe(rename({suffix: '.min'}))
        // .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./_dist/assets/css'))
        .pipe(connect.reload());
});


//watch for changes in assets/ .sass files
gulp.task('sass:watch', function() {
    gulp.watch(['./assets/sass/**/*.sass'], ['sass']);
});


//reload browser if any changes in .html files
gulp.task('html', function () {
    return gulp.src('./_dist/*.html')
        .pipe(connect.reload());
});


//watch for changes in assets/ .html files
gulp.task('html:watch', function () {
    gulp.watch(['./_dist/*.html'], ['html']);
});


//task for running the server
gulp.task('connect', function() {
    connect.server({
        root: './_dist',
        livereload: true
    });
});


//takes .js files add modernizr and uglifies them to dist and reload
gulp.task('js', function() {
    return gulp.src('./assets/js/**/*.js')
        // .pipe(modernizr())
        .pipe(uglify())
        .pipe(gulp.dest("./_dist/assets/js"))
        .pipe(connect.reload());
});


//watch for changes in assets/ .js files
gulp.task('js:watch', function() {
    gulp.watch(['./assets/**/*.js'], ['js']);
});


//take from node_modules whats needed to _dist folder in order to be served
gulp.task('copymodules', function () {
    //js
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.*')
        .pipe(gulp.dest('_dist/assets/js/bootstrap/js'));
    //jquery
    gulp.src('node_modules/jquery/dist/jquery.*')
        .pipe(gulp.dest('_dist/assets/js/jquery/'));
    //tether
    gulp.src('node_modules/tether/dist/js/tether.*')
        .pipe(gulp.dest('_dist/assets/js/tether/'));
});


//group all watch tasks in one
gulp.task('watch', ['sass:watch', 'html:watch', 'js:watch']);


gulp.task('default', ['copymodules', 'js', 'sass', 'connect', 'watch']);
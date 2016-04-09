var gulp      = require('gulp');
// var minifycss = require('gulp-minify-css');
var cleanCSS = require('gulp-clean-css');
var size      = require('gulp-size');
var config    = require('../../config').optimize.css;

/**
 * Copy and minimize CSS files
 */
gulp.task('optimize:css', function() {
  return gulp.src(config.src)
    .pipe(cleanCSS(config.options))
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});

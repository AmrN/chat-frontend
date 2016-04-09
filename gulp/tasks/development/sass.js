var gulp         = require("gulp");
var browsersync  = require("browser-sync");
var sass         = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var config       = require('../../config');
var inlineBase64 = require('gulp-inline-base64');
var sassGlob = require('gulp-sass-glob');

gulp.task("sass", function() {
  browsersync.notify("Compiling Sass");

  return gulp.src(config.sass.src)
   .pipe(sassGlob())
   .pipe(sourcemaps.init())
   .pipe(sass(config.sass.options).on('error', sass.logError))
   .pipe(inlineBase64(config.inlineBase64))
   .pipe(autoprefixer(config.autoprefixer))
   .pipe(sourcemaps.write())
   .pipe(gulp.dest(config.sass.dest));
});

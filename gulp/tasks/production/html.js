var gulp = require("gulp");
var config = require("../../config.js").html.production;
var browsersync  = require("browser-sync");

gulp.task("html:production", function() {
  browsersync.notify("HTML Modified");
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});

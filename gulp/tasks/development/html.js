var gulp = require("gulp");
var config = require("../../config.js").html.development;
var browsersync  = require("browser-sync");

gulp.task("html", function() {
  browsersync.notify("HTML Modified");
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});

var gulp = require("gulp");
var runSequence = require("run-sequence");

gulp.task("build:production", function(callback) {
  return runSequence(
    [
      "delete", "delete:production"
    ],
    [
      'sass',
      'scripts',
      'images',
      'copy:fonts'
    ],
    [
      'optimize:css',
      'optimize:js',
      'optimize:images',
      'copy:fonts:production'
    ],
    'html:production',
    'revision',
    'rev:collect',
    callback
   );
});

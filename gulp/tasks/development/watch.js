var gulp   = require('gulp');
var browsersync = require("browser-sync");
var config = require('../../config').watch;
var runSequence = require("run-sequence");

// for watchify
global.isWatching = true;

function browsersyncCallback(arg) {
  return function() {
    if (arg) {
      browsersync.reload(arg);
    }
    else {
      browsersync.reload();
    }
  }
}

function runAndReload(tasksArr, reloadArg) {
  tasksArr.push(browsersyncCallback(reloadArg));
  runSequence(...tasksArr);
}

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch', ['browsersync'], function(callback) {
  // gulp.watch(config.jekyll,  ['jekyll-rebuild']);
  gulp.watch(config.html,    function() { runAndReload(['html'], "index.html") });
  gulp.watch(config.sass,    function() { runAndReload(['sass'], "assets/css/main.css") });
  // gulp.watch(config.scripts, function() { runAndReload(['scripts', 'jshint']) });
  gulp.watch(config.images,  function() { runAndReload(['images']) });
  gulp.watch(config.svg,     function() { runAndReload(['copy:fonts']) });
  // gulp.watch(config.sprites, ['sprites']);
});

var gulp = require("gulp");
var del = require("del");
var config = require("../../config").delete.production;

gulp.task("delete:production", function() {
  return del(config.src);
});

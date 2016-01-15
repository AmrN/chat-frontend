var gulp = require("gulp");
var del = require("del");
var config = require("../../config").delete.development;

gulp.task("delete", function() {
  return del(config.src);
});

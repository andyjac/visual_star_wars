var gulp = require('gulp');
var eslint = require('gulp-eslint');
var paths = require('./paths');
var helpers = require('../lib/helpers');

gulp.task('lint:server', function() {
  return lint(paths.server);
});

gulp.task('lint:gulp', function() {
  return lint(paths.gulp);
});

gulp.task('lint:lib', function() {
  return lint(paths.lib);
});

gulp.task('lint:test', function() {
  var testPaths = helpers.joinPaths(paths.test);

  return lint(testPaths);
});

function lint(paths) {
  return gulp.src(paths)
    .pipe(eslint())
    .pipe(eslint.format());
}

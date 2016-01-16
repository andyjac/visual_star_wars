var gulp = require('gulp');
var runSequence = require('run-sequence');

require('./gulp/lint');
require('./gulp/nodemon');
require('./gulp/watch');
require('./gulp/test');

gulp.task('start', function(cb) {
  runSequence(
    'lint:server',
    'nodemon',
    cb
  );
});

gulp.task('watch', function(cb) {
  runSequence([
    'watch:server',
    'watch:gulp',
    'watch:lib'
  ], cb);
});

gulp.task('lint', function(cb) {
  runSequence([
    'lint:server',
    'lint:gulp',
    'lint:lib'
  ], cb);
});

gulp.task('test', function(cb) {
  runSequence([
    'test:lib',
    'test:server'
  ], cb);
});

gulp.task('default', function(cb) {
  runSequence(
    'lint',
    'watch',
  cb);
});

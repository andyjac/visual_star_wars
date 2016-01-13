var gulp = require('gulp');
var runSequence = require('run-sequence');

require('./gulp/lint');
require('./gulp/nodemon');
require('./gulp/watch');
require('./gulp/build');

gulp.task('start', function(cb) {
  runSequence(
    'lint:server',
    'nodemon',
    cb
  );
});

gulp.task('watch', function(cb) {
  runSequence(
    [
      'watch:server',
      'watch:gulp'
    ],
    cb
  );
});

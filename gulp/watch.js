var gulp = require('gulp');
var paths = require('./paths');
var runSequence = require('run-sequence');

require('./lint');
require('./test');

gulp.task('watch:server', function() {
  gulp.watch(paths.server, ['lint:server']);
});

gulp.task('watch:gulp', function() {
  gulp.watch(paths.gulp, ['lint:gulp']);
});

gulp.task('watch:lib', function() {
  gulp.watch(paths.lib, function() {
    runSequence(
      'lint:lib',
      'test:lib'
    );
  });
});

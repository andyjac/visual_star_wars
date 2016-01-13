var gulp = require('gulp');
var paths = require('./paths');

require('./lint');

gulp.task('watch:server', function() {
  gulp.watch(paths.server, ['lint:server']);
});

gulp.task('watch:gulp', function() {
  gulp.watch(paths.gulp, ['lint:gulp']);
});

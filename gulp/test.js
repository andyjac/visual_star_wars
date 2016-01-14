var gulp = require('gulp');
var mocha = require('gulp-mocha');
var paths = require('./paths');

require('./lint');

gulp.task('test:lib', ['lint:lib'], function() {
  return gulp.src(paths.test.lib)
    .pipe(mocha())
    .once('error', function(err) {
      console.log(err);
      process.exit(1);
    });
});

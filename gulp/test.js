var gulp = require('gulp');
var mocha = require('gulp-mocha');
var paths = require('./paths');

require('./lint');

gulp.task('test:lib', ['lint:lib'], function() {
  return test(paths.test.lib);
});

gulp.task('test:server', ['lint:server'], function() {
  return test(paths.test.server);
});

function test(paths) {
  process.env.NODE_ENV = 'test';

  return gulp.src(paths)
    .pipe(mocha())
    .once('error', function(){
      process.exit(1);
    })
    .once('done', function() {
      process.exit(0);
    });
}

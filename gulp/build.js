var gulp = require('gulp');
var helpers = require('../lib/helpers');
var buildDb = require('../lib/build_db_from_scratch');

gulp.task('build:db', function(done) {
  buildDb(function(err) {
    if (err) {
      done();
      return helpers.handleProcessError(err);
    }

    done();
    process.exit(0);
  });
});

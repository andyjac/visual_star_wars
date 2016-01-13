var gulp = require('gulp');
var eslint = require('gulp-eslint');
var paths = require('./paths');

gulp.task('lint:server', function() {
  return gulp.src(paths.server)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:gulp', function() {
  return gulp.src(paths.gulp)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:lib', function() {
  return gulp.src(paths.lib)
    .pipe(eslint())
    .pipe(eslint.format());
});

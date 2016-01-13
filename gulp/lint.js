var gulp = require('gulp');
var eslint = require('gulp-eslint');

var serverPaths = [
  './app.js',
  './models/**/*.js',
  './controllers/**/*.js',
  './lib/**/*.js'
];

gulp.task('lint:server', function() {
  return gulp.src(serverPaths)
    .pipe(eslint())
    .pipe(eslint.format());
});

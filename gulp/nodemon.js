var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var ignored = [
  'public/',
  'gulpfile.js',
  'gulp/',
  'tests/'
];

gulp.task('nodemon', function() {
  return nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: ignored
  }).on('restart', function() {
    console.log('server restarting...');
  });
});

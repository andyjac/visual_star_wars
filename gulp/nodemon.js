var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var paths = require('./paths');

gulp.task('nodemon', function() {
  return nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: ['public/', 'gulpfile.js', 'gulp/']
  }).on('restart', function() {
    console.log('server restarting...');
  });
});

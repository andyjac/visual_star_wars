var gulp = require('gulp');

require('./gulp/lint');

gulp.task('default', ['lint:server']);

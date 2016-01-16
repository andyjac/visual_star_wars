module.exports = {
  server: [
    './app.js',
    './models/**/*.js',
    './controllers/**/*.js'
  ],
  gulp: [
    './gulpfile.js',
    './gulp/**/**'
  ],
  lib: ['./lib/**/*.js'],
  test: {
    lib: ['./tests/lib/**/*test.js'],
    server: ['./tests/server/**/*test.js']
  }
};

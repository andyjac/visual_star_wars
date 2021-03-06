var mocha = require('mocha');
var sequelize = require('../../../models').sequelize;

require('../../../app');

describe('api tests', function() {
  after(function(done) {
    sequelize.sync({
      force: true
    }).finally(function() {
      done();
    });
  });

  require('./root');
  require('./films');
  require('./people');
  require('./planets');
  require('./species');
  require('./starships');
  require('./vehicles');
});

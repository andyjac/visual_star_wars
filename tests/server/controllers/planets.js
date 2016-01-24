var mocha = require('mocha');
var chai = require('chai');
var Planet = require('../../../models').Planet;
var _ = require('lodash');
var saveModel = require('../../test_helpers').saveModel;
var expect = chai.expect;

chai.use(require('chai-http'));

describe('planet controller', function() {
  var planetSpec = {
    climate: 'dry',
    diameter: 12000,
    gravity: 'standard 1',
    id: 1,
    name: 'Buttz',
    orbitalPeriod: 365,
    population: 1000000000,
    rotationPeriod: 24,
    surfaceWater: 40,
    terrain: 'desert',
    url: 'http://www.domain.com/path/to/planet/1'
  };

  before(function(done) {
    saveModel(Planet, planetSpec, function(err) {
      if (err) {
        return done();
      }

      done();
    });
  });

  it('should return an array of planets', function(done) {
    chai.request('localhost:3000')
      .get('/api/planets')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(_.isArray(res.body)).to.eql(true);
        expect(res.body[0].id).to.eql(1);
        done();
      });
  });

  it('should get a planet by id', function(done) {
    chai.request('localhost:3000')
      .get('/api/planets/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.planet.id).to.eql(1);
        expect(res.body.planet.name).to.eql('Buttz');
        expect(res.body).to.have.property('residents');
        expect(res.body).to.have.property('films');
        done();
      });
  });
});

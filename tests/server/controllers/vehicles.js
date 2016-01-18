var mocha = require('mocha');
var chai = require('chai');
var Vehicle = require('../../../models').Vehicle;
var _ = require('lodash');
var saveModel = require('../../test_helpers').saveModel;
var expect = chai.expect;

chai.use(require('chai-http'));

describe('vehicle controller', function() {
  var starshipSpec = {
    cargoCapacity: 50,
    consumables: '0',
    costInCredits: 14500,
    crew: 1,
    id: 1,
    length: 10.4,
    manufacturer: "Incom Corporation",
    maxAtmospheringSpeed: 1200,
    model: "T-16 skyhopper",
    name: "T-16 skyhopper",
    passengers: 1,
    vehicleClass: 'repulsorcraft',
    url: 'http://www.domain.com/path/to/vehicles/1'
  };

  before(function(done) {
    saveModel(Vehicle, starshipSpec, function(err) {
      if (err) {
        return done();
      }

      done();
    });
  });

  it('should return an array of vehicles', function(done) {
    chai.request('localhost:3000')
      .get('/api/vehicles')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(_.isArray(res.body)).to.eql(true);
        expect(res.body[0].id).to.eql(1);
        done();
      });
  });

  it('should get a vehicle by id', function(done) {
    chai.request('localhost:3000')
      .get('/api/vehicles/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.id).to.eql(1);
        expect(res.body.manufacturer).to.eql('Incom Corporation');
        done();
      });
  });
});

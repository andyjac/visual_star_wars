var mocha = require('mocha');
var chai = require('chai');
var Starship = require('../../../models').Starship;
var _ = require('lodash');
var saveModel = require('../../test_helpers').saveModel;
var expect = chai.expect;

chai.use(require('chai-http'));

describe('starship controller', function() {
  var starshipSpec = {
    cargoCapacity: 10000,
    consumables: '2 months',
    costInCredits: 100000,
    crew: 4,
    hyperdriveRating: 0.5,
    id: 1,
    length: 34.37,
    manufacturer: "Corellian Engineering Corporation",
    maxAtmospheringSpeed: 1050,
    MGLT: 75,
    model: "YT-1300 light freighter",
    name: "Millennium Falcon",
    passengers: 6,
    starshipClass: 'Light freighter',
    url: 'http://www.domain.com/path/to/starships/1'
  };

  before(function(done) {
    saveModel(Starship, starshipSpec, function(err) {
      if (err) {
        return done();
      }

      done();
    });
  });

  it('should return an array of starships', function(done) {
    chai.request('localhost:3000')
      .get('/api/starships')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(_.isArray(res.body)).to.eql(true);
        expect(res.body[0].id).to.eql(1);
        done();
      });
  });

  it('should get a starship by id', function(done) {
    chai.request('localhost:3000')
      .get('/api/starships/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.id).to.eql(1);
        expect(res.body.model).to.eql('YT-1300 light freighter');
        done();
      });
  });
});

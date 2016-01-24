var mocha = require('mocha');
var chai = require('chai');
var Species = require('../../../models').Species;
var _ = require('lodash');
var saveModel = require('../../test_helpers').saveModel;
var expect = chai.expect;

chai.use(require('chai-http'));

describe('species controller', function() {
  var speciesSpec = {
    averageHeight: 180,
    averageLifespan: 120,
    classification: 'mammal',
    designation: 'sentient',
    eyeColors: 'brown, blue, hazel',
    hairColors: 'brown, blonde, red',
    id: 1,
    language: 'Galactic Basic',
    name: 'Human',
    skinColors: 'caucasian, black, asian, hispanic',
    url: 'http://www.domain.com/path/to/species/1'
  };

  before(function(done) {
    saveModel(Species, speciesSpec, function(err) {
      if (err) {
        return done();
      }

      done();
    });
  });

  it('should return an array of species', function(done) {
    chai.request('localhost:3000')
      .get('/api/species')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(_.isArray(res.body)).to.eql(true);
        expect(res.body[0].id).to.eql(1);
        done();
      });
  });

  it('should get a species by id', function(done) {
    chai.request('localhost:3000')
      .get('/api/species/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.species.id).to.eql(1);
        expect(res.body.species.name).to.eql('Human');
        expect(res.body).to.have.property('films');
        expect(res.body).to.have.property('people');
        expect(res.body).to.have.property('homeworld');
        done();
      });
  });
});

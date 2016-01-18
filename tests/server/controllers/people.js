var mocha = require('mocha');
var chai = require('chai');
var Person = require('../../../models').Person;
var _ = require('lodash');
var saveModel = require('../../test_helpers').saveModel;
var expect = chai.expect;

chai.use(require('chai-http'));

describe('person controller', function() {
  var personSpec = {
    birthYear: '1990',
    eyeColor: 'green',
    gender: 'male',
    hairColor: 'brown',
    height: '130',
    id: 1,
    name: 'Andrew',
    mass: '145',
    skinColor: 'white',
    url: 'http://www.domain.com/path/to/person/1'
  };

  before(function(done) {
    saveModel(Person, personSpec, function(err) {
      if (err) {
        return done();
      }

      done();
    });
  });

  it('should return an array of people', function(done) {
    chai.request('localhost:3000')
      .get('/api/people')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(_.isArray(res.body)).to.eql(true);
        expect(res.body[0].id).to.eql(1);
        done();
      });
  });

  it('should get a person by id', function(done) {
    chai.request('localhost:3000')
      .get('/api/people/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.id).to.eql(1);
        expect(res.body.birthYear).to.eql('1990');
        done();
      });
  });
});

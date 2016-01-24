var mocha = require('mocha');
var chai = require('chai');
var Film = require('../../../models').Film;
var _ = require('lodash');
var saveModel = require('../../test_helpers').saveModel;
var expect = chai.expect;

chai.use(require('chai-http'));

describe('film controller', function() {
  var filmSpec = {
    director: 'George Foobaz',
    episodeId: '4',
    id: 1,
    openingCrawl: 'Along time ago...',
    producer: 'Chewbacca',
    releaseDate: '5/25/1977',
    title: 'A New Buttz',
    url: 'http://www.domain.com/path/to/film/1'
  };

  before(function(done) {
    saveModel(Film, filmSpec, function(err) {
      if (err) {
        return done();
      }

      done();
    });
  });

  it('should return an array of films', function(done) {
    chai.request('localhost:3000')
      .get('/api/films')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(_.isArray(res.body)).to.eql(true);
        expect(res.body[0].id).to.eql(1);
        done();
      });
  });

  it('should get a film by id', function(done) {
    chai.request('localhost:3000')
      .get('/api/films/1')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.film.id).to.eql(1);
        expect(res.body.film.director).to.eql('George Foobaz');
        expect(res.body).to.have.property('characters');
        expect(res.body).to.have.property('planets');
        expect(res.body).to.have.property('species');
        expect(res.body).to.have.property('starships');
        expect(res.body).to.have.property('vehicles');
        done();
      });
  });
});

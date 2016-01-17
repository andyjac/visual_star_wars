var mocha = require('mocha');
var chai = require('chai');
var models = require('../../../models');
var _ = require('lodash');
var expect = chai.expect;

chai.use(require('chai-http'));

require('../../../app');

describe('film controller', function() {
  var filmSpec = {
    director: 'George Foobaz',
    episodeId: '4',
    id: 1,
    openingCrawl: 'Along time ago...',
    producer: 'Chewbacca',
    releaseDate: '5/25/1977',
    title: 'A New Buttz',
    url: 'http://www.domain.com/path/to/film'
  };

  before(function(done) {
    models.Film.sync({
      force: true
    }).then(function(film) {
      return film.create(filmSpec);
    }).then(function(result) {
      done();
      return null;
    }).error(function(err) {
      console.log(err);
      done();
      return null;
    });
  });

  after(function() {
    models.sequelize.sync({ force: true });
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
        expect(res.body.id).to.eql(1);
        expect(res.body.director).to.eql('George Foobaz');
        done();
      });
  });
});

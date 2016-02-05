var _ = require('lodash');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

chai.use(require('chai-http'));

describe('root controller', function() {
  it('should return an object of arrays by model', function(done) {
    chai.request('localhost:3000')
      .get('/api')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(_.isObject(res.body)).to.eql(true)
        expect(_.isArray(res.body.films)).to.eql(true);
        expect(_.isArray(res.body.people)).to.eql(true);
        expect(_.isArray(res.body.planets)).to.eql(true);
        expect(_.isArray(res.body.species)).to.eql(true);
        expect(_.isArray(res.body.starships)).to.eql(true);
        expect(_.isArray(res.body.vehicles)).to.eql(true);
        done();
      });
  });
});

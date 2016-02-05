var mocha = require('mocha');
var expect = require('chai').expect;
var helpers = require('../../lib/helpers');
var models = require('../../models');
var _ = require('lodash');

describe('helper functions', function() {
  it('should pluck an id from the end of a url', function() {
    var url = 'http://www.some-address.org/api/buttz/1/';
    var id1 = helpers.fetchIdFromUrl(url);
    var id2 = helpers.fetchIdFromUrl('');

    expect(id1).to.not.eql(null);
    expect(id1).to.eql(1);
    expect(id2).to.eql(null);
  });

  it('should remove non-numeric characters', function() {
    var value1 = helpers.formatNumber('1,000');
    var value2 = helpers.formatNumber('12,000km');
    var value3 = helpers.formatNumber('$1.00');
    var value4 = helpers.formatNumber('<>+=-=5@*_)$fccizcl');

    expect(value1).to.eql(1000);
    expect(value2).to.eql(12000);
    expect(value3).to.eql(1.00);
    expect(value4).to.eql(5);
  });

  it('should join multiple arrays of paths', function() {
    var paths = {
      1: ['./path/to/1', './path/to/2'],
      2: ['./path/to/3', './path/to/4'],
      3: ['./path/to/4', './path/to/5']
    };

    var joined = helpers.joinPaths(paths);

    expect(_.isArray(joined)).to.eql(true);
    expect(joined.length).to.eql(6);
  });

  it('should create a spec map based on an array of fields', function() {
    var fields = ['title', 'id', 'releaseDate', 'openingCrawl'];
    var specMap = helpers.createSpecMap(fields);

    expect(specMap).to.have.property('title');
    expect(specMap).to.have.property('id');
    expect(specMap).to.have.property('releaseDate');
    expect(specMap).to.have.property('openingCrawl');
    expect(specMap.releaseDate).to.eql('release_date');
    expect(specMap.openingCrawl).to.eql('opening_crawl');
  });

  it('should create a spec function based on a given spec map', function() {
    var item = { 'title': 'foo', 'id': 1, 'release_date': '5/25/1977' };
    var specMap = {
      'title': 'title',
      'id': 'id',
      'releaseDate': 'release_date'
    };

    var specFn = helpers.createSpecFn(specMap);
    var spec = specFn(item);

    expect(typeof specFn).to.eql('function');
    expect(spec.title).to.eql('foo');
    expect(spec.id).to.eql(1);
    expect(spec.releaseDate).to.eql('5/25/1977');
  });

  it('should get an array of attributes for a given model', function(done) {
    helpers.getModelAttributes(models.Film, function(err, attrs) {
      if (err) {
        console.log(err);
        return done();
      }

      expect(_.isArray(attrs)).to.eql(true);
      expect(attrs.indexOf('createdAt')).to.eql(-1);
      expect(attrs.indexOf('updatedAt')).to.eql(-1);
      done();
    });
  });
});

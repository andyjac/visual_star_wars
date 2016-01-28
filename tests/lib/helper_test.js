var mocha = require('mocha');
var expect = require('chai').expect;
var helpers = require('../../lib/helpers');
var models = require('../../models');
var _ = require('lodash');

describe('helper functions', function() {
  it('should create a collection of specs', function() {
    var input = [
      {id: 1, uneeded_value: 'buttz', something_else: 42 },
      {id: 2, uneeded_value: 'flub', something_else: 'fizz' },
      {id: 3, uneeded_value: 'ballz', something_else: 'bang' }
    ];

    var specMap = { 'id': 'id', 'somethingElse': 'something_else' };

    var specs = helpers.createSpecs(input, function(item) {
      return _.reduce(specMap, function(spec, value, key) {
        if (item[value]) {
          spec[key] = item[value];
        }

        return spec;
      }, {});
    });

    expect(specs.length).to.eql(3);
    expect(specs[0].id).to.eql(1);
    expect(specs[1].somethingElse).to.eql('fizz');
    expect(specs[2].uneededValue).to.eql(undefined);
  });

  it('should pluck an id from a url', function() {
    var url = 'http://www.some-address.org/api/buttz/1/';
    var id1 = helpers.fetchIdFromUrl(url);
    var id2 = helpers.fetchIdFromUrl('');

    expect(id1).to.not.eql(null);
    expect(id1).to.eql(1);
    expect(id2).to.eql(null);
  });

  it('should remove non-numeric characters', function() {
    var value1 = helpers.sanitizeNum('1,000');
    var value2 = helpers.sanitizeNum('12,000km');
    var value3 = helpers.sanitizeNum('$1.00');
    var value4 = helpers.sanitizeNum('<>+=-=5@*_)$fccizcl');

    expect(value1).to.eql('1000');
    expect(value2).to.eql('12000');
    expect(value3).to.eql('1.00');
    expect(value4).to.eql('5');
  });

  it('should join multiple path arrays', function() {
    var paths = {
      1: ['./path/to/1', './path/to/2'],
      2: ['./path/to/3', './path/to/4'],
      3: ['./path/to/4', './path/to/5']
    };

    var joined = helpers.joinPaths(paths);

    expect(_.isArray(joined)).to.eql(true);
    expect(joined.length).to.eql(6);
  });

  it('should create a spec map', function() {
    var fields = ['title', 'id', 'releaseDate', 'openingCrawl'];
    var specMap = helpers.createSpecMap(fields);

    expect(specMap.releaseDate).to.eql('release_date');
    expect(specMap.openingCrawl).to.eql('opening_crawl');
  });

  it('should create a spec builder function', function() {
    var item = { 'title': 'foo', 'id': 1, 'release_date': '5/25/1977' };
    var specMap = {
      'title': 'title',
      'id': 'id',
      'releaseDate': 'release_date'
    };

    var specBuilderFn = helpers.createSpecBuilderFn(specMap);
    var spec = specBuilderFn(item);

    expect(spec.title).to.eql('foo');
    expect(spec.id).to.eql(1);
    expect(spec.releaseDate).to.eql('5/25/1977');
  });

  it('should get the attributes of a model', function(done) {
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

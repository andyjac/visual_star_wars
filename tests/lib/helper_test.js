var mocha = require('mocha');
var expect = require('chai').expect;
var helpers = require('../../lib/helpers');

describe('helper functions', function() {
  it('should create a collection of specs', function() {
    var input = [
      {id: 1, name: 'foo', uneededValue: 'buttz'},
      {id: 2, name: 'baz', uneededValue: 'flub'},
      {id: 3, name: 'bar', uneededValue: 'ballz'}
    ];

    var specs = helpers.createSpecs(input, function(item) {
      return {
        id: item.id,
        name: item.name
      };
    });

    expect(specs.length).to.eql(3);
    expect(specs[0].id).to.eql(1);
    expect(specs[1].name).to.eql('baz');
    expect(specs[2].uneededValue).to.eql(undefined);
  });

  it('should pluck an id from a url', function() {
    var url = 'http://www.some-address.org/api/buttz/1/';
    var id1 = helpers.fetchIdFromUrl(url);
    var id2 = helpers.fetchIdFromUrl('');

    expect(id1).to.not.eql(null);
    expect(id1).to.eql('1');
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
});

var mocha = require('mocha');
var expect = require('chai').expect;
var formatData = require('../../lib/format_data');

describe('format data test', function() {
  before(function(done) {
    var input = {
      films: [{
        title: "The Empire Strikes Back",
        episode_id: 5,
        opening_crawl: 'It is a dark time for the Rebellion...',
        director: 'Irvin Kershner',
        url: 'http://swapi.co/api/films/2/',
        characters: [
          'http://swapi.co/api/people/1/',
          'http://swapi.co/api/people/2/',
          'http://swapi.co/api/people/3/',
          'http://swapi.co/api/people/4/'
        ]
      }],
      people: [{
        name: 'Han Solo',
        height: '180.5',
        mass: '150lbs',
        url: 'http://swapi.co/people/14/',
        homeworld: 'http://swapi.co/planets/1/',
        starships: [
          'http://swapi.co/starships/1/',
          'http://swapi.co/starships/2/',
        ]
      }]
    };

    formatData(input, function(err, data) {
      if (err) {
        return done();
      }

      this.formattedData = data;
      done();
    }.bind(this));
  });

  it('should format a collection of data', function() {
    var film = this.formattedData.films[0];
    var person = this.formattedData.people[0];

    expect(film.id).to.eql(2);
    expect(film.prominence).to.eql(4);
    expect(person.id).to.eql(14);
    expect(person.height).to.eql(180.5);
    expect(person.mass).to.eql(150);
    expect(person.prominence).to.eql(3);
  });
});

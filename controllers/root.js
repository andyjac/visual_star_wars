var async = require('async');
var models = require('../models');
var Film = models.Film;
var Person = models.Person;
var Planet = models.Planet;
var Species = models.Species;
var Starship = models.Starship;
var Vehicle = models.Vehicle;

module.exports = function(req, res, next) {
  async.parallel({
    films: Film.getAll.bind(Film),
    people: Person.getAll.bind(Person),
    planets: Planet.getAll.bind(Planet),
    species: Species.getAll.bind(Species),
    starships: Starship.getAll.bind(Starship),
    vehicles: Vehicle.getAll.bind(Vehicle)
  }, function(err, data) {
    if (err) {
      return next(err);
    }

    res.status(200).json(data);
  });
};

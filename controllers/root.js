var async = require('async');
var models = require('../models');

module.exports = function(req, res, next) {
  async.parallel({
    films: models.Film.getAll.bind(models.Film),
    people: models.Person.getAll.bind(models.Person),
    planets: models.Planet.getAll.bind(models.Planet),
    species: models.Species.getAll.bind(models.Species),
    starships: models.Starship.getAll.bind(models.Starship),
    vehicles: models.Vehicle.getAll.bind(models.Vehicle)
  }, function(err, data) {
    if (err) {
      return next(err);
    }

    res.status(200).json(data);
  });
};

#!/usr/bin/env node

var _ = require('lodash');
var helpers = require('./helpers');
var models = require('../models');
var Promise = models.Sequelize.Promise;
var async = require('async');

module.exports = function(input, cb) {
  var data = _.cloneDeep(input);

  console.log('Setting associations...\n');

  async.series([
    makeAssociations(data.films, filmSpec),
    makeAssociations(data.people, personSpec),
    makeAssociations(data.planets, planetSpec),
    makeAssociations(data.species, speciesSpec),
    makeAssociations(data.starships, starshipSpec),
    makeAssociations(data.vehicles, vehicleSpec)
  ], function(err) {
    if (err) {
      return cb(err);
    }

    cb(null);
  });
};

function filmSpec(film) {
  return {
    characters: helpers.fetchAssociations(film.characters),
    planets: helpers.fetchAssociations(film.planets),
    starships: helpers.fetchAssociations(film.starships),
    vehicles: helpers.fetchAssociations(film.vehicles),
    species: helpers.fetchAssociations(film.species),
    id: film.id,
    model: models.Film
  };
}

function personSpec(person) {
  return {
    films: helpers.fetchAssociations(person.films),
    species: helpers.fetchAssociations(person.species)[0] || null,
    starships: helpers.fetchAssociations(person.starships),
    homeworld: helpers.fetchIdFromUrl(person.homeworld),
    id: person.id,
    model: models.Person
  };
}

function planetSpec(planet) {
  return {
    people: helpers.fetchAssociations(planet.residents),
    films: helpers.fetchAssociations(planet.films),
    id: planet.id,
    model: models.Planet
  };
}

function speciesSpec(species) {
  return {
    films: helpers.fetchAssociations(species.films),
    peopls: helpers.fetchAssociations(species.people),
    homeworld: helpers.fetchIdFromUrl(species.homeworld),
    id: species.id,
    model: models.Species
  };
}

function starshipSpec(starship) {
  return {
    pilots: helpers.fetchAssociations(starship.pilots),
    films: helpers.fetchAssociations(starship.films),
    id: starship.id,
    model: models.Starship
  };
}

function vehicleSpec(vehicle) {
  return {
    pilots: helpers.fetchAssociations(vehicle.pilots),
    films: helpers.fetchAssociations(vehicle.films),
    id: vehicle.id,
    model: models.Vehicle
  };
}

function makeAssociations(data, associationSpec) {
  return function(cb) {
    var doneCount = 0;

    _.forEach(data, function(entry) {
      var associations = associationSpec(entry);

      associateModel(associations, function(err) {
        if (err) {
          cb(err);
        }

        if (++doneCount === data.length) {
          cb(null);
        }
      });
    });
  };
}

function associateModel(associations, cb) {
  associations.model.findOne({
    where: { id: associations.id }
  }).then(function(model) {
    return Promise.all(setAssociations(model, associations));
  }).then(function(results) {
    cb(null);
  }).catch(function(err) {
    cb(err);
  });
}

function setAssociations(model, associations) {
  var types = _.keys(associations);

  return _.map(types, function(type) {
    var associationFnName = helpers.buildAssociationFnName(type);
    var setAssociation = model[associationFnName];

    if (setAssociation) {
      return setAssociation.call(model, associations[type]);
    }
  });
}

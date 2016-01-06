#!/usr/bin/env node

var data = require('../db/output_formatted.json');
var async = require('async');
var helpers = require('./helpers');
var models = require('../models');
var createSpecs = helpers.createSpecs;
var bulkSaveByModel = helpers.bulkSaveByModel;
var handleProcessError = helpers.handleProcessError;

module.exports = (function() {
  console.log('Saving records...\n');

  async.series([
    saveFilms(data.films),
    savePeople(data.people),
    savePlanets(data.planets),
    saveSpecies(data.species),
    saveStarships(data.starships),
    saveVehicles(data.vehicles)
  ], function(err) {
    if (err) {
      return handleProcessError(err);
    }

    console.log('\nRecords saved');
    process.exit(0);
  });
})();

function saveFilms(films) {
  var filmSpecs = createSpecs(films, function(film) {
    return  {
      director: film.director,
      episodeId: film.episode_id,
      id: film.id,
      openingCrawl: film.opening_crawl,
      producer: film.producer,
      releaseDate: film.release_date,
      title: film.title,
      url: film.url
    };
  });

  return bulkSaveByModel(models.Film, filmSpecs);
}

function savePeople(people) {
  var peopleSpecs = createSpecs(people, function(person) {
    return {
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
      gender: person.gender,
      hairColor: person.hair_color,
      height: person.height,
      id: person.id,
      name: person.name,
      mass: person.mass,
      skinColor: person.skin_color,
      url: person.url
    };
  });

  return bulkSaveByModel(models.Person, peopleSpecs);
}

function savePlanets(planets) {
  var planetSpecs = createSpecs(planets, function(planet) {
    return {
      climate: planet.climate,
      diameter: planet.diameter,
      gravity: planet.gravity,
      name: planet.name,
      orbitalPeriod: planet.orbital_period,
      id: planet.id,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      surfaceWater: planet.surface_water,
      terrain: planet.terrain,
      url: planet.url
    };
  });

  return bulkSaveByModel(models.Planet, planetSpecs);
}

function saveSpecies(species) {
  var speciesSpecs = createSpecs(species, function(species) {
    return {
      averageHeight: species.average_height,
      averageLifespan: species.average_lifespan,
      classification: species.classification,
      designation: species.designation,
      eyeColors: species.eye_colors,
      hairColors: species.hair_colors,
      id: species.id,
      language: species.language,
      name: species.name,
      skinColors: species.skin_colors,
      url: species.url
    };
  });

  return bulkSaveByModel(models.Species, speciesSpecs);
}

function saveStarships(starships) {
  var starshipSpecs = createSpecs(starships, function(starship) {
    return {
      cargoCapacity: starship.cargo_capacity,
      consumables: starship.consumables,
      costInCredits: starship.cost_in_credits,
      crew: starship.crew,
      hyperdriveRating: starship.hyperdrive_rating,
      id: starship.id,
      length: starship.length,
      manufacturer: starship.manufacturer,
      maxAtmospheringSpeed: starship.max_atmosphering_speed,
      MGLT: starship.MGLT,
      model: starship.model,
      name: starship.name,
      passengers: starship.passengers,
      starshipClass: starship.starship_class,
      url: starship.url
    };
  });

  return bulkSaveByModel(models.Starship, starshipSpecs);
}

function saveVehicles(vehicles) {
  var vehicleSpecs = createSpecs(vehicles, function(vehicle) {
    return {
      cargoCapacity: vehicle.cargo_capacity,
      consumables: vehicle.consumables,
      costInCredits: vehicle.cost_in_credits,
      crew: vehicle.crew,
      id: vehicle.id,
      length: vehicle.length,
      manufacturer: vehicle.manufacturer,
      maxAtmospheringSpeed: vehicle.max_atmosphering_speed,
      model: vehicle.model,
      name: vehicle.name,
      passengers: vehicle.passengers,
      url: vehicle.url,
      vehicleClass: vehicle.starship_class
    };
  });

  return bulkSaveByModel(models.Vehicle, vehicleSpecs);
}

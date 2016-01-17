var data = require('../db/output_formatted.json');
var async = require('async');
var models = require('../models');
var helpers = require('./helpers');

module.exports = function(cb) {
  console.log('Saving records...');

  async.series([
    saveModel(models.Film, data.films),
    saveModel(models.Person, data.people),
    saveModel(models.Planet, data.planets),
    saveModel(models.Species, data.species),
    saveModel(models.Starship, data.starships),
    saveModel(models.Vehicle, data.vehicles)
  ], function(err) {
    if (err) {
      return cb(err);
    }

    cb(null, data);
  });
};

function saveModel(model, data) {
  return function(cb) {
    helpers.getModelDescription(model, function(err, attrs) {
      if (err) {
        return cb(err);
      }

      var modelSpecMap = helpers.createSpecMap(attrs);
      var specBuilderFn = helpers.createSpecBuilderFn(modelSpecMap);
      var specs = helpers.createSpecs(data, specBuilderFn);

      helpers.bulkSaveByModel(model, specs, function(err) {
        if (err) {
          return cb(err);
        }

        cb(null);
      });
    });
  };
}

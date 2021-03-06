var _ = require('lodash');
var async = require('async');
var models = require('../models');
var helpers = require('./helpers');

module.exports = function(input, cb) {
  console.log('Saving records...');

  var data = _.cloneDeep(input);

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
    helpers.getModelAttributes(model, function(err, attrs) {
      if (err) {
        return cb(err);
      }

      var specMap = helpers.createSpecMap(attrs);
      var specBuilderFn = helpers.createSpecFn(specMap);

      var specs = _.map(data, function(entry) {
        return specBuilderFn(entry);
      });

      helpers.bulkSaveByModel(model, specs, function(err) {
        if (err) {
          return cb(err);
        }

        cb(null);
      });
    });
  };
}

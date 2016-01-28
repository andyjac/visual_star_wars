var _ = require('lodash');
var fs = require('fs');
var data = require('../db/output.json');
var helpers = require('./helpers');

var isNumValue = {
  height: true,
  mass: true,
  cost_in_credits: true,
  length: true,
  max_atmosphering_speed: true,
  crew: true,
  passengers: true,
  cargo_capacity: true,
  average_height: true,
  average_lifespan: true,
  hyperdrive_rating: true,
  MGLT: true,
  rotation_period: true,
  orbital_period: true,
  diameter: true,
  surface_water: true,
  population: true
};

var shouldBeNull = {
  'n/a': true,
  'N/A': true,
  'unknown': true,
  'indefinite': true,
  'none': true
};

var isAssociationAttr = {
  'films': true,
  'planets': true,
  'characters': true,
  'starships': true,
  'species': true,
  'vehicles': true,
  'pilots': true,
  'homeworld': true,
  'people': true
};

module.exports = function(input, cb) {
  var data = _.cloneDeep(input);
  var categories = _.keys(data);
  var formattedData = {};

  _.forEach(categories, function(category) {
    formattedData[category] = runDataTransforms(data[category]);
  });

  cb(null, formattedData);
};

function runDataTransforms(category) {
  return _.map(category, function(entry) {
    entry = formatAttributes(entry);
    entry.id = helpers.fetchIdFromUrl(entry.url);

    return entry;
  });
}

function formatAttributes(input) {
  var entry = _.cloneDeep(input);
  var attrs = _.keys(entry);
  var associations = 0;

  _.forEach(attrs, function(attr) {
    var value = entry[attr];

    if (shouldBeNull[value]) {
      entry[attr] = null;
    }

    if (isNumValue[attr] && value) {
      entry[attr] = helpers.formatNumber(value);
    }

    if (isAssociationAttr[attr] && value) {
      if (!_.isArray(entry[attr])) {
        associations += 1;
      } else {
        associations += entry[attr].length;
      }
    }
  });

  entry.prominence = associations;

  return entry;
}

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

function formatData(input) {
  var data = _.cloneDeep(input);
  var categories = _.keys(data);
  var formattedData = {};

  _.forEach(categories, function(category) {
    formattedData[category] = runDataTransforms(data[category]);
  });

  return formattedData;
}

function runDataTransforms(category) {
  return _.map(category, function(entry) {
    entry = formatAttributes(entry);
    entry.id = helpers.fetchIdFromUrl(entry.url);

    return entry;
  });
}

function formatAttributes(entry) {
  var entry = _.cloneDeep(entry);
  var attrs = _.keys(entry);

  _.forEach(attrs, function(attr) {
    var value = entry[attr];

    if (shouldBeNull[value]) {
      entry[attr] = null;
    }

    if (isNumValue[attr] && entry[attr]) {
      entry[attr] = helpers.sanitizeNum(value);
    }
  });

  return entry;
}

module.exports = function(cb) {
  console.log('Formatting data...');

  var formattedData = formatData(data);
  var dataToWrite = JSON.stringify(formattedData, null, 2);
  var fileName = __dirname + '/../db/output_formatted.json';

  fs.writeFile(fileName, dataToWrite, function(err) {
    if (err) {
      return cb(err);
    }

    cb(null);
  });
};

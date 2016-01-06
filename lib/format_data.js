#!/usr/bin/env node

var _ = require('lodash');
var fs = require('fs');
var data = _.cloneDeep(require('../db/output.json'));
var helpers = require('./helpers');
var handleProcessError = helpers.handleProcessError;
var fetchIdFromUrl = helpers.fetchIdFromUrl;

var isIntValueMap = {
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

shouldBeNullMap = {
  'n/a': true,
  'N/A': true,
  'unknown': true,
  'indefinite': true,
  'none': true
};

function addIds(entry) {
  entry.id = fetchIdFromUrl(entry.url);

  return entry;
}

function formatData(data) {
  var formattedData = {};
  var categories = _.keys(data);

  _.forEach(categories, function(category) {
    formattedData[category] = runDataTransforms(data[category]);
  });

  return formattedData;
}

function runDataTransforms(category) {
  var results = [];

  _.forEach(category, function(entry) {
    var entryWithId = addIds(entry);
    var formattedAttrs = formatAttributes(entryWithId);

    results.push(formattedAttrs);
  });

  return results;
}

function formatAttributes(entry) {
  var attrs = _.keys(entry);

  _.forEach(attrs, function(attr) {
    var value = entry[attr];

    if (shouldBeNullMap[value]) {
      entry[attr] = null;
    }

    if (isIntValueMap[attr] && entry[attr]) {
      entry[attr] = entry[attr].split(',').join('');
      entry[attr] = entry[attr].split('km').join('');
    }
  });

  return entry;
}

(function(fileName) {
  console.log('Formatting data...')

  var formattedData = formatData(data);
  var dataToWrite = JSON.stringify(formattedData, null, 2);

  fs.writeFile(fileName, dataToWrite, function(err) {
    if (err) {
      return handleProcessError(err);
    }

    console.log('Data formatted successfully');
    process.exit(0);
  });
})(__dirname + '/../db/output_formatted.json')

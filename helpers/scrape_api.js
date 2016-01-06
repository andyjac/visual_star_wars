#!/usr/bin/env node

var BASE_URL = 'https://swapi.co/api';
var request = require('request');
var fs = require('fs');

module.exports = (function() {
  request
    .get(BASE_URL, function(err, res) {
      if (err) {
        return console.log(err);
      }

      var urls = JSON.parse(res.body);
      scrapeEndpoints(urls);
    });
})();


function scrapeEndpoints(urls) {
  var models = Object.keys(urls);
  var results = {};
  var doneCount = 0;

  models.forEach(function(model) {
    var url = urls[model];

    fetchData(url, function(err, data) {
      if (err) {
        return console.log(err);
      }

      results[model] = data;

      if (++doneCount === models.length) {
        var fileName = __dirname + '/../db/data.json';

        writeToDisk(fileName, results);
      }
    }, []);
  });
}

function fetchData(url, cb, data) {
  request.get(url, function(err, res) {
    if (err) {
      return cb(err);
    }

    var parsed = JSON.parse(res.body);
    data = data.concat(parsed.results);

    if (parsed.next) {
      fetchData(parsed.next, cb, data);
    } else {
      cb(null, data);
    }
  });
}

function writeToDisk(fileName, data) {
  var jsonData = JSON.stringify(data, null, 2);

  fs.writeFile(fileName, jsonData, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log('File written successfully');
  });
}

var _ = require('lodash');
var BASE_URL = 'https://swapi.co/api';
var request = require('request');
var fs = require('fs');

module.exports = function(cb) {
  console.log('Scraping API...');

  request.get(BASE_URL, function(err, res) {
    if (err) {
      return cb(err);
    }

    var urls = JSON.parse(res.body);
    scrapeEndpoints(urls, cb);
  });
};

function scrapeEndpoints(urls, cb) {
  var models = _.keys(urls);
  var results = {};
  var doneCount = 0;

  _.forEach(models, function(model) {
    var url = urls[model];

    fetchData(url, function(err, data) {
      if (err) {
        return cb(err);
      }

      results[model] = data;

      if (++doneCount === models.length) {
        var fileName = __dirname + '/../db/output.json';

        writeToDisk(fileName, results, cb);
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

function writeToDisk(fileName, data, cb) {
  var jsonData = JSON.stringify(data, null, 2);

  fs.writeFile(fileName, jsonData, function(err) {
    if (err) {
      return cb(err);
    }

    cb(null, data);
  });
}

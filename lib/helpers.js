var _ = require('lodash');

var helpers = {
  bulkSaveByModel: function(model, data) {
    return function(callback) {
      model
        .sync({force: true})
        .then(function(model) {
          return model.bulkCreate(data);
        })
        .then(function(results) {
          callback(null);
        }).catch(function(err) {
          callback(err);
        });
    };
  },

  createSpecs: function(coll, createSpec) {
    var specs = _.map(coll, function(item) {
      return createSpec(item);
    });

    return specs;
  },

  fetchIdFromUrl: function(url) {
    var parts = url.split('/');

    return parts[parts.length - 2];
  },

  handleProcessError: function(err) {
    console.log(err);

    return process.exit(1);
  },
};

module.exports = helpers;

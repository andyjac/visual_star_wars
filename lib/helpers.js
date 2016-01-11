var _ = require('lodash');

module.exports = {
  bulkSaveByModel: function(model, data) {
    return function(cb) {
      model
        .sync({force: true})
        .then(function(model) {
          return model.bulkCreate(data);
        })
        .then(function(results) {
          cb(null);
        }).catch(function(err) {
          cb(err);
        });
    };
  },

  createSpecs: function(coll, createSpec) {
    return _.map(coll, function(item) {
      return createSpec(item);
    });
  },

  fetchIdFromUrl: function(url) {
    var parts = url.split('/');

    return parts[parts.length - 2];
  },

  handleProcessError: function(err) {
    console.log('ERR:', err);

    return process.exit(1);
  },

  sanitizeNum: function(value) {
    return value.replace(/(?!\.)\D/g, '');
  },

  fetchAssociations: function(items) {
    return _.map(items, function(item) {
      return this.fetchIdFromUrl(item);
    }, this);
  }
};

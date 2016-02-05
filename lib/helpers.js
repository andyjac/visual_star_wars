var _ = require('lodash');

module.exports = {
  bulkSaveByModel: function(model, specs, cb) {
    model.sync({
      force: true
    }).then(function(model) {
      return model.bulkCreate(specs);
    }).then(function() {
      cb(null);
      return null;
    }).catch(function(err) {
      cb(err);
      return null;
    });
  },

  fetchIdFromUrl: function(url) {
    if (!url) {
      return null;
    }

    var parts = url.split('/');
    var id = parts[parts.length - 2];

    return Number(id);
  },

  fetchAssociations: function(items) {
    return _.map(items, function(item) {
      return this.fetchIdFromUrl(item);
    }, this);
  },

  buildAssociationFnName: function(type) {
    return 'set' + type[0].toUpperCase() + type.slice(1);
  },

  joinPaths: function(pathGroup) {
    return _.reduce(pathGroup, function(arr, paths) {
      arr = arr.concat(paths);

      return arr;
    }, []);
  },

  createSpecFn: function(specMap) {
    return function(item) {
      return _.reduce(specMap, function(spec, value, key) {
        if (item[value]) {
          spec[key] = item[value];
        }

        return spec;
      }, {});
    };
  },

  createSpecMap: function(fields) {
    return _.reduce(fields, function(specMap, value) {
      specMap[value] = _.snakeCase(value);

      return specMap;
    }, {});
  },

  getModelAttributes: function(model, cb) {
    model.describe().then(function(attrs) {
      delete attrs.createdAt;
      delete attrs.updatedAt;

      cb(null, _.keys(attrs));
      return null;
    }).catch(function(err) {
      cb(err);
      return null;
    });
  },

  formatNumber: function(n) {
    return Number(n.replace(/(?!\.)\D/g, ''));
  }
};

var _ = require('lodash');

module.exports = {
  bulkSaveByModel: function(model, data) {
    return function(cb) {
      model.sync({
        force: true
      }).then(function(model) {
        return model.bulkCreate(data);
      }).then(function() {
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
    if (!url) return null;

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

  createSpecBuilderFn: function(fields) {
    var specMap = this.createSpecMap(fields);

    return function(item) {
      return _.reduce(specMap, function(spec, value, key) {
        spec[key] = item[value];

        return spec;
      }, {});
    };
  },

  createSpecMap: function(fields) {
    return _.reduce(fields, function(specMap, value, key) {
      specMap[value] = _.snakeCase(value);

      return(specMap);
    }, {});
  }
};

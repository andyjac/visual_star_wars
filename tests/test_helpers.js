module.exports = {
  saveModel: function(model, data, cb) {
    model.sync({
      force: true
    }).then(function(model) {
      return model.create(data);
    }).then(function() {
      cb(null);
      return null;
    }).catch(function(err) {
      cb(err);
      return null;
    });
  }
};

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config.json')[env];
var db = {};

var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password, {
    dialect: 'postgres',
    logging: false
  }
);

fs.readdirSync(__dirname).filter(function(file) {
  return (file[0] !== '.') && (file !== 'index.js');
}).forEach(function(file) {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

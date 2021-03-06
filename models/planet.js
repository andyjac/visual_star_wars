var Promise = require('bluebird');

module.exports = function(sequelize, DataTypes) {
  var Planet = sequelize.define('Planet', {
    climate: {
      type: DataTypes.STRING
    },
    diameter: {
      type: DataTypes.INTEGER
    },
    gravity: {
      type: DataTypes.STRING
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    orbitalPeriod: {
      type: DataTypes.INTEGER
    },
    population: {
      type: DataTypes.BIGINT
    },
    prominence: {
      type: DataTypes.INTEGER
    },
    rotationPeriod: {
      type: DataTypes.INTEGER
    },
    surfaceWater: {
      type: DataTypes.DECIMAL
    },
    terrain: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Planet.hasMany(models.Person, { as: 'Residents' });
        Planet.belongsToMany(models.Film, { through: 'FilmPlanets', as: 'Films' });
      },

      getAll: function(cb) {
        this.findAll({
          attributes: ['id', 'name', 'prominence']
        }).then(function(planets) {
          cb(null, planets);
        }).error(function(err) {
          cb(err);
        });
      },

      getOne: function(id, cb) {
        this.findOne({
          where: { id: id }
        }).then(function(planet) {
          return Promise.props({
            planet: planet,
            residents: planet.getResidents({ attributes: ['id', 'name'] }),
            films: planet.getFilms({ attributes: ['id', 'title'] })
          });
        }).then(function(data) {
          cb(null, data);
        }).error(function(err) {
          cb(err);
        });
      }
    }
  });

  return Planet;
};

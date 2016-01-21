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
        Planet.belongsToMany(models.Person, { through: 'PlanetPeople', as: 'Residents' });
        Planet.belongsToMany(models.Film, { through: 'PlanetFilms', as: 'Films' });
      },

      getAll: function(cb) {
        this.findAll({
          attributes: ['id', 'name']
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
          cb(null, planet);
        }).error(function(err) {
          cb(err);
        });
      }
    }
  });

  return Planet;
};

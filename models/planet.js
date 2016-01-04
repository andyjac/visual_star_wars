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
        Planet.belongsToMany(models.Person, { through: 'PlanetPeople', as: 'People' });
        Planet.belongsToMany(models.Film, { through: 'PlanetFilms', as: 'Films' });
      }
    }
  });

  return Planet;
};

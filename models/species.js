module.exports = function(sequelize, DataTypes) {
  var Species = sequelize.define('Species', {
    averageHeight: {
      type: DataTypes.INTEGER
    },
    averageLifespan: {
      type: DataTypes.INTEGER
    },
    classification: {
      type: DataTypes.STRING
    },
    designation: {
      type: DataTypes.STRING
    },
    eyeColors: {
      type: DataTypes.STRING
    },
    hairColors: {
      type: DataTypes.STRING
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    language: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    skinColors: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Species.belongsToMany(models.Film, { through: 'SpeciesFilms', as: 'Films' });
        Species.belongsToMany(models.Person, { through: 'SpeciesPeople', as: 'People' });
        Species.belongsTo(models.Planet, { as: 'Homeworld' });
      }
    }
  });

  return Species;
};

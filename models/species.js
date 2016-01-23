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
    prominence: {
      type: DataTypes.INTEGER
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
        Species.belongsToMany(models.Film, { through: 'FilmSpecies', as: 'Films' });
        Species.hasMany(models.Person, { as: 'People' });
        Species.belongsTo(models.Planet, { as: 'Homeworld' });
      },

      getAll: function(cb) {
        this.findAll({
          attributes: ['id', 'name', 'prominence']
        }).then(function(species) {
          cb(null, species);
        }).error(function(err) {
          cb(err);
        });
      },

      getOne: function(id, cb) {
        this.findOne({
          where: { id: id }
        }).then(function(species) {
          cb(null, species);
        }).error(function(err) {
          cb(err);
        });
      }
    }
  });

  return Species;
};

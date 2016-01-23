var Promise = require('bluebird');

module.exports = function(sequelize, DataTypes) {
  var Starship = sequelize.define('Starship', {
    cargoCapacity: {
      type: DataTypes.BIGINT
    },
    consumables: {
      type: DataTypes.STRING
    },
    costInCredits: {
      type: DataTypes.BIGINT
    },
    crew: {
      type: DataTypes.INTEGER
    },
    hyperdriveRating: {
      type: DataTypes.DECIMAL
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    length: {
      type: DataTypes.DECIMAL
    },
    manufacturer: {
      type: DataTypes.STRING
    },
    maxAtmospheringSpeed: {
      type: DataTypes.INTEGER
    },
    MGLT: {
      type: DataTypes.INTEGER
    },
    model: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    passengers: {
      type: DataTypes.INTEGER
    },
    prominence: {
      type: DataTypes.INTEGER
    },
    starshipClass: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Starship.belongsToMany(models.Film, { through: 'FilmStarships', as: 'Films' });
        Starship.belongsToMany(models.Person, { through: 'PersonStarships', as: 'Pilots' });
      },

      getAll: function(cb) {
        this.findAll({
          attributes: ['id', 'name', 'prominence']
        }).then(function(starships) {
          cb(null, starships);
        }).error(function(err) {
          cb(err);
        });
      },

      getOne: function(id, cb) {
        this.findOne({
          where: { id: id }
        }).then(function(starship) {
          return Promise.props({
            starship: starship,
            films: starship.getFilms({ attributes: ['id', 'title'] }),
            pilots: starship.getPilots({ attributes: ['id', 'name'] })
          });
        }).then(function(data) {
          cb(null, data);
        }).error(function(err) {
          cb(err);
        });
      }
    }
  });

  return Starship;
};

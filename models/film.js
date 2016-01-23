var Promise = require('bluebird');

module.exports = function(sequelize, DataTypes) {
  var Film = sequelize.define('Film', {
    director: {
      type: DataTypes.STRING
    },
    episodeId: {
      type: DataTypes.INTEGER
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    openingCrawl: {
      type: DataTypes.TEXT
    },
    producer: {
      type: DataTypes.STRING
    },
    prominence: {
      type: DataTypes.INTEGER
    },
    releaseDate: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Film.belongsToMany(models.Person, { through: 'FilmPeople', as: 'Characters' });
        Film.belongsToMany(models.Planet, { through: 'FilmPlanets', as: 'Planets' });
        Film.belongsToMany(models.Species, { through: 'FilmSpecies', as: 'Species' });
        Film.belongsToMany(models.Starship, { through: 'FilmStarships', as: 'Starships' });
        Film.belongsToMany(models.Vehicle, { through: 'FilmVehicles', as: 'Vehicles' });
      },

      getAll: function(cb) {
        this.findAll({
          attributes: ['id', 'title', 'prominence']
        }).then(function(films) {
          cb(null, films);
        }).error(function(err) {
          cb(err);
        });
      },

      getOne: function(id, cb) {
        this.findOne({
          where: { id: id }
        }).then(function(film) {
          var attrs = { attributes: ['id', 'name'] };

          return Promise.props({
            film: film,
            characters: film.getCharacters(attrs),
            planets: film.getPlanets(attrs),
            species: film.getSpecies(attrs),
            starships: film.getStarships(attrs),
            vehicles: film.getVehicles(attrs)
          });
        }).then(function(data) {
          cb(null, data);
        }).error(function(err) {
          cb(err);
        });
      }
    }
  });

  return Film;
};

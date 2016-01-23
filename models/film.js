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

      getAll: function(models, cb) {
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
          cb(null, film);
        }).error(function(err) {
          cb(err);
        });
      }
    }
  });

  return Film;
};

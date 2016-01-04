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
      type: DataTypes.STRING
    },
    producer: {
      type: DataTypes.STRING
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
        Film.belongsToMany(models.Starship, { through: 'FilmStarships', as: 'Starships' });
        Film.belongsToMany(models.Vehicle, { through: 'FilmVehicles', as: 'Vehicles' });
        Film.belongsToMany(models.Species, { through: 'FilmSpecies', as: 'Species' });
      }
    }
  });

  return Film;
};

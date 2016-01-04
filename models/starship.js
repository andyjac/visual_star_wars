module.exports = function(sequelize, DataTypes) {
  var Starship = sequelize.define('Starship', {
    cargoCapacity: {
      type: DataTypes.INTEGER,
    },
    consumables: {
      type: DataTypes.STRING,
    },
    costInCredits: {
      type: DataTypes.INTEGER,
    },
    crew: {
      type: DataTypes.INTEGER,
    },
    hyperdriveRating: {
      type: DataTypes.DECIMAL,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    length: {
      type: DataTypes.DECIMAL,
    },
    manufacturer: {
      type: DataTypes.STRING,
    },
    maxAtmospheringSpeed: {
      type: DataTypes.INTEGER,
    },
    MGLT: {
      type: DataTypes.INTEGER,
    },
    model: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    passengers: {
      type: DataTypes.INTEGER,
    },
    starshipClass: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Starship.belongsToMany(models.Film, { through: 'StarshipFilms', as: 'Films' });
        Starship.belongsToMany(models.Person, { through: 'StarshipPeople', as: 'Pilots' });
      }
    }
  });

  return Starship;
};

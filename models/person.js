var Promise = require('bluebird');

module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define('Person', {
    birthYear: {
      type: DataTypes.STRING
    },
    eyeColor: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    hairColor: {
      type:  DataTypes.STRING
    },
    height: {
      type: DataTypes.DECIMAL
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    mass: {
      type: DataTypes.DECIMAL
    },
    prominence: {
      type: DataTypes.INTEGER
    },
    skinColor: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Person.belongsToMany(models.Film, { through: 'FilmPeople', as: 'Films' });
        Person.belongsToMany(models.Starship, { through: 'PersonStarships', as: 'Starships' });
        Person.belongsToMany(models.Vehicle, { through: 'PersonVehicles', as: 'Vehicles' });
      },

      getAll: function(cb) {
        this.findAll({
          attributes: ['id', 'name', 'prominence']
        }).then(function(people) {
          cb(null, people);
        }).error(function(err) {
          cb(err);
        });
      },

      getOne: function(id, cb) {
        this.findOne({
          where: { id: id }
        }).then(function(person) {
          return Promise.props({
            person: person,
            films: person.getFilms({ attributes: ['id', 'title'] }),
            starships: person.getStarships({ attributes: ['id', 'name'] }),
            vehicles: person.getVehicles({ attributes: ['id', 'name'] })
          });
        }).then(function(data) {
          cb(null, data);
        }).error(function(err) {
          cb(err);
        });
      }
    }
  });

  return Person;
};

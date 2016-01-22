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
          attributes: ['id', 'name']
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
          cb(null, person);
        }).error(function(err) {
          cb(err);
        });
      }
    }
  });

  return Person;
};

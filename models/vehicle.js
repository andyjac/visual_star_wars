module.exports = function(sequelize, DataTypes) {
  var Vehicle = sequelize.define('Vehicle', {
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
    url: {
      type: DataTypes.STRING
    },
    vehicleClass: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Vehicle.belongsToMany(models.Film, { through: 'FilmVehicles', as: 'Films' });
        Vehicle.belongsToMany(models.Person, { through: 'PersonVehicles', as: 'Pilots' });
      },

      getAll: function(cb) {
        this.findAll({
          attributes: ['id', 'name']
        }).then(function(vehicles) {
          cb(null, vehicles);
        }).error(function(err) {
          cb(err);
        });
      },

      getOne: function(id, cb) {
        this.findOne({
          where: { id: id }
        }).then(function(vehicle) {
          cb(null, vehicle);
        }).error(function(err) {
          cb(err);
        });
      }
    }
  });

  return Vehicle;
};

module.exports = function(sequelize, DataTypes) {
  var Vehicle = sequelize.define('Vehicle', {
    cargoCapacity: {
      type: DataTypes.INTEGER
    },
    consumables: {
      type: DataTypes.STRING
    },
    costInCredits: {
      type: DataTypes.INTEGER
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
    url: {
      type: DataTypes.STRING
    },
    vehicleClass: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Vehicle.belongsToMany(models.Person, { through: 'VehiclePeople', as: 'Pilots' });
        Vehicle.belongsToMany(models.Film, { through: 'VehicleFilms', as: 'Films' });
      }
    }
  });

  return Vehicle;
};

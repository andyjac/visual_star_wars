var express = require('express');
var models = require('../models');
var router = express.Router();

router.get('/', function(req, res, next) {
  models.Vehicle.getAll(function(err, vehicles) {
    if (err) {
      return next(err);
    }

    res.status(200).json(vehicles);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  models.Vehicle.getOne(id, function(err, vehicle) {
    if (err) {
      return next(err);
    }

    res.status(200).json(vehicle);
  });
});

module.exports = router;

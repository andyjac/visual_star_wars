var express = require('express');
var Vehicle = require('../models').Vehicle;
var router = express.Router();

router.get('/', function(req, res, next) {
  Vehicle.getAll(function(err, vehicles) {
    if (err) {
      return next(err);
    }

    res.status(200).json(vehicles);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  Vehicle.getOne(id, function(err, vehicle) {
    if (err) {
      return next(err);
    }

    res.status(200).json(vehicle);
  });
});

module.exports = router;

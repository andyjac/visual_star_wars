var express = require('express');
var models = require('../models');
var router = express.Router();

router.get('/', function(req, res, next) {
  models.Planet.getAll(function(err, planets) {
    if (err) {
      return next(err);
    }

    res.status(200).json(planets);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  models.Planet.getOne(id, function(err, planet) {
    if (err) {
      return next(err);
    }

    res.status(200).json(planet);
  });
});

module.exports = router;

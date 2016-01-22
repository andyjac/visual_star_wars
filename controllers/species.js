var express = require('express');
var models = require('../models');
var router = express.Router();

router.get('/', function(req, res, next) {
  models.Species.getAll(function(err, species) {
    if (err) {
      return next(err);
    }

    res.status(200).json(species);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  models.Species.getOne(id, function(err, species) {
    if (err) {
      return next(err);
    }

    res.status(200).json(species);
  });
});

module.exports = router;

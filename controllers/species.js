var express = require('express');
var Species = require('../models').Species;
var router = express.Router();

router.get('/', function(req, res, next) {
  Species.getAll(function(err, species) {
    if (err) {
      return next(err);
    }

    res.status(200).json(species);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  Species.getOne(id, function(err, species) {
    if (err) {
      return next(err);
    }

    res.status(200).json(species);
  });
});

module.exports = router;

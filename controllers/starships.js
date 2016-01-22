var express = require('express');
var models = require('../models');
var router = express.Router();

router.get('/', function(req, res, next) {
  models.Starship.getAll(function(err, starships) {
    if (err) {
      return next(err);
    }

    res.status(200).json(starships);
  });

});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  models.Starship.getOne(id, function(err, starship) {
    if (err) {
      return next(err);
    }

    res.status(200).json(starship);
  });
});

module.exports = router;

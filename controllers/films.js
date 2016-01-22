var express = require('express');
var models = require('../models');
var router = express.Router();

router.get('/', function(req, res, next) {
  models.Film.getAll(function(err, films) {
    if (err) {
      return next(err);
    }

    res.status(200).json(films);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  models.Film.getOne(id, function(err, film) {
    if (err) {
      return next(err);
    }

    res.status(200).json(film);
  });
});

module.exports = router;

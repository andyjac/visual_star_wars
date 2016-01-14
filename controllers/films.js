var express = require('express');
var Film = require('../models').Film;
var router = express.Router();

router.get('/', function(req, res, next) {
  Film.getAll(function(err, films) {
    if (err) {
      return next(err);
    }

    res.status(200).json(films);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  Film.getOne(id, function(err, film) {
    if (err) {
      return next(err);
    }

    res.status(200).json(film);
  });
});

module.exports = router;

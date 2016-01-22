var express = require('express');
var models = require('../models');
var router = express.Router();

router.get('/', function(req, res, next) {
  models.Person.getAll(function(err, people) {
    if (err) {
      return next(err);
    }

    res.status(200).json(people);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  models.Person.getOne(id, function(err, person) {
    if (err) {
      return next(err);
    }

    res.status(200).json(person);
  });
});

module.exports = router;

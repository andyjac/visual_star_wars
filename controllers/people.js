var express = require('express');
var Person = require('../models').Person;
var router = express.Router();

router.get('/', function(req, res, next) {
  Person.getAll(function(err, people) {
    if (err) {
      return next(err);
    }

    res.status(200).json(people);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  Person.getOne(id, function(err, person) {
    if (err) {
      return next(err);
    }

    res.status(200).json(person);
  });
});

module.exports = router;

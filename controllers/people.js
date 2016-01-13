var express = require('express');
var models = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  models.Person.findAll({
    attributes: ['id','name']
  }).then(function(people) {
    res.status(200).json(people);
  }).error(function(err) {
    console.log(err);
    res.status(500).json({msg: 'internal server error'});
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;

  models.Person.findOne({
    where: { id: id }
  }).then(function(person) {
    res.status(200).json(person);
  }).error(function(err) {
    console.log(err);
    res.status(500).json({msg: 'internal server error'});
  });
});

module.exports = router;

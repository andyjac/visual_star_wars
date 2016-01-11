var express = require('express');
var request = require('request');
var models = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  models.Planet.findAll({
    attributes: ['id', 'name']
  }).then(function(planets) {
    res.status(200).json(planets);
  }).error(function(err) {
    res.status(500).json({msg: 'internal server error'});
  });
});

router.get('/:id', function(req, res) {
  models.Planet.findOne({
    where: { id: req.params.id }
  }).then(function(planet) {
    res.status(200).json(planet);
  }).error(function(err) {
    res.status(500).json({msg: 'internal server error'});
  });
});

module.exports = router;

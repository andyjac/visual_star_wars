var express = require('express');
var request = require('request');
var models = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  models.Species.findAll({
    attributes: ['id','name']
  }).then(function(species) {
    res.status(200).json(species);
  }).error(function(err) {
    res.status(500).json({msg: 'internal server error'});
  });
});

router.get('/:id', function(req, res) {
  models.Species.findOne({
    where: { id: req.params.id }
  }).then(function(person) {
    res.status(200).json(person);
  }).error(function(err) {
    res.status(500).json({msg: 'internal server error'});
  });
});

module.exports = router;

var express = require('express');
var models = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  models.Starship.findAll({
    attributes: ['id', 'name']
  }).then(function(starships) {
    res.status(200).json(starships);
  }).error(function(err) {
    console.log(err);
    res.status(500).json({msg: 'internal server error'});
  });
});

router.get('/:id', function(req, res) {
  models.Starship.findOne({
    where: { id: req.params.id }
  }).then(function(starship) {
    res.status(200).json(starship);
  }).error(function(err) {
    console.log(err);
    res.status(500).json({msg: 'internal server error'});
  });
});

module.exports = router;

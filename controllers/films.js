var express = require('express');
var request = require('request');
var models = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  models.Film.findAll({
    attributes: ['id','title']
  }).then(function(films) {
    res.status(200).json(films);
  }).error(function(err) {
    res.status(500).json({msg: 'internal server error'});
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;

  models.Film.findOne({
    where: { id: id }
  }).then(function(film) {
    res.status(200).json(film);
  }).error(function(err) {
    res.status(500).json({msg: 'internal server error'});
  });
});

module.exports = router;

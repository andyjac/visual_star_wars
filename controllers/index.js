var bodyparser = require('body-parser');
var express = require('express');
var models = require('../models');
var router = express.Router();

router.use('/films', require('./films'));
router.use('/people', require('./people'));
router.use('/planets', require('./planets'));
router.use('/species', require('./species'));
router.use('/starships', require('./starships'));
router.use('/vehicles', require('./vehicles'));

module.exports = router;

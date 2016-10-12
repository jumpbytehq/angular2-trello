'use strict';

var express = require('express');
var controller = require('./lane.controller');

var router = express.Router();

router.get('/', controller.getLanes);
router.get('/:lane', controller.getCards);
router.post('/', controller.createLane);
module.exports = router;
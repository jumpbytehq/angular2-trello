'use strict';

var express = require('express');
var controller = require('./card.controller');

var router = express.Router();

router.get('/:laneId', controller.getCards);
router.post('/', controller.createCard);
router.post('/transfer-card', controller.transferCard);

module.exports = router;
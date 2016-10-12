var
Q = require('q'),
cardModel = require('../api/card/card.model'),
laneModel = require('../api/lane/lane.model');

exports.wipeDB = function() {
	Q.all([
		cardModel.removeAllCards(),
		laneModel.removeAllLanes()
	])
	.then(function() {
		console.log('db wiped');
	});
};
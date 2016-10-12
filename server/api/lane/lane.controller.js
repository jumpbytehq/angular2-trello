var
Q = require('q'),
laneModel = require('./lane.model');
cardModel = require('../card/card.model');

exports.getLanes = function(req, res, next) {
  	laneModel.getLanes(function(err, lanes) {
	 	if(err) {
	 		console.log(err);
	 		return res.json(err);
	 	}

	 	return res.json( {lanes: lanes} );
  	});
};

exports.createLane = function(req, res, next) {
	var item = new laneModel({
	    title: req.body.title
	});

	Q.nfcall(item.save.bind(item)).then(function () { 
		res.json({
			_id: item._id,
			title: item.title,
			cards: []
		});
  	});
};

exports.getCards = function(req, res, next) {
	var laneId = req.params.lane;

	laneModel.findLane(laneId).then(function(lane) {
		if(err) {
			console.log(err);
			return res.send(500);
		}

		lane.getCards().then(function(data) {
			return res.send(data);
		});
	});
};
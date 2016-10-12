var
Q = require('q'),
cardModel = require('./card.model');

exports.getCards = function(req, res, next) {
  	cardModel.getCards(req.params.lane, function(err, cards) {
	 	if(err) {
	 		console.log(err);
	 		return res.json(err);
	 	}

	 	return res.json( cards );
  	});
};

exports.createCard = function(req, res, next) {
	cardModel.createCard({
		title: req.body.title,
		lane: req.body.lane
	}, function(err, card) {
		if(err) {
			console.log(err);
			return res.send(500);
		}

		return res.send(card);
	});
};

exports.transferCard = function(req, res ,next) {
	var cardId = req.body.card;
	var fromLane = req.body.fromLane;
	var toLane = req.body.toLane;

	if(fromLane === toLane) {
		return res.json({status: true});
	}
	
	console.log(cardId);
	cardModel.findCard(cardId).then(function(card) {
		card.lane = toLane;
		console.log('found', card);
		card.save(function(err) {
			if(err) {
				console.log(err);
				return res.json({status: false, reason: err});
			}
			res.json({status: true});
		});
	});
};

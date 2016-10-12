'use strict';

var
Q = require('q'),
mongoose = require('mongoose'),
Schema = mongoose.Schema,
cardModel = require('../card/card.model');

var
LaneSchema = new Schema({
  title: {
    type: String,
    require: true
  }
});

LaneSchema.statics = {
  getLanes: function(cb){
    var promise = new mongoose.Promise(cb);  

    this
    .find({}, function(err, lanes) {
      if(err) {
        return promise.error(err);
      }
      if(!lanes) {
        return promise.complete(false);
      }

      var lanesWithCards = [];
      lanes.reduce(function(p, lane, index) {
        var nextIteration = Q.defer();

        p.then(function(allLanes) {          
          cardModel.getCards(lane._id, function(err, cards) {
            if(err) {
              console.log(err);
              return nextIteration.reject(err);
            }

            lanesWithCards.push({
              _id: lane._id,
              title: lane.title,
              cards: cards
            });

            nextIteration.resolve();
          });
        });

        return nextIteration.promise;
      }, Q.when())
      .then(function() {
        promise.complete(lanesWithCards);
      });
    });
    
    return promise;
  },

  findLane: function(laneId) {
    var defer = new Q.defer();  
    this.findOne({_id: laneId}, function(err, lane) {
      if(err) {
        return defer.reject(err);
      }
      if(!lane) {
        return defer.reject(new Error("invalid lane id("+laneId+") provided"));
      }

      defer.resolve(lane);
    });
    return defer.promise;
  },

  removeAllLanes: function() {
    var defer = Q.defer();

    this.remove({}, function(err) {
      if(err) {
        console.log(err);
        defer.reject(err);
      }

      defer.resolve();
    });

    return defer.promise;
  }
};

LaneSchema.methods = {
  getCards: function(cb) {
    var cardDefer = Q.defer();

    cardModel.getCards(this._id, function(err, cards) {
      if(err) {
        console.log(err);
        return cardDefer.reject(err);
      }

      this.cards = cards;
      cardDefer.resolve(this);
    });

    return cardDefer.promise;
  }
};

module.exports = mongoose.model('Lane', LaneSchema);
'use strict';

var
Q = require('q'),
mongoose = require('mongoose'),
Schema = mongoose.Schema;

var
CardSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  lane: {
    type: Schema.Types.ObjectId,
    ref: 'Lane',
    require: true
  }
});

CardSchema.statics = {
  findCard: function(cardId) {
    var defer = Q.defer();

    this.findOne({_id: cardId}, function(err, card) {
      if(err) {
        console.log(err);
        return defer.reject(err);
      }

      if(!card) {
        console.log('invalid cardId ', cardId, 'provided');
        return defer.reject(new Error('invalid cardId ', cardId, 'provided'));
      }

      defer.resolve(card);
    });

    return defer.promise;
  },
  
  getCards: function(laneId, cb){
    var promise = new mongoose.Promise(cb);  
    this.find({lane: laneId}, '_id title lane', function(err, cards) {
      if(err) {
        return promise.error(err);
      }
      if(!cards) {
        return promise.complete(false);
      }

      promise.complete(cards);
    });
    return promise;
  },

  createCard: function(data, cb) {
    var promise = new mongoose.Promise(cb);  
    
    var newCard = new this({
      title: data.title,
      lane: data.lane  
    });

    newCard.save(function(err) {
      if(err) {
        return promise.error(err);
      }
      
      promise.complete(newCard);
    });
    return promise;
  },

  removeAllCards: function() {
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

CardSchema.methods = {
};

module.exports = mongoose.model('Card', CardSchema);
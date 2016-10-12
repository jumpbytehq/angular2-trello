var path = require('path');

module.exports = function(app) {

  	app.use('/api/lane', require('../api/lane'));
  	app.use('/api/card', require('../api/card'));


	app.route('/*')
    .get(function(req, res) {
    	res.sendFile(path.normalize(app.get('appPath') + '/index.html'));
	});
};

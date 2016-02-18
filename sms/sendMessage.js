var	request     = require('request'),
	clc         = require('cli-color'),
	config      = require('../config');

var contacts = config.map(function(u){
	return request.defaults({
		baseUrl: u.baseUrl,
		qs: {email: u.email, password: u.password}
	});
});
module.exports = function (number, message, callback) {
     contacts[0].post({url: 'messages/send', qs: {device: config[0].deviceId, number: number, message: message}}, 
     	function (err, httpResponse, body) {
         if (err || httpResponse.statusCode != 200) {
             console.log('1');
             console.log(err);
             console.log(body);
             return callback(clc.red('Error'));
         }
         console.log(httpResponse, body);
         callback(err || httpResponse.statusCode != 200);
    });
};
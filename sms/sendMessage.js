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
     contacts[0].post({url: 'messages/send', qs: {device: config[0].deviceId, number: number, message: message.replace(/&#039;/g,'\'')}}, 
     	function (err, httpResponse, body) {
         if (err || httpResponse.statusCode != 200) {
             return callback(clc.red('Error'));
         }
         callback(err || httpResponse.statusCode != 200, body);
    });
};
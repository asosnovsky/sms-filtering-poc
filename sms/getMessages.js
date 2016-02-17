var _           = require('underscore'),
	clc         = require('cli-color'),
	async       = require('async'),
	request     = require('request'),
	read        = require('read'),
	Entities    = require('html-entities').AllHtmlEntities,
	entities    = new Entities(),
	config      = require('../config');

module.exports = function (cb) {
	var decodeMessage = function (messages) {
		tmp = {};usr = [];
		messages.forEach(function(m){
			if(!tmp[m.contact.id]){tmp[m.contact.id]=[];usr.push(m.contact)};
			tmp[m.contact.id].push({
				message: m.message,
				status : m.status
			});
		});
		return {
			messages: tmp,
			usr: 	usr
		};
	};

	var contacts = config.map(function(u){
		return request.defaults({
			baseUrl: u.baseUrl,
			qs: {email: u.email, password: u.password}
		});
	});

	contacts[0].get('messages', function (err, httpResponse, body) {
		if (err || httpResponse.statusCode != 200) {
			console.error('Couldn\'t connect to the API to get the messages');
			return;
		}

		var messages = JSON.parse(body|| {result:[]}).result;
		if (messages.length == 0) {
			console.error(clc.red('No messages to show'));
			return;
		}
		cb(err, decodeMessage(messages));
	});
	// contacts.forEach(function(r){
	// 	var b = [];
		// request.get('messages', function (err, httpResponse, body) {
		// 	if (err || httpResponse.statusCode != 200) {
		// 		console.error('Couldn\'t connect to the API to get the messages');
		// 		return;
		// 	}

		// 	var messages = selectMessages(JSON.parse(body).result || {}, config.messageCount);

		// 	if (messages.length == 0) {
		// 		console.error(clc.red('No messages to show'));
		// 		return;
		// 	}

		// 	cb(err, decodeMessage(messages));
		// });
	// });
}
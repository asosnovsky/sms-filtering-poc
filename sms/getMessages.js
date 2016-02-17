var _           = require('underscore'),
    clc         = require('cli-color'),
    async       = require('async'),
    request     = require('request'),
    read        = require('read'),
    Entities    = require('html-entities').AllHtmlEntities,
    entities    = new Entities(),
    config      = require('../config');

module.exports = function (uname, cb) {
	var selectMessages = function (rawMessages, count) {
	    return _.uniq(rawMessages, false, function (value) { return value.contact.number + '|' + value.message })
	        .splice(0, count)
	        .reverse();
	};

	var printMessages = function (messages) {
	    var ret = [];
	    for (var i = 0; i < messages.length; i++) {
	        var message = messages[i];

	        //var date = message.received_at || message.sent_at;
	        var color = message.received_at ? clc.cyan : clc.white;
	        var arrow = message.received_at ? '→' : '←';

	        // console.log(color('[' + i + '] ' + arrow + ' ' + entities.decode(message.contact.name)));
	        ret.push(entities.decode(message.message));
	    }
	    return ret;
	};
	request = request.defaults({
	    baseUrl: config.baseUrl,
	    qs: {email: config.email, password: config.password}
	});

	request.get('messages', function (err, httpResponse, body) {
	    if (err || httpResponse.statusCode != 200) {
	        console.error('Couldn\'t connect to the API to get the messages');
	        return;
	    }

	    var messages = selectMessages(JSON.parse(body).result || {}, config.messageCount);

	    if (messages.length == 0) {
	        console.error(clc.red('No messages to show'));
	        return;
	    }

	    cb(err, printMessages(messages));
	});
}
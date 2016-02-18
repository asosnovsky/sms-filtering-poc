//-----------------------------------------
//	Server
//-----------------------------------------

/*Requirements*/
var express 	= require('express'),
	csv 		= require('express-csv'),
	bodyParser 	= require('body-parser'),
	fs			= require('fs'),
	url 		= require('url');

/*SMS DEP*/
var getMsg 		= require('./sms/getMessages.js');
var sendMsg		= require('./sms/sendMessage.js');

/*Filters*/
var filters 	= require("./filters/absfilters.js");

/*User Handlers*/
var usrSaver = require("./usr-handler/test.js");

/*Data*/
var contactsData = require("./data/contactsData.js");

/*Setup app*/
var app        = express(); 
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

/*Get Port*/
var port = process.env.PORT || 8080;


//-----------------------------------------
//	Router
//-----------------------------------------
var router = express.Router();  


var classData = {
	"Parent": {
		"fwords": ["pig","mongol"],
		"fsets"	: ["profanities","alchohol"]
	},
	"Boss": {
		"fwords": ["money"],
		"fsets"	: ["profanities","alchohol"]
	},
	"Friend": {
		"fwords": [],
		"fsets"	: []
	},
	"Girlfriend": {
		"fwords": ["Ashley"],
		"fsets"	: []
	}
}

/*Routes*/
app.get('/text', function(req, res) {
	getMsg(function(err,data){
		var query = url.parse(req.url, true).query;
		if(query.phone && query.msg) 	{
			sendMsg(query.phone,query.msg,function(err){
				if(!err) {
					res.send("success");
				}	else	{
					res.send(err);
				}
			});
		}	else	{
			res.send("Failed, phone and msg must be defined.");
		}
	});
});

app.get('/get', function(req, res) {
	getMsg(function(err,data){
		res.json(contactsData.make(data.usr));
	});
});

app.get('/filter_list',function(req,res){
	res.json(Object.keys(filters));
});

app.listen(port);
console.log('Interceptor Server is on ' + port);
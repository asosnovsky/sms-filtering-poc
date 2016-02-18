//-----------------------------------------
//	Server
//-----------------------------------------

/*Requirements*/
var express 	= require('express'),
	csv 		= require('express-csv'),
	bodyParser 	= require('body-parser'),
	fs			= require('fs');

/*SMS DEP*/
var getMsg 		= require('./sms/getMessages');

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
router.get('/', function(req, res) {
	getMsg(function(err,data){
		res.json(contactsData.make(data.usr));
	})
});

app.use('/m', router);

app.listen(port);
console.log('Interceptor Server is on ' + port);
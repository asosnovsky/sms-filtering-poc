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
var testf 		= require("./filters/testFilter.js");

/*User Handlers*/
var usrSaver = require("./usr-handler/test.js");

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

/*Routes*/
router.get('/', function(req, res) {
	getMsg(function(err,data){
		// testf(data.messages["3027776"]);
		usrSaver(data.usr)
		res.json(data)
	})
	
});

app.use('/m', router);

app.listen(port);
console.log('Interceptor Server is on ' + port);
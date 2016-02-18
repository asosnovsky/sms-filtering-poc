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


var contactData = [
	{
		"id"	: "3027776",
		"name"	: "V-Blue Girl",
		"number": "6473839095",
		"class"	: "Girlfriend",
		"fwords": []
	},
	{
		"id"	: "3027932",
		"name"	: "Victoria Tran",
		"number": "6479983217",
		"class"	: "Friend",
		"fwords": []
	},
	{
		"id"	: "3028377",
		"name"	: "Victoria Tran",
		"number": "+1 647-998-3217",
		"class"	: "Friend",
		"fwords": []
	},
	{
		"id"	: "3028138",
		"name"	: "יוסף ביסק",
		"number": "6472349313",
		"class"	: "Friend",
		"fwords": []
	},
	{
		"id"	: "3028289",
		"name"	: "יוסף ביסק",
		"number": "+1 647-234-9313",
		"class"	: "Friend",
		"fwords": []
	},
	{
		"id"	: "3028288",
		"name"	: "V-Blue Girl",
		"number": "+1 647-383-9095",
		"class"	: "Girlfriend",
		"fwords": []
	},
	{
		"id"	: "3028226",
		"name"	: "6472717106",
		"number": "6472717106",
		"class"	: "NA",
		"fwords": []
	},
	{
		"id"	: "3028224",
		"name"	: "(647) 271-7106",
		"number": "(647) 271-7106",
		"class"	: "NA",
		"fwords": []
	},
	{
		"id"	: "3028126",
		"name"	: "Mama",
		"number": "6472151099",
		"class"	: "Parent",
		"fwords": []
	},
	{
		"id"	: "3027858",
		"name"	: "6476680478",
		"number": "6476680478",
		"class"	: "NA",
		"fwords": []
	},
	{
		"id"	: "3027786",
		"name"	: "Test",
		"number": "6475261159",
		"class"	: "NA",
		"fwords": []
	}
]

contactData.forEach(function(u){
	u.number = u.number.replace(/-|\+1| |\(|\)/g,'');
})

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
		res.json(data);
	})
});

app.use('/m', router);

app.listen(port);
console.log('Interceptor Server is on ' + port);
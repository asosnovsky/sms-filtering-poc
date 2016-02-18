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
	},
	"NA": {
		"fwords": [],
		"fsets"	: []
	}
}

/*Routes*/
app.get('/text', function(req, res) {
	getMsg(function(err,data){
		var query = url.parse(req.url, true).query;

		if(query.phone && query.msg) 	{
			var contacts 	= contactsData.make(data.usr);
				contact 	= contacts[query.phone],
				classInfo 	= classData[contact.class],
				fwords 		= contact.fwords.concat(classInfo.fwords)
								.filter(function(d){return d!==null});
				fsets 		= contact.fsets.concat(classInfo.fsets)
								.filter(function(d){return d!==null});
			
			testquery = query.msg.toLowerCase().replace(/\"|\'|&|\*|\?/g,"")
			var bad = false;
			fsets.forEach(function(filter_name){
				bad = bad || filters[filter_name](testquery);
			});
			bad = bad || new RegExp(fwords.map(function(d) {return d.toLowerCase();}).join('|'),'g')
				.test(testquery);
			if(!bad) {
				sendMsg(query.phone,query.msg,function(err,data){
					if(!err) {
						res.json({status:"success",contact:contact});
					}	else	{
						res.send({status:err,contact:contact});
					}
				});
			}	else 	{
				res.send({status:"fail",contact:contact});
			}
		}	else	{
			res.send("Failed, phone and msg must be defined.");
		}
	});
});

app.get('/forcetext', function(req,res){
	var query = url.parse(req.url, true).query;
	sendMsg(query.phone,query.msg,function(err,data){
		if(!err) {
			res.send("success");
		}	else	{
			res.send(err);
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

app.get('/test',function(req,res){
	res.sendfile('index.html');
})
/*HTTP*/
// var http = require("http");
// http.createServer(function (request, response) {
//       response.writeHead(200, {
//          'Content-Type': 'text/plain'
//       });
//       response.write('Simple Simple Fun')
//       response.end();
// }).listen(5002);

app.listen(port);
console.log('Interceptor Server is on ' + port);
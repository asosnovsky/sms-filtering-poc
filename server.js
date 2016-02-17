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
	getMsg('Ari',function(err,data){
		console.log(data);
	})
	res.csv([1,2,3])
});

app.use('/m', router);

app.listen(port);
console.log('Magic happens on port ' + port);
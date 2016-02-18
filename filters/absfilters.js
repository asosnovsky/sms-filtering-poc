var fs = require('fs');

function filterMethod(string, arr) {	
	var bad = new RegExp(
		'\\b'+arr.map(
			function(d){return d.toLowerCase();}).join('\\b|\\b')
		,'g');
	return string.search(bad) > -1;
}

var profJSON;
module.exports.profanities = function (testString){
	if(!profJSON) {profJSON = JSON.parse(fs.readFileSync("data/profanities.json"))};
	return filterMethod(testString, profJSON);
}


module.exports.alcohol = function (testString){
	return filterMethod(testString,["drunk","tipsy","intoxicated","drinking","booze"]);
}

module.exports.drugs = function (testString){
	return  filterMethod(testString,["cocaine","heroin","meth","molly","MDMA","ecstasy", 
										"tripping balls","tripping","shrooms","magic mushrooms","dope"]);
}

module.exports.marijuana = function (testString){
	return  filterMethod(testString,["marijuana","weed","pot","reefer","ganja","hashish","cannabis","maryjane"]);
}

module.exports.criminalActivity = function (testString){
	return  filterMethod(testString,["steal","stole","rape","crime","carjack","incarcerated","jailed","grand theft auto","murder",
		                            	"restraining order","stalk"]);
}

module.exports.sexism = function (testString){
	return  filterMethod(testString,["bitch","whore","slut","toots","tootsie","chick","prostitute","babe","hotstuff","boytoy"]);
}

module.exports.homophobic = function (testString){
	return  filterMethod(testString,["fag","faggot","homo","dyke","butch","prison bitch","tranny"]);
}
module.exports.miscInsults = function (testString){
	return filterMethod(testString,["retard","bastard","sped","idiot","moron","dumb"]);
}

module.exports.politicalReferences = function (testString){
	return filterMethod(testString,["communist","capitalist","fascist","trump","sanders","feminism","feminist"]);
}

module.exports.sexualReferences = function (testString){
	return filterMethod(testString,["dildo","anal","pussy","dick","cunnilingus","BBW","tits","blowjob","bondage",
		                       "bukkake","creampie","cumshots","dp","double penetraion","backroom casting couch",
		                        "fetish","ebony","fisting","gangbang","handjob","hentai","interracial","masturbation","MILF","orgy"]);
}

var fs = require('fs');

function filterMethod(string, arr) {
	var bad = false;
		arr = arr.map(function(d) {return d.toLowerCase();});
		
		string.toLowerCase().split(' ').forEach(function(d){
			bad = bad || (arr.indexOf(d)>-1);
		});
		return bad;
}

var profJSON;
module.exports.profanities = function (testString){
	if(!profJSON) {profJSON = JSON.parse(fs.readFileSync("data/profanities.json"))};
	return filterMethod(testString, profJSON);
}


module.exports.alchohol = function (testString){
	return filterMethod(testString,["drunk","tipsy","intoxicated","drinking","booze"]);
}

module.exports.drugs = function (testString){
	return  filterMethod(testString,["cocaine","heroin","meth","molly","MDMA","ecstasy" 
										"tripping balls","tripping","shrooms","magic mushrooms","dope"]);
}

module.exports.marijuana = function (testString){
	return  filterMethod(testString,["marijuana","weed","pot","reefer","ganja","hashish","cannabis","maryjane"]);
}

module.exports.criminalActivity = function (testString){
	return  filterMethod(testString,["steal","stole","rape","crime","carjack","incarcerated","jailed","grand theft auto","murder"
		                            	"restraining order"]);
}

module.exports.sexism = function (testString){
	return  filterMethod(testString,["bitch","whore","slut","toots","tootsie","chick","prostitute"]);
}

module.exports.homophobic = function (testString){
	return  filterMethod(testString,["fag","faggot","homo","dyke","butch","prison bitch"]);
}
module.exports.miscInsults = function (testString){
	return filterMethod(testString,["retard","bastard","sped","idiot","moron","dumb"]);
}

module.exports.politicalReferences = function (testString){
	return filterMethod(testString,["communist","capitalist","fascist","trump","sanders"]);
}


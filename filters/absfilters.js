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

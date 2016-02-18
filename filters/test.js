var fs = require('fs');
var testString = "ass";

var jsonContent;
module.exports = function (testString){
	if(!jsonContent) {jsonContent = JSON.parse(fs.readFileSync("data/profanities.json"))};

	return (jsonContent.indexOf(testString)>-1);
}
var fs = require('fs');

var jsonContent;
module.exports = function (Messages){
	if(!jsonContent) {jsonContent = JSON.parse(fs.readFileSync("data/profanities.json"))};

	return (jsonContent.indexOf(testString)>-1);
}
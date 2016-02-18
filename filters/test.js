var fs = require('fs');
var testString = "ass";

/*Checks a string- works
var testString = "ar53 and yes";

module.exports = function (Messages){
	var check = testString.search("ar53");
	if (check >= 0)
	{
		console.log("Profanity found");
	}

	else
	{
		console.log("No profanity");
	}
	//fs.readsink

} */

module.exports = function (Messages){
	//var check = testString.search(profanities);
	var contents = fs.readFileSync("data/profanities.json");

	var jsonContent = JSON.parse(contents);
	//console.log(jsonContent);



	if (jsonContent.indexOf(testString)) {

		console.log("Yes");
	}

	else
	{
		console.log("Noooooo");
	}

	/*if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
  };
}*/

}
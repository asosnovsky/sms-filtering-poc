
var fs = require('fs');

module.exports.make = function(contactData) {
	if(fs.existsSync('./data/contactData.json')) {
		return JSON.parse(fs.readFileSync('./data/contactData.json'));
	}	else 	{
		var cData = {}
		contactData.forEach(function(u){
			var number = u.number.replace(/-|\+1| |\(|\)/g,'');
			if(!cData[number]) cData[number] = [];
			cData[number].push(u);
		});

		nData = {};
		Object.keys(cData).forEach(function(number){
			var ret = {name:[],fwords:[]};
			cData[number].forEach(function(a){
				ret.name.push(a.name);
				ret.fwords.push(a.fwords);
			});
			ret.fwords = ret.fwords.filter(function(elem, pos) {
				return ret.fwords.indexOf(elem) == pos;
			})
			ret.name = ret.name.filter(function(elem, pos) {
				return ret.name.indexOf(elem) == pos;
			})
			ret["class"] = "NA";
			ret["fsets"] = [];
			nData[number] = ret;
		});

		fs.writeFileSync('./data/contactData.json',JSON.stringify(nData));
		return nData;
	};
}
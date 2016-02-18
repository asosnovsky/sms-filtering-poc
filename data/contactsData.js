
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

		cData = Object.keys(cData).map(function(number){
			var ret = {id:[],name:[],class:false,fwords:[]};
			cData[number].forEach(function(a){
				ret.id.push(a.id);
				ret.name.push(a.name);
				ret.fwords.push(a.fwords);
				ret.class = a.class;
			});
			ret.number = number;
			ret.id = ret.id.filter(function(elem, pos) {
				return ret.id.indexOf(elem) == pos;
			})
			ret.fwords = ret.fwords.filter(function(elem, pos) {
				return ret.fwords.indexOf(elem) == pos;
			})
			ret.name = ret.name.filter(function(elem, pos) {
				return ret.name.indexOf(elem) == pos;
			})
			return ret;
		});

		fs.writeFileSync('./data/contactData.json',JSON.stringify(cData));
		return cData;
	};
}
'use strict';
var Final = require('../../models/final');
var Tables = require('./tables');
var Rewrite = {

	birthday : function(user){
		var zodiacSign = user.Astrology.trim().toLowerCase();
		//console.log("8: " + zodiacSign);
		if (zodiacSign !== "eastern leo" || zodiacSign !== "ethnicity"){
			try {
				//console.log("trying to get date for: " + zodiacSign);
				var zodiacStartDate = Tables.birthday[zodiacSign].startDate;
			}
			catch (e){
				return user.birthday
				console.log(e);
			}
			var age = user.Age;
			var d = new Date();
			var birthYear = d.getFullYear() - age;
			var birthDate = zodiacStartDate + " " + birthYear;

			return birthDate;
		}

		return user.birthday;
	},

	bodyType: function(user){

		var sex = user.sex;
		var bodies = Tables.body[sex.trim().toUpperCase().slice(0,1)];

		for (var body in bodies) {
			if (bodies[body] == user.body.trim()){
				return body;
			}
		}

		// pass back the input if nothing was matched
		return user.body;
	},
	type : function(user){

		var type = user.type.trim();
		var relTypes = Tables.type;
		for (var rel in relTypes){
			if (relTypes[rel] === type){
				return rel;
			}
		}

		// pass back the input if nothing was matched
		return user.type;
	}

};

module.exports = Rewrite;
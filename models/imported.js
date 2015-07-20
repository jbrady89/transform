// object to store the imported stuff
var mongoose = require('mongoose'),
	States = require('../models/states'),
	Schema = mongoose.Schema;

var ImportedUserSchema = new Schema({

	profileUrl: String,
	profileName: String,
	profileHeadline: String,
	City: String,
	Gender: String,
	Age: String,
	BodyType: String,
	Education: {type: String, default: ''},
	Ethnicity: {type: String, default: ''},
	HairColor: String,
	Smoker: String, 
	Height: String,
	Intent: {type: String, default: ''},
	Interests: Array,
	Personality: {type: String, default: ''},
	Profession: {type: String, default: ''},
	Religion: String,
	firstdate: String,
	Description: String,
	State: {type: String, default: null},
	saveDate: String,
	pictures: Array,
	Info: Array

}, { strict: false });

ImportedUserSchema.set('toObject', {getters: true, virtuals: true});

ImportedUserSchema.virtual('cityAndState').get(function() { 
	console.log("37: " + this.City, this.State);
	if (this.City.indexOf(',') !== -1){
		var cityAndState = this.City.split(',');
		var city = cityAndState[0];
		var state = cityAndState[1];
		//console.log("42: " + State.getAbbreviation(state.trim()));

		return city + ', ' + States.getAbbreviation(state.trim());
	} else if (this.City && this.State){
		//console.log(this.City, this.State);
		//console.log(States.getAbbreviation(this.State.trim()))
		var state = this.State;
		var city = this.City;
		return this.City + ', ' + States.getAbbreviation(state.trim());
	} else {
		return null;
	}
});

module.exports = mongoose.model('ImportedUser', ImportedUserSchema);
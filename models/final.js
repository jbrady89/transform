var mongoose = require('mongoose');
var States = require('./states');
var Locations = require('./locations');

var Schema = mongoose.Schema;
var FinalSchema = new Schema({

	__v : Number,
	Age: {type: String, default: ''},
	ambitionSelf : {type: String, default: ''},
	Astrology: {type: String, default: ''},
	banned: Boolean,
	birthday: {type: Date, default: ''},
	body: {type: String, default: ''},
	colorEyes: {type: String, default: ''},
	Description: {type: String, default: ''},
	doDrugs: {type: String, default: ''},
	drinker: {type: String, default: ''},
	Education: {type: String, default: ''},
	email: {type: String, default: ''},
	Ethnicity: {type: String, default: ''},
	firstdate: {type: String, default: ''},
	firstName: {type: String, default: ''},
	HairColor: {type: String, default: ''},
	hashedPassword: {type: String, default: ''},
	hasQuestions: Boolean,
	haveCar: {type: String, default: ''},
	Height: {type: String, default: ''},
	Intent: {type: String, default: ''},
	interests: Array,
	kidsHave: {type: String, default: ''},
	kidsWant: {type: String, default: ''},
	lastName: {type: String, default: ''},
	location: Array,
	locationName: {type: String, default: ''},
	longestRel: {type: String, default: ''},
	looking: {type: String, default: ''},
	petsHave: {type: String, default: ''},
	pictures: Array,
	Personality: {type: String, default: ''},
	Profession: {type: String, default: ''},
	profileHeadline: {type: String, default: ''},
	profilePicture: {type: String, default: ''},
	profileUrl: {type: String, default: ''},
	provider: {type: String, default: ''},
	Religion: {type: String, default: ''},
	relStat: {type: String, default: ''},
	role: {type: String, default: ''},
	salt: {type: String, default: ''},
	saveDate: Date,
	sex: {type: String, default: ''},
	sleep: {type: Boolean, default: false},
	Smoker: {type: String, default: ''},
	type: {type: String, default: ''},
	username: {type: String, default: ''},
});

FinalSchema.pre('save', function (next) {

	var finalSchema = this;

	// access the getCoords method from states.js
	// passing in the locationName, a copy of the schema, a callback function, and a reference t the next method
	// this function returns the latitude and longitude for the user's locationName property
	Locations.findOne({location : finalSchema.locationName}, function(err, location){
		var loc = location;
		if (err){
			console.log("68 no record exists");
		} else if (!location){
			States
				.getCoords(finalSchema.locationName, finalSchema, function(coords, next){

					if (coords.length) {
						this.location = coords;

						var locationData = {
							location:this.locationName,
							latitude: this.location[0],
							longitude: this.location[1]
						},
						location = new Locations(locationData);
						
						location.save(function(err, loc){
							if (err){
								console.log("90 error: " + err);
								next();
							} else {
								console.log(loc);
								next();
							}
						});

					} else {
					
						console.log("coordinates were not found for: ", loc);
						next();
					}

				}, next);
		} else {
			finalSchema.location = [ location.latitude, location.longitude ];
			next();
		}
	});
});

module.exports = mongoose.model('Final', FinalSchema);
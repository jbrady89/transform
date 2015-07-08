var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var FinalSchema = new Schema({
	//_id : Schema.ObjectId,
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

// this will capitalize the first letter of every chunk in a string
var capitalize = function(str){

 	return str.replace(/\w+/g, function(txt) { 
 		return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
 	});
};

FinalSchema.pre('save', function (next) {

  this.locationName = capitalize(this.locationName);

  next();
});

module.exports = mongoose.model('Final', FinalSchema);
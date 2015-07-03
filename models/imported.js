// object to store the imported stuff
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
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
	saveDate: String,
	pictures: Array,
	Info: Array
}, { strict: false });

ImportedUserSchema.set('toObject', {getters: true, setters: true});

module.exports = mongoose.model('ImportedUser', ImportedUserSchema);
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
	HairColor: String,
	Smoker: String, 
	Height: String,
	Religion: String,
	firstDate: String,
	Description: String,
	saveDate: String,
	pictures: Array,
	Interests: Array,
	Info: Array
}, { strict: false });

ImportedUserSchema.set('toObject', {getters: true, setters: true});

module.exports = mongoose.model('ImportedUser', ImportedUserSchema);
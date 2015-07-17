var mongoose = require('mongoose');
var States = require('./states');

var Schema = mongoose.Schema;
var LocationSchema = new Schema({
		location : String,
		latitude : String,
		longitude : String
	});

mongoose.model('Location', LocationSchema);


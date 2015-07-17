var mongoose = require('mongoose');
var States = require('./states');
//var findOrCreate = require('mongoose-findorcreate')


var Schema = mongoose.Schema;
var LocationSchema = new Schema({
		location : String,
		latitude : String,
		longitude : String
	});

//LocationSchema.plugin(findOrCreate);

module.exports = mongoose.model('Locations', LocationSchema);


var _ = require("underscore"),
	mongoose = require("mongoose"),
	Rewrite = require('./models/rewrite'),
	Final = require('../models/final'),
	Schema = mongoose.Schema;

var dbs = ["mongodb://test:test@ds061218.mongolab.com:61218/dest2", "mongodb://localhost/transform"];
var db = dbs[0];

mongoose.connect(db);

Final.find({}, function(err, users){

	if (err) console.log(err);
	users.forEach(function(user){
		var updates = {

			body : Rewrite.bodyType(user),
			//birthday : Rewrite.birthday(user),
			type : Rewrite.type(user)

		};

		Final.update({_id : user._id}, updates, function(err, success){

			console.log(success);
			//console.log("update was successful");
			
		});
	});
	mongoose.connection.close();
});





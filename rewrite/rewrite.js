var _ = require("underscore"),
	Promise = require('bluebird'),
	mongoose = Promise.promisifyAll(require('mongoose')),
	async = require('async'),	
	Rewrite = require('./models/rewrite'),
	Final = require('../models/final'),
	Schema = mongoose.Schema;

var dbs = ["mongodb://test:test@ds061218.mongolab.com:61218/dest2", "mongodb://localhost/transform"];
var db = dbs[0];

mongoose.connect(db);

var update = function(users){

	var promises = users.map(function(user){

		var updates = {
				body : Rewrite.bodyType(user),
				birthday : new Date(Rewrite.birthday(user)),
				type : Rewrite.type(user)
			};

		return Final.updateAsync({_id : user._id}, updates)
					.then(function(success){

						console.log(success);
					}, function(err){

						console.log(err);
						
					});

	});
	Promise.all(promises)
	.then(function() { 
		console.log('updates complete');
	})
	.error(console.error)
	.finally(function(){
		process.exit();
	});

}

Final.find({}, function(err, users){

	if (err) console.log(err);

	update(users);
	//mongoose.connection.close();
});





var _ = require("underscore");
var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

console.log("connection to db...");
var db = "mongodb://localhost/transform";
mongoose.connect(db);

var Current = require("./models/current");
var Imported = require("./models/imported");
var Final = require("./models/final");

var ImportedData = {
					"profileUrl" : "http://www.profileUrl.com/profile_id=123456",
					"profileName" : "CuteJewishGirl",
					"profileHeadline" : " Jewish NYC Girl Looking For A Jewish Guy!",
					"City" : "New york city, New York",
					"Gender" : " Female",
					"Age" : " 41",
					"BodyType" : " Average body type",
					"HairColor" : " Brown",
					"Smoker" : " Non-Smoker ",
					"Height" : " 5' 5\" (165cm)",
					"Religion" : " Jewish",
					"firstDate" : "Drinks and dinner.",
					"Description" : " I love action and comedy movies",
					"saveDate" : "Fri Jun 05 2015 22:48:03 GMT+0000 (UTC)",
					"_id" : mongoose.Types.ObjectId("55722723b5ff5ff63dfd9f94"), // this constructs a new ObjectId, otherwise we get an error becaus ObjectId is undefined
					"pictures" : ["http://www.profileUrl.com/profile_id=123456.2.jpg"],
					"Interests" : ["Comedy", "Dining out", "Beach", "Boating", "Travel"],
					"Info" : ["I am Seeking a: Man", "For: Long Term", "Needs Test: Not Completed", "Chemistry: ", "\nView her chemistry results", "Do you drink?: Socially", "Do you want children?: Want children", "Marital Status: Single: \nDo you do drugs?: No", "Pets: Dog", "Eye Color:Hazel", "Do you have a car?:No", "Do you have children?:No", "Longest Relationship: Over 1 year", "How ambitious are you?:Ambitious"],
					"__v" : 0
		};

var CurrentData = {
	  "_id" : mongoose.Types.ObjectId("5585798caf2335f5490a1e5c"),
	  "provider" : "local",
	  "type" : "date",
	  "sex" : "f",
	  "looking" : "m",
	  "body" : "girl_fit",
	  "firstName" : "Cindy",
	  "lastName" : "Lee",
	  "birthday" : new Date("1990-08-24T05:00:00Z"),
	  "email" : "greatone@gmail.com",
	  "hashedPassword" : "dIV9FXDget/jB15UlvHnCBrxAhQN2vjYoACv5BxGPYYs2osOpCs6z5zWHe8P7CgEk9hdeNvIogahnbrWfrat7Q==",
	  "salt" : "IbprSckatPkc3smwF6HDlA==",
	  "username" : "cindyl",
	  "locationName" : "Austin, TX, USA",
	  "location" : [-97.743060799999967, 30.267153],
	  "hasQuestions" : false,
	  "banned" : false,
	  "sleep" : false,
	  "interests" : [],
	  "profilePicture" : "",
	  "pictures" : [],
	  "role" : "user",
	  "__v" : 0
}
var matchingKeys = ["_id", "__v", "pictures", "saveDate", "Description", "firstDate", "Religion", "Height", "Smoker", "Age"];
var importUsers = function(){

		// get all the documents using the old schema
		Imported.find({}, function(err, importedUsers){
			if (err) console.log("Error: " + err);
			var imported = importedUsers;
			//console.log(importedUsers);

			Current.find({}, function(err, currentSchemaUsers){
				if (err) console.log("error: " + err);
				var merged = _.map(currentSchemaUsers, function(obj, index) {
					//console.log(index);
					console.log(imported[index]);
					var currentSchemaObj = obj.toObject();
					var importSchemaObj = imported[index].toObject();
					var mergedObj = {};
					_.extend(mergedObj, currentSchemaObj, importSchemaObj);
					console.log(_.keys(mergedObj));

					var oldKeysToChange = 	['BodyType', 'Interests', 'City', 'Gender', 'profileName'];
					var newKeyNames 	= 	['body', 'interests', 'locationName', 'sex', 'username'];
					
					oldKeysToChange.forEach(function(key, index){
						mergedObj[newKeyNames[index]] = mergedObj[key];
						delete mergedObj[key];
					});

					return mergedObj;
				});
				transform(merged);
				//saveNewUsers(merged);
			});
		});
	},
	transform = function(merged){

		// create an array of the transformed data
		var transformedUsers = _.map(merged, function(newUserObj){

			// loops through the merged properties and add new ones to create the final ouput
			var joinedFields = newUserObj.Info[7];
			var splitFields = joinedFields.split('\n');
			newUserObj.Info.splice(7,1);
			newUserObj.Info = [].concat.call(newUserObj.Info, splitFields);

			newUserObj.profilePicture = newUserObj.pictures[0];
			var info = newUserObj.Info;
			newUserObj.looking = info[0];
			newUserObj.relStat = info[13];
			newUserObj.petsHave = info[7];
			newUserObj.longestRel = info[11];
			newUserObj.kidsWant = info[6];
			newUserObj.kidsHave = info[10];
			newUserObj.haveCar = info[9];
			newUserObj.drinker = info[5];
			newUserObj.doDrugs = info[14];
			newUserObj.colorEyes = info[8];
			newUserObj.ambitionSelf = info[12];

			delete newUserObj.Info;
			delete newUserObj.id;
			return newUserObj;
		});

		// return our new array of transformed user objects
		//return transformedUsers;
		saveNewUsers(transformedUsers);

	},

	// post route
	saveNewUsers = function(profiles){

		// Save transformed data using new schema
		console.log(profiles);
		var User = new Final(profiles);
		// bulk insert
		Final.collection.insert(profiles, onInsert);
		//var onInsert = function(err, data){
			// one by one
		/*User.save(function(err, data){
			if (err) console.log("Error: " + err);

			// log the output of the saved document
			console.log("user was saved: \n" + data);
		});*/
		function onInsert(err, docs){
			if (err) console.log(err);

			console.log(docs);
		}

		//User.collection.insert(profiles, onInsert);
	},
	PrepareMockData = function(){

		var imported = new Imported(ImportedData);
		imported.save(function(err, data){
			if (err) console.log("error: " + err);
		});
		var current = new Current(CurrentData);
		current.save(function(err, data){
			if (err) console.log("error: " + err);
		});

		importUsers();

	}
	PrepareMockData();
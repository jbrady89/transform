var _ = require("underscore");
var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

console.log("connection to db...\n");
var dbs = ["mongodb://test:test@ds061218.mongolab.com:61218/dest2", "mongodb://localhost/transform"];
var db = dbs[0];

mongoose.connect(db);

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
						"Ethnicity" : "White",
						"Education" : "College",
						"Intent" : "Dating",
						"Profession" : "Lawyer",
						"Personality" : "Outgoing",
						"Religion" : " Jewish",
						"State" : "New York",
						"firstDate" : "Drinks and dinner.",
						"Description" : " I love action and comedy movies",
						"saveDate" : "Fri Jun 05 2015 22:48:03 GMT+0000 (UTC)",
						//"_id" : mongoose.Types.ObjectId("55722723b5ff5ff63dfd9f94"), // this constructs a new ObjectId, otherwise we get an error becaus ObjectId is undefined
						"pictures" : ["http://www.profileUrl.com/profile_id=123456.2.jpg"],
						"Interests" : ["Comedy", "Dining out", "Beach", "Boating", "Travel"],
						"Info" : ["I am Seeking a: Man", "For: Long Term", "Needs Test: Not Completed", "Chemistry: ", "\nView her chemistry results", "Do you drink?: Socially", "Do you want children?: Want children", "Marital Status: Single: \nDo you do drugs?: No", "Pets: Dog", "Eye Color:Hazel", "Do you have a car?:No", "Do you have children?:No", "Longest Relationship: Over 1 year", "How ambitious are you?:Ambitious"],
						"__v" : 0
					};


var count = 0;
var importUsers = function(){

		// get the first document in the collection
		Imported.findOne({}, function(err, importedUser){
			if (err) console.log("Error: " + err);

			// ths returns true when there are no more records
			if (importedUser == null) {
				console.log("no more records!");
				console.log("exiting now...");
				process.exit();
			}
			var imported = importedUser.toObject();
			transform(imported);
		});
	},
	transform = function(newUserObj){
		console.log("53: " + newUserObj.Info);
		//console.log(newUserObj.Info);

		var infoKeys = [];

		var infoValues = _.map(newUserObj.Info, function(item, index){

			if (item.match(/\: ([^:]+)\:/)) {
				var matches = item.match(/\:([^:]+)\:/);
				//console.log(matches);
				var item = item.replace(matches[0],":" + matches[1]);
				var items = item.split("\n");

				var values = _.map(items, function(item){
					var vals = item.split(":");
				 	infoKeys.push(vals[0])
					return vals[1] || '';
				});

				return values;
				
			}
			
			var items = item.split(':');
			infoKeys.push(items[0])
			return items[1]
		});

		//console.log(infoKeys);
		//console.log(infoValues);
		var info = _.chain(_.object(infoKeys, _.flatten(infoValues)))
						   .omit(["Needs Test", "Chemistry", "\nView her chemistry results"])
						   .value();



		newUserObj.profilePicture = newUserObj.pictures[0];
		//newUserObj.locationName = newUserObj.City.indexOf(",") !== -1 ? newUserObj.City.split(',')[0] + ', ' + newUserObj.State : newUserObj.City + ", "  + newUserObj.State;
		console.log(newUserObj.locationName);
		//console.log(newUserObj.locationName);
		
		var oldKeyNames = ['BodyType', 'Interests', 'Gender', 'profileName'];
		var newKeyNames = ['body', 'interests', 'sex','username'];
		
		newKeyNames.forEach(function(key, index){
			newUserObj[key] = newUserObj[oldKeyNames[index]];
		});

		var profileId = newUserObj.profileUrl.substring(newUserObj.profileUrl.indexOf("=") + 1);
		//console.log(profileId);
		
		var newProps = {
							looking : info['I am Seeking a'],
							relStat : info['Marital Status'],
							petsHave : info['Pets'],
							longestRel : info['Longest Relationship'],
							kidsWant : info['Do you want children?'],
							kidsHave : info['Do you have children?'],
							haveCar : info['Do you have a car?'],
							drinker : info['Do you drink?'],
							doDrugs : info['Do you do drugs?'],
							type : info['For'],
							colorEyes : info['Eye Color'],
							ambitionSelf : info['How ambitious are you?'],
							Astrology : newUserObj.Astrology || '',
							firstName : '',
							lastName : '',
							birthday : '',
							email : profileId + '@ddprof.com',
							hashedPassword : '',
							salt : '',
							provider: 'local',
							role : 'user',
							sleep: false,
							hasQuestions : false,
							banned : false,
							location : []
						}

		var newUserObj = _.extend(newUserObj, newProps);
		//console.log(newUserObj);
		//process.exit();
		saveNewUser(newUserObj);

	},

	// post route
	saveNewUser = function(profile){

		// Save transformed data using new schema
		var User = new Final(profile);
		User.save(function(err, data){
			if (err) console.log("Error: " + err);

			else {
				count++;
				console.log(count + " users have been saved");
				console.log("deleting old record");

				Imported.findOneAndRemove({}, function(err, doc){
					if (err) console.log("Error: " + err);

					console.log("document was successfully deleted!");
					console.log("getting another one...\n\n");
					importUsers();
				});

			}
		});

	},
	PrepareMockData = function(){

		var imported = new Imported(ImportedData);
		Imported.find({}, function(err, data){
			//console.log(data);
			//process.exit();
			if (data == ''){
				console.log(true);
				console.log("importing some mock data...");
				imported.save(function(err, data){

					if (err) console.log("error: " + err);

					importUsers();
				});
			} else {

				console.log("data already imported");
				importUsers();
			}
		}); 
	}

	PrepareMockData();
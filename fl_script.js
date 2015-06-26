var _ = require("underscore");
var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

console.log("connection to db...\n");
var db = "mongodb://localhost/transform";
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
						"Religion" : " Jewish",
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
		//console.log(newUserObj);
		var joinedFields = newUserObj.Info[7];
		var splitFields = joinedFields.split('\n');
		newUserObj.Info.splice(7,1);
		newUserObj.Info = [].concat.call(newUserObj.Info, splitFields);
		newUserObj.profilePicture = newUserObj.pictures[0];
		var info = newUserObj.Info;
		info[13] = info[13].match(/\: ([^:]+)\:/)[1];

		// extract values from old string
		var info = _.map(info, function(s){
			if (s.indexOf(": ") !== -1){
				var s = s.substr(s.indexOf(":") + 2);
			} else {
				var s = s.substr(s.indexOf(":") + 1);
			}
			return s;
		});
		//console.log(newUserObj);
		var oldKeyNames = ['BodyType', 'Interests', 'City', 'Gender', 'profileName'];
		var newKeyNames = ['body', 'interest', 'locationName', 'sex','username'];
		
		newKeyNames.forEach(function(key, index){
			newUserObj[key] = newUserObj[oldKeyNames[index]];
		});

		var newProps = {
							looking : info[0],
							relStat : info[13],
							petsHave : info[7],
							longestRel : info[11],
							kidsWant : info[6],
							kidsHave : info[10],
							haveCar : info[9],
							drinker : info[5],
							doDrugs : info[14],
							colorEyes : info[8],
							ambitionSelf : info[12],
							firstName : '',
							lastName : '',
							birthday : '',
							email : 'profiles@ddprof.com',
							hashedPassword : '',
							salt : '',
							hasQuestions : false,
							banned : false,
							location : []
						}

		var newUserObj = _.extend(newUserObj, newProps);

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
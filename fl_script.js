// Version v.0.4.4
// July 20, 2015 04:40 UTC
// added Second Language field and more flexible info parsing

var _ = require("underscore");
var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

console.log("connecting to db...\n");
var dbs = ["mongodb://test:test@ds061218.mongolab.com:61218/dest2", 
			"mongodb://localhost/transform",


			];
var db = dbs[0];

mongoose.connect(db);

var Imported = require("./models/imported");
var Final = require("./models/final");
//var States = require("./models/states");
//console.log(States);
//process.exit();

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

			} else {
				var imported = importedUser.toObject();
				delete imported._id;
				transform(imported);
			}

		});
	},
	transform = function(newUserObj){
		//console.log("53: " + newUserObj.Info);
		//console.log(newUserObj.Info);

		var infoKeys = [];
		var testArr = [];
		var infoValues = [];
		var infoValues = _.map(newUserObj.Info, function(item, index){
			//var item = item.replace(/\n/igm, ' ');
			//testArr.push(item);
			var item = item.replace(/[^a-zA-Z0-9&?:\/\s]/, '');
			if (item.match(/\: ([^:]+)\:/)) {
				var matches = item.match(/\:([^:]+)\:/);
				//console.log(matches);
				//console.log(matches);
				var item = item.replace(matches[0],":" + matches[1]).trim();
				//console.log(item);
				//console.log(item);
				var items = item.split("\n");
				//console.log(items);
				var values = _.map(items, function(item){
					var vals = item.split(":");
					//console.log("key value: " + vals[0].replace(/([A-Za-z0-9])([\n]+)(?=[A-Za-z0-9])/, ': '));
				 	infoKeys.push(vals[0].trim());
					return vals[1] || '';
				});
				//console.log(values);
				return values;
				
			}
			
			var items = item.split(':')
			/*if (item.match(/(Pets)(!?=:)/)) {
				console.log(item);
				process.exit();
			}*/

			if (item.match(/Eye Color|Pets/)){
				//console.log("111: " + item);
				//process.exit();
				var b = item.match(/([A-Za-z]+).*([A-Za-z]+)/igm);
				console.log(b);
				//console.log(matches.slice(1));
				//console.log(matches);
				//console.log(item);
				//console.log(b);
				//console.log("113: " + b);
				if (b.length > 1){
					var extraValues = [];
					b.forEach(function(a, index){
						//var abc = a.match(/([A-Za-z0-9\s]+):([A-Za-z0-9]+)/g);
						//console.log(abc);
						//console.log("118: " + a);
						console.log("126: " + a);
						
						/*if (a.match(/Hair Color/)){
							console.log("hair color");
							process.exit();
						}*/
						/*if (a.match(/Pets(!?=:)/)){
								console.log("124: " + a);
								if (index % 2 == 0){
									infoKeys.push(a);

								} else {
									infoValues.push(a);
									
								}
								process.exit();

							}*/
						if (index % 2 == 0){
							//console.log("114: " + a);
							//console.log(matches);
							if (a.match(/Pets|Second Language/)){
								//console.log("in block" + a);
								infoKeys.push(a);
								//continue;
								return;
							} else {

							
							
								var abc = a.match(/([A-Za-z0-9\s]*):([A-Za-z0-9]*)/m);
								//console.log(abc[1], abc[2]);

								if (a.indexOf(':') !== -1){
									var a = a.split(':');
									//console.log("124: " + a);
									a[1].replace(/[()]/, '')
									extraValues.push(a[1]);
									infoKeys.push(a[0]);
									//return a[1];
								} else {
									a.replace(/[()]/, '')
									extraValues.push(a);

								}
							}
							//console.log(infoValues);
							//console.log(infoKeys);
						} else {
							//console.log("117: " + a);
							if (b[index-1].match(/Pets|Second Language/)){
								//console.log("in block" + a);
								a.replace(/[()]/, '');
								extraValues.push(a);
							} else {
								infoKeys.push(a);
							}
							//return items[1];
						}
						//console.log("125" + abc);
						//console.log(infoValues);

					});
					//console.log(extraValues);
					//process.exit();
					return extraValues;

					//console.log(infoValues);
					//console.log(infoKeys);
				}
				//console.log("138" + infoValues);
				//console.log(infoKeys);
				//process.exit();
			} else {
				//console.log(item);
			}

			//console.log("non-edited key: " + items[0].replace(/([A-Za-z0-9])([\n]+)(?=[A-Za-z0-9])/, ''));
			
			infoKeys.push(items[0].trim());

			return items[1];
		});

		

		//console.log(infoValues);
		//console.log(infoKeys);
		//process.exit();

		var info = _.chain(_.object(infoKeys, _.flatten(infoValues)))
						   .omit(["Needs Test", "Chemistry", "\nView her chemistry results"])
						   .value();
		//console.log(info);
		//process.exit();

		newUserObj.profilePicture = newUserObj.pictures[0];

		//newUserObj.locationName = newUserObj.City.indexOf(",") !== -1 ? newUserObj.City : newUserObj.City + ", "  + newUserObj.State;
		//console.log(newUserObj.locationName);
		//process.exit();
		//console.log(newUserObj.locationName);
		
		var oldKeyNames = ['BodyType', 'Interests', 'Gender', 'profileName'];
		var newKeyNames = ['body', 'interests', 'sex','username'];
		
		newKeyNames.forEach(function(key, index){
			newUserObj[key] = newUserObj[oldKeyNames[index]];
		});

		var profileId = newUserObj.profileUrl.substring(newUserObj.profileUrl.indexOf("=") + 1);
		//console.log(profileId);
		//console.log("118: " + JSON.stringify(newUserObj));
		//process.exit();
		var newProps = {
							looking : info['I am Seeking a'] ? info['I am Seeking a'].trim().toUpperCase().slice(0,1) : info['I am Seeking a'],
							relStat : info['Marital Status'],
							petsHave : info['Pets'],
							longestRel : info['Longest Relationship'],
							kidsWant : info['Do you want children?'],
							kidsHave : info['Do you have children'],
							haveCar : info['Do you have a car?'],
							drinker : info['Do you drink?'],
							doDrugs : info['Do you do drugs?'],
							type : info['For'],
							colorEyes : info['Eye Color'],
							HairColor: info['Hair Color']? info['Hair Color'] : newUserObj.HairColor,
							ambitionSelf : info['How ambitious are you?'],
							SecondLanguage : info['Second Language'],
							Astrology : newUserObj.Astrology,
							locationName : newUserObj.cityAndState,
							firstName : '',
							lastName : '',
							birthday : '',
							email : profileId + '@ddprof.com',
							hashedPassword : '',
							salt : '',
							provider: 'local',
							role : 'user',
							sleep: false,
							sex : newUserObj.sex.trim().toUpperCase().slice(0,1),
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
		//console.log(User);
		User.save(function(err, data){
			if (err) {
				console.log("Error: " + err);
				User.update({_id : User._id}, User, function(err, data){
					if (err) console.log("error: " + err);
					else {
						console.log("data was updated");
					}
				});
			}

			else {
				count++;
				console.log(count + " users have been saved");
				console.log("175: " + data.location, data.locationName);
				console.log("deleting old record");
			}
			Imported.findOneAndRemove({}, function(err, doc){
				if (err) console.log("Error: " + err);

				console.log("document was successfully deleted!");
				console.log("getting another one...\n\n");
				importUsers();
			});

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
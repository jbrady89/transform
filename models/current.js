  var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CurrentSchema = new Schema({
  _id : Schema.ObjectId,
  __v : Number,
  role : String,
  pictures: Array,
  profilePicture: String,
  interests: Array,
  sleep: Boolean,
  banned: Boolean,
  hasQuestions: Boolean,
  location: Array,
  locationName: String,
  username: String,
  salt: String,
  hashedPassword: String,
  email: String,
  birthday: Date,
  lastName: String,
  firstName: String,
  body: String,
  looking: String,
  sex: String,
  type: String,
  provider: String

});

CurrentSchema.set('toObject', {getters: true, setters: true});


module.exports = mongoose.model('Current', CurrentSchema);
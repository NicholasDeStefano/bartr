// User Schema

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: { type: String },
    name: { type: String },  
    date  : {type : Date, default : Date.now}
});


mongoose.model('User', UserSchema)

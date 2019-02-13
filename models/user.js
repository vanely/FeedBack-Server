const mongoose = require('mongoose');

//equiv to (const schema = mongoose.Schema)
//destructor for schema;
const {Schema} = mongoose;

//the structure for our records that will contain users
//creating property that will store googleID and setting value type to String. Type can also be Number 
//can freely add or subtract properties without breaking anything
const userSchema = new Schema({
    googleID: String

});

//telling mongo that we want to create a new collection users containing records with the format of 'userSchema'
//mongoose can't overwrite existing collections, only create them if they don't already exist
mongoose.model('users', userSchema);
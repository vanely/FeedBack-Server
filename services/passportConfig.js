const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
//the google-oauth module comes with several properties. We only want the (Strategy)

//when model takes 2 args. We are creating/ loading a schema into mongoose.
//when it takes one. We are fetching a schema
const user = mongoose.model('users');

//connect passport to google strategy(create a new instance of the strategy) config
//console.developers.google.com(oauth API will generate "clientID", and "clientSecret")
passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },

        (accessToken, refreshToken, profile, done) => {
            
            //uses googleID property defined in schema and assigns it profile.id from authentication json and implements the save() method to save it to database
            new user({googleID: profile.id}).save
        }
    )
);
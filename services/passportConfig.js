const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
//the google-oauth module comes with several properties. We only want the (Strategy)

//when model takes 2 args. We are creating/ loading a schema into mongoose.
//when it takes one. We are fetching a schema
//allways import a model into another file using this method to prevent accidental model duplication when testing.
const User = mongoose.model('users');

//connect passport to google strategy(create a new instance of the strategy) config
//console.developers.google.com(oauth API will generate "clientID", and "clientSecret")
passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },

        (accessToken, refreshToken, profile, done) => {
            
            User.findOne({googleID: profile.id})
            .then((existingUser) => {
                
                if(existingUser) {
                    
                    //already have user in DB, return it with done()
                    done(null, existingUser);
                }
                else {
                    
                    //uses googleID property defined in schema and assigns it profile.id from authentication json and implements the save() method to save it to database
                    new User({googleID: profile.id})
                    .save()
                    .then((user) => {
                        done((null, user)); 
                    });
                }
            })
        }
    )
);
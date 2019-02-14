const passport = require('passport');
//the google-oauth module comes with several properties. We only want the (Strategy)
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

//when model takes 2 args. We are creating/ loading a schema into mongoose.
//when it takes one. We are fetching a collection/schema
//always import a model into another file using this method to prevent accidental model duplication when testing.
const User = mongoose.model('users');

//will take the user model fetched ^(callback param 'user' represents the user object)
passport.serializeUser((user, done) => {

    //first param of done is an error
    //user.id is mongo record id(incase different auth strategies are used)instead of strategies' profile.id
    done(null, user.id);
});

//when deserializeUser is called we get the user id that gets passed into the cookie
passport.deserializeUser((id, done) => {
    
    //find functions fetch record data from mongo collections
    User.findById(id)
    .then(user => {
        console.log(user)
        done(null, user);
    })
    .catch(err => console.log(err));
});

//connect passport to google strategy(create a new instance of the strategy) config
//console.developers.google.com(oauth API will generate "clientID", and "clientSecret")
passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            
            //promise
            //google strategy user id in db?
            User.findOne({googleID: profile.id}) 
            .then(existingUser => {   
                
                if(existingUser) {
                    
                    //already have user in DB, return it with done()
                    done(null, existingUser);
                }
                else {
                    
                    //uses googleID property defined in schema and assigns it profile.id from authentication json and implements the save() method to save it to database
                    new User({googleID: profile.id})
                    .save()
                    .then((user) => {
                        done(null, user); 
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
        }
    )
);
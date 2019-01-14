const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
//the google-oauth module comes with several properties. We only want the (Strategy)

//connect passport to google strategy(create a new instance of the strategy) config
//console.developers.google.com(oauth API will generate "clientID", and "clientSecret")
passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },

        (accessToken, refreshToken, profile, done) => {
            //gives access to take and modify users information on google servers
            console.log('access token: ', accessToken);
            //allows access into users account for given amount of time
            console.log('refresh token: ', refreshToken);
            //all of the user's information that can be used to create an account for them
            console.log('profile: ', profile);
        }
    )
);
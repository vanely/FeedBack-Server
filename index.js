const express = require('express');
const passport = require('passport');
const keys = require('./config/keys');

//the google-oauth module comes with several properties. We only want the (Strategy)
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();

const PORT = process.env.PORT || 5000;

//connect passport to google strategy(create a new instance of the strategy)
//console.developers.google.com
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },

        (accessToken) => {
            console.log(accessToken);
        } 
    )
);

//when user reaches this route they are into the passport authenticate flow, on a strategy called google(the current strategy has an internal identifier of google).
app.get('/auth/google', passport.authenticate('google', {

    //specifies what acces we want from the user. Google internally has a list of all the scopes and permissions that can be asked for.
    scope: ['profile', 'email']
}))

//doesn't ask for authentication specifics of a user
app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(PORT, () => {
    console.log(`Serving on PORT: ${PORT}`);
});


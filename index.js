const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

//follows an order of operations(needs to be before passport config)
require('./models/user');

//importing passport config from services to make sure the config runs
require('./services/passportConfig');

//mongoose connection to Mlab
mongoose.connect(keys.mongoURI, {
    //prevents deprecated parser error
    useNewUrlParser: true
});

const app = express();

//call cookie session as middleware via express app
app.use(
    cookieSession({
        //define experation for cookie(30 days) 
        //     days hours min secs  millisecs 
        maxAge: 30 * 24 * 60 * 60 * 1000,
        //key for our cookie(user created/ random)
        keys: [keys.cookieKey]
    })
);

//tell passport to authenticate via cookie by calling on passport.initialize, and passport.session as middleware
app.use(passport.initialize());
app.use(passport.session());

//importing arrow function from authRoutes and passing the instance of express app as its param to allow express app to be used on the authRoutes
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serving on PORT: ${PORT}`);
});

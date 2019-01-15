const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./models/user');//follows an order of operations(needs to be before passport config)

//importing passport config from services to make sure the config runs
require('./services/passportConfig');

//mongoose connection to Mlab
mongoose.connect(keys.mongoURI);
const app = express();

//importing arrow function from authRoutes and passing the instance of express app as its param to allow express app to be used on the authRoutes
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serving on PORT: ${PORT}`);
});
const express = require('express');
//importing passport config from services to make sure the config runs
require('./services/passportConfig');
const app = express();

//importing arrow function from authRoutes and passing the instance of express app as its param to allow express app to be used on the authRoutes
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serving on PORT: ${PORT}`);
});
//keys.js - figure out what set of credentials to use
//on local machine process.env is undefined or not equal to 'production'
if(process.env.NODE_ENV === 'production') {
    //we are in production - return prod keys
    module.exports = require('./prod');
}
else{
    //we are in deveopment - return dev keys
    module.exports = require('./dev');
}
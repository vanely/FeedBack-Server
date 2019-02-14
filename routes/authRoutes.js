const passport = require('passport');

/**@NOTE exporting the routes as an arrow function with app as a param inorder to use the instance of express app that exists in "index.js" */
module.exports = (app) => {

    //users are sent into passport authenticate flow via following route. on strategy called google(the current strategy has an internal identifier of google).
    app.get('/auth/google', passport.authenticate('google', {
    
        //specifies what we want to access from the user. Google internally has a list of all the scopes and permissions that can be asked for.
        scope: ['profile', 'email']
    }))
    
    //equiv to ^^^ but doesn't ask for authentication specifics of a user    
    app.get('/auth/google/callback', passport.authenticate('google'));

    //user logout
    app.get('/api/logout', (req, res) => {
        
        //builtin passport method logout is aautomatically attached to req, an can to used to forget user ie. logout
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {

        res.send(req.user);
    })
}

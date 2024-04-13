const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User =  require('../models/User');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(email, password, done) {
    // Find a user and establish the identity
    User.findOne({ email: email }).exec() // Add .exec() to return a promise
        .then(user => {
            if (!user || user.password !== password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => {
            console.log('Error in finding user -> passport:', err);
            return done(err);
        });
}));

//serializing the user to decide which key is to be kept in the cookis
passport.serializeUser(function(user,done){
    done(null,user.id);
});


/// deserailaisng the user form the key in the cookids
passport.deserializeUser(function(id, done) {
    User.findById(id).exec() // Add .exec() to return a promise
        .then(user => {
            if (!user) {
                console.log('User not found');
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => {
            console.log('Error in finding user -> passport:', err);
            return done(err);
        });
});

// check if the user is authenticated

passport.checkAuthentication = function(req,res,next){
        // if user i signed in then pass the request on to the next function(controllers action)
          if(req.isAuthenticated()){
            return next();
          }
          // if user is not signed in
          return res.redirect('/users/sign-in');
}



passport.setAuthenticatedUser = function(req,res,next){
         if(req.isAuthenticated){
            //req.user contains the current signed in user from the seddion cookiee
            res.locals.user = req.user;
         }
         next();
}


module.exports = passport;


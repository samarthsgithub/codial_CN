const User = require('../models/user');

module.exports.profile = function(req,res){
     return res.render('user_profile',{
        title:"Samarth"
     })
}
module.exports.activity = function(req,res){
   return res.end('<h1>Activity is being showed</h1>');
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
       return  res.redirect('/users/profile');
    }

   return res.render('signup');
}
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

   return res.render('login');
}

//get the sign up data 

module.exports.create = function(req, res) {
   // Check if a user with the provided email already exists
   User.findOne({ email: req.body.email })
       .then(user => {
           if (user) {
               // If user already exists, redirect back
               return res.redirect('back');
           } else {
               // If user doesn't exist, create a new user
               User.create(req.body)
                   .then(newUser => {
                       // Redirect to sign-in page after successful creation
                       return res.redirect('/users/sign-in');
                   })
                   .catch(err => {
                       console.error('Error in creating user while signing up:', err);
                       return res.redirect('back');
                   });
           }
       })
       .catch(err => {
           console.error('Error in finding user in signing up:', err);
           return res.redirect('back');
       });
};

module.exports.createSession = function (req,res){
   //todo later
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.error('Error logging out:', err);
            return res.redirect('/');
        }
        return res.redirect('/');
    });
};
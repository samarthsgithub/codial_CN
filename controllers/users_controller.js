const User = require('../models/User');

module.exports.profile = function(req, res) {
    
    const user = User.findById(req.params.id);

       console.log(user.name);

        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        });
    
};

// render the sign up page
module.exports.signUp = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
};

// render the sign in page
module.exports.signIn = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
};

// get the sign up data
module.exports.create = async function(req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
            const user = await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        // Handle error
        console.error('Error in signing up:', err);
        return res.redirect('back');
    }
};

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    return res.redirect('/');
};

module.exports.destroySession = function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        return res.redirect('/');
    });
};
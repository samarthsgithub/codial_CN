const User = require('../models/User');

module.exports.profile = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);
        
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });

    } catch (err) {
        // Handle error
        console.error(err);
        return res.redirect('/');
    }
};

module.exports.update = async function(req, res) {
    try {
        // Check if the logged-in user matches the user to be updated
        console.log("update function called");
        if (req.user.id == req.params.id) {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);

            if (!updatedUser) {
                return res.status(404).send('User not found');
            }

            return res.redirect('back');
        } else {
            return res.status(401).send('Unauthorized');
        }
    } catch (err) {
        // Handle error
        console.error(err);
        console.log("update function called");
        return res.status(500).send('Internal Server Error');
    }
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
            req.flash('error','enter the same password')
            return res.redirect('back');
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
            const user = await User.create(req.body);
            req.flash('success','you are signed up ,please log in')
            return res.redirect('/users/sign-in');
        } else {
            req.flash('error','User already exists')
            return res.redirect('back');
        }
    } catch (err) {
        // Handle error
        req.flash('error',err);
        console.error('Error in signing up:', err);
        return res.redirect('back');
    }
};

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
};

module.exports.destroySession = function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        req.flash('success','you have logged out');
        return res.redirect('/');
    });
};
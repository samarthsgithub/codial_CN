const Post = require('../models/post');
const User = require('../models/User');

module.exports.home = async function(req, res) {
    try {
        // populate the user of each post
        const posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .exec();

        // Fetch all users asynchronously
        const users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
        
    } catch (err) {
        // Handle error
        console.error(err);
        return res.redirect('/');
    }
};
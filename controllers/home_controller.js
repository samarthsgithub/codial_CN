const Post = require('../models/post');

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
        
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    } catch (err) {
        // Handle error
        console.error(err);
        return res.redirect('/');
    }
};

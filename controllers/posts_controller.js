const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if (!post) {
            console.log('Error in creating a post');
            return;
        }
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"post created!"
            })
        }
        req.flash('success','Post created');
        return res.redirect('back');
    } catch (err) {
        // Handle error
        console.error('Error in creating a post:', err);
        req.flash('error',err);
        return res.status(500).send('Error in creating post');
    }
};

module.exports.destroy = async function(req, res) {
   try {
       const post = await Post.findById(req.params.id);
       // .id means converting the object id into string
       if (post.user == req.user.id) {
           await Post.deleteOne({ _id: req.params.id }); // Delete the post
           await Comment.deleteMany({ post: req.params.id }); // Delete associated comments
           req.flash('success','Post and associated comments deleted')
           return res.redirect('back');
       } else {
           req.flash('error','You cannot delete this post!');
           return res.redirect('back');
       }
   } catch (err) {
       // Handle error
       console.error(err);
       req.flash('error',err);
       return res.redirect('back');
   }
};

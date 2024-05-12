const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){


    const posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })

    return res.json(200,{
        message:"Lists of Posts",
        posts:posts
    })
}

module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            await Post.deleteOne({ _id: req.params.id }); // Delete the post
            await Comment.deleteMany({ post: req.params.id }); // Delete associated comments
            // req.flash('success','Post and associated comments deleted')
            return res.json(200,{
                message:"Post and ass comments are deleted"
            })
        }else{
            return res.json(401,{
                message:"you can not delete this post"
            });
        }
    } catch (err) {
        // Handle error
        console.error(err);
        // req.flash('error',err);
        // 
        return res.json(500,{
            message:"Internal server error"
        });
    }
 };



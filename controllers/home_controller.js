const Post = require('../models/post');



   module.exports.home = async function(req, res) {
      try {
         const posts = await Post.find({}).populate('user').exec();
         return res.render('home', {
            title: "Codeial | Home",
            posts: posts
         });
      } catch (err) {
         console.error('Error fetching posts:', err);
         // Handle error appropriately
         return res.status(500).send('Error fetching posts');
      }
   }



// Populate the user of each post
// Post.find({}).populate('user').exec(async function(err,posts){
//   return res.render('home',{
//    title:"Codeial | Home",
//    posts:posts
//   });
// })
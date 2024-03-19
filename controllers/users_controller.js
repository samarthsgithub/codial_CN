module.exports.profile = function(req,res){
     return res.render('user_profile',{
        title:"Samarth"
     })
}
module.exports.activity = function(req,res){
   return res.end('<h1>Activity is being showed</h1>');
}


module.exports.profile = function(req,res){
     res.end('<h1>User Profile</h1>');
}
module.exports.activity = function(req,res){
   return res.end('<h1>Activity is being showed</h1>');
}


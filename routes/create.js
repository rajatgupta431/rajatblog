var usermongo = require('./mongo.js');

exports.create = function(req,res){
	
	var new_post = new usermongo.blogpost({
		
		title : req.body.title,
		post : req.body.post
		
	}); 
	new_post.save(function(err){
		if(!err)
		{console.log("new Blog post "+ new_post + " saved" );
}
		else
		console.log(err);
		
		});
res.redirect('/');

};


/*
 * GET home page.
 */
var usermongo = require('./mongo.js');

exports.index = function(req, res){
	usermongo.blogpost.find(function(err,post){
		console.log(post);
		res.render('index.ejs', { post: post });
		});
	
  
};

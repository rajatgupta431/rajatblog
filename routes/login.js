var usermongo = require('./mongo.js');

exports.login = function(req,res){
	
	usermongo.users.find(function(err,user){
		if(req.body.login == user[0].login && req.body.password == user[0].password)
		{res.render('create.ejs');
			
			}
			else{
			res.render('login.ejs',{failed : true});
			console.log(user);
		}
		
		});
	
	
	} 

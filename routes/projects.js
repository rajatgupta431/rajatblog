var usermongo = require('./mongo.js');
exports.projects = function(req,res){
	
	usermongo.attendance.find(function(err,hits){
					if(hits){var len= hits.length;
					res.render('projects.ejs',{pressed : false,hits: len});
				}
				else
				res.render('projects.ejs',{pressed : false ,hits: 0});
				
		});
      
	

} ;

var request = require('request');
exports.videos = function(req,res){
request({
	uri : "http://gdata.youtube.com/feeds/api/users/rajatmusic/uploads/?v=2&alt=json",
	timeout : 15000,
	method : "GET"
	},
	function(err,response,body){
		if(!err && response.statusCode==200){
			
			var entry=[];
			body = JSON.parse(body);
	entry= body.feed.entry;
	res.render('videos',{entry: entry});
			
			
			}
		
		
		}
	);
		
}

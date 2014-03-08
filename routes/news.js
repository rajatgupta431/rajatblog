var request = require('request'),
jar = request.jar();
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('BsNC2RDQpKgoSUklXeQVvA'); 
var usermongo = require('./mongo.js');



exports.news=function(req,res){
	
	
	
	usermongo.attendance.find(function(err,hits) {
		var emails= [{"email" : "rajatgupta431@gmail.com"}];
		var flag;
		
		for(var i=0; i<hits.length;i++){
			var newemail= {"email": hits[i].email};
			flag=1;
		for(var j=0; j<emails.length; j++){
			if(emails[j].email==newemail.email){
				flag=0;
				break;
				}
				
			
			
			}
			if(flag){
				emails.push(newemail);
				
				}
		}
		res.render('news.ejs',{news : emails});
        console.log(emails[emails.length-1]);
        
      
        var message = {
     "html": req.body.html,
     "text": "",
    "subject": req.body.subject ,
    "from_email": "rajatgupta431@gmail.com",
    "from_name": req.body.name ,
    "to": emails ,
    "headers": {
        "Reply-To": "rajatgupta431@gmail.com"
    },
    "important": false,
    "track_opens": true,
    "track_clicks": true,
    "auto_text": true

};
                      
mandrill_client.messages.send({"message": message}, function(result) {
    console.log(result);
   
}, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
                });

		
	
		
		
		});
};

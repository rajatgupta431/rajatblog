 var request = require('request'),
jar2 = request.jar(),
cookie = request.cookie("name =Raj");
jar2.add(cookie);
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('BsNC2RDQpKgoSUklXeQVvA'); 
var usermongo = require('./mongo.js');

exports.result = function(req,res){
	
	usermongo.attendance.find(function(err,hits){
					if(hits){var len= hits.length;
					res.render('projects.ejs',{pressed : true,hits: len});
				}
				else
				res.render('projects.ejs',{pressed : true ,hits: 0});
				
		});
	
	
	var new_entry = new usermongo.attendance({
		studId :req.body.studId,
		bday : req.body.bday,
		email :req.body.email,
		date :{type: Date,default : Date.now}
		 });
		
		new_entry.save(function(err){
			if(!err){console.log("new attendance request");}
			else {console.log(err);}
			});
	
	
	request({uri : "http://websismit.manipal.edu/websis/control/createAnonSession?birthDate="+req.body.bday+"&birthDate_i18n="+req.body.bday+"&idValue="+req.body.studId,
             jar : jar2,
	     timeout : 15000,
		  method : "POST"
		     },

function(err,response,body)
{   if (!err && response.statusCode == 200) { 
       
//Fetching Students name !!!


 var num = body.indexOf("cc_ProfileTitle_name"),
 strpart = body.substr(num)   ,
 num2 = strpart.indexOf("</spa"),
 name = body.substr(num+37,num2);
 console.log(name);
    
//Making Request to the attendance page

request({   uri:"http://websismit.manipal.edu/websis/control/StudentAcademicProfile",
	jar : jar2, timeout : 10000,
	method : "POST"
         },
       function(err,response,body)
    {  if (!err && response.statusCode == 200) { 
		 var sms ='<h4>Send :</h4><h4>@websismit RegNO yyyy-mm-dd</h4><h4>to 9266592665 or 9243342000</h4>';
	              reply  ="<h1>"+name+"</h1>"+sms+"<h3><a href='http://www.rajatgupta.info/projects'> Click here to Get Attendance Again</a></h3><p><a href=\"https://www.facebook.com/sharer/sharer.php?u=rajatblog.herokuapp.com/projects\" target=\"_blank\"><img src=\"http://www.simplesharebuttons.com/images/somacro/facebook.png\" style=\"float:left; height:50px;margin-right:5em;\"></a></p><br>"+body;


var message = {
    "html": reply,
     "text": "SERVICE BY Rajat Gupta",
    "subject": "RESULT ",
    "from_email": "rajatgupta431@gmail.com",
    "from_name": "Result By  rajatblog",
    "to": [{
            "email": req.body.email,
            "name": req.body.studId
        }],
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

   }
   else {console.log(err);} }

);

} else {console.log(err);}

});
	
	} 

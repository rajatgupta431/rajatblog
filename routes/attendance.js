var request = require('request'),
jar = request.jar(),
cookie = request.cookie("name =Rajo");
jar.add(cookie);
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('BsNC2RDQpKgoSUklXeQVvA'); 
var usermongo = require('./mongo.js');

exports.attendance = function(req,res){
	res.render('projects',{pressed: true});	
	
	
	var new_entry = new usermongo.attendance({
		studId :req.body.studId,
		bday : req.body.bday,
		email :req.body.email
		 });
		
		new_entry.save(function(err){
			if(!err){console.log("new attendance request");}
			else {console.log(err);}
			});
	
	
	request({uri : "http://websismit.manipal.edu/websis/control/createAnonSession?birthDate="+req.body.bday+"&birthDate_i18n="+req.body.bday+"&idValue="+req.body.studId,
             jar : jar,
	     timeout : 15000,
		  method : "POST"
		     },

function(err,response,body)
{
       
//Fetching Students name !!!


 var num = body.indexOf("cc_ProfileTitle_name"),
 strpart = body.substr(num)   ,
 num2 = strpart.indexOf("</spa"),
 name = body.substr(num+37,num2);
 console.log(name);
    
//Making Request to the attendance page

request({   uri:"http://websismit.manipal.edu/websis/control/ListCTPEnrollment?customTimePeriodId=NOV2013",
	jar : jar, timeout : 10000,
	method : "POST"
         },
       function(err,response,body)
    {
	              reply  ="<h1>"+name+"</h1><br>"+body;


var message = {
    "html": reply,
     "text": "ATTENDANCE SERVICE BY Rajat Gupta",
    "subject": "ATTENDANCE STATUS ",
    "from_email": "rajatgupta431@gmail.com",
    "from_name": "Attendance By  rajatblog",
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

);



});
	
	} 

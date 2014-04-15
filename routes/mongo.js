var mongo = require('mongoose').connect("mongodb://rajatgupta431:1271994127@paulo.mongohq.com:10086/blogapp") ;
var Schema = mongo.Schema;
var blogSchema = new Schema({
	title: String,
	post: String,
	date :{type: Date,default : Date.now}
});

var userSchema = new Schema({
	login : String,
	password : String});


var attendanceSchema= new Schema({
	studId: String,
	bday: String,
	email : String,
	date :{type: Date,default : Date.now}
});		
	
module.exports ={
	
	blogpost : mongo.model('blogpost',blogSchema),
	users: mongo.model('user',userSchema),
	attendance : mongo.model('attendance',attendanceSchema)
	
	}


/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var about = require('./routes/about');
var http = require('http');
var path = require('path');
var create = require('./routes/create');
var login = require('./routes/login');
var projects = require('./routes/projects');
var attendance = require('./routes/attendance');
var result = require('./routes/result');
var videos = require('./routes/youtube');
var news = require('./routes/news');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/about',about.about);
app.post('/createnew',create.create);
app.post('/attendance',attendance.attendance);
app.post('/result',result.result);
app.get('/projects',projects.projects);
app.post('/news',news.news);



app.get('/create',function(req,res){
	res.render('login.ejs',{failed : false});
	
	});
app.post('/login',login.login);
app.get('/videos',videos.videos);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

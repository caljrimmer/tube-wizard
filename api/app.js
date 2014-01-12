//Required Modules
var express = require('express');
var app = express();
var stations = require('./controllers/stations.js');
var http = require('http');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('underscore');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/../public/');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session(
	{ secret: 'SpecialObsfication', 
	  cookie: {maxAge: 60000 * 60 * 24 * 30} //30 Days
	}
  ));
  app.use(app.router); 
  app.use(express.static(__dirname + '/../public'));
});

app.configure('test', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.post('/api/station/:code', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	stations.getStation(req, res);
}); 

var server = http.createServer(app).listen(4001, function(){
  console.log('Express server listening on port 4001');
});

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

app.get('/api/station/:code', function(req, res){
	
	var parseString = xml2js.parseString,
		obj = {};
		
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	var filter = function(data){
		var newArr = [];
		_.each(data,function(v,k){
			var newData = {
				SecondsTo: v.$.SecondsTo,
				TimeTo: v.$.TimeTo,
				Location: v.$.Location,
				Destination: v.$.Destination,
				DepartTime: v.$.DepartTime,
			};
			newArr.push(newData);
		});
		return newArr;
	};
	                      
	//Force Central Line
	req.params.line = "b";
    
	var request = require('request');
	request('http://cloud.tfl.gov.uk/TrackerNet/PredictionDetailed/'+req.params.line+'/'+req.params.code, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			parseString(body, function (err, result) {
				obj.id = result.ROOT.S[0].$.Code;
				obj.info = result.ROOT.S[0].$;
				obj.info.line = result.ROOT.Line[0]
				obj.info.lineName = result.ROOT.LineName[0]
			    obj.westBound = filter(result.ROOT.S[0].P[0].T);
				obj.eastBound = filter(result.ROOT.S[0].P[1].T); 
				obj = JSON.stringify(obj);
				res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(obj, 'utf8')});
				res.end(obj);     
			});
		}else{
			console.log(error)
		} 
	})     

}); 

var server = http.createServer(app).listen(4001, function(){
  console.log('Express server listening on port 4001');
});

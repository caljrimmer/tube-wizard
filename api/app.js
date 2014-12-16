var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var errorhandler = require('errorhandler');
var app = express(); 
var stations = require('./controllers/stations.js')

// all environments
app.set('port', process.env.PORT || 7001);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorhandler());   

app.get('/api/station/:line/:code', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	stations.getStation(req, res);
});
 
/**
* Render the index internal to the node app.
*/

app.use(express.static('./public'));
app.get('/', function(req, res){
	res.render('index.html');
	res.end();
}); 

app.listen(app.get('port'), function(){
	console.log('Express server now listening on port ' + app.get('port'));
});

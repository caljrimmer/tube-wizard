var http = require('http');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('underscore'); 

exports.getStation = function(req,res) {
	
	var parseString = xml2js.parseString,
		obj = {};
	
	var trains = function(data){
		var newArr = [];               
		console.log(data)
		_.each(data,function(v,k){
			_.each(v.T,function(v2,k2){
				var newData = {
					Direction : v.$.N.split('-')[0].replace(' ',''),
					SecondsTo: v2.$.SecondsTo,
					TimeTo: v2.$.TimeTo,
					Location: v2.$.Location,
					Destination: v2.$.Destination,
					DepartTime: v2.$.DepartTime,
				};
				newArr.push(newData);	
			});
		});
		return newArr;
	};
	
	var info = function(data){
		var newObj = data.S[0].$;
		newObj.line = data.Line[0];
		newObj.lineName = data.LineName[0];
		newObj.directions = [];
		_.each(data.S[0].P,function(v,k){
			var direction = v.$.N.split('-')[0].replace(' ','');
			if(!_.contains(newObj.directions,direction)){
				newObj.directions.push(direction); 
			}
		});
		return newObj;
	}
    
	var request = require('request');
	request('http://cloud.tfl.gov.uk/TrackerNet/PredictionDetailed/'+req.body.line+'/'+req.body.id, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			parseString(body, function (err, result) {
				obj.id = result.ROOT.S[0].$.Code;
				obj.info = info(result.ROOT);
				obj.trains = trains(result.ROOT.S[0].P);
				obj = JSON.stringify(obj);
				res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(obj, 'utf8')});
				res.end(obj);     
			});
		}else{
			console.log(error, response.statusCode)
		} 
	})
}
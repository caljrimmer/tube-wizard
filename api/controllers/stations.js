var http = require('http');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('underscore'); 

module.exports = {
	
	/***
	* Example TFL XML
	*
	* 
	
	<ROOT xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://trackernet.lul.co.uk">
	  <Disclaimer>This system is an INFORMATION ONLY system, relying entirely on 
					information received from the relevant Operational Railway Control System(s). It is NOT 
					considered a safety related system in the Railway Engineering sense. However, 
					the information reported may trigger user intervention by staff regarding possible 
					incidents on the railway, and confirmation of the situation observed should be obtained prior 
					to any corrective action being taken.</Disclaimer>
	  <WhenCreated>16 Dec 2014 10:01:17</WhenCreated>
	  <Line>C</Line>
	  <LineName>Central Line</LineName>
	  <S Code="LST" Mess="" N="Liverpool Street." CurTime="10:01:17">
	    <P N="Eastbound - Platform 4" Num="4" TrackCode="TC5013" NextTrain="false">
	      <T LCID="1095392" SetNo="145" TripNo="4" SecondsTo="130" TimeTo="2:30" Location="At Bank" Destination="Hainault via Newbury Park" DestCode="532" Order="0" DepartTime="10:00:32" DepartInterval="130" Departed="0" Direction="0" IsStalled="0" TrackCode="TC4711" LN="C" />
	      <T LCID="1094959" SetNo="015" TripNo="4" SecondsTo="189" TimeTo="3:30" Location="Between St. Paul's and Bank" Destination="Epping" DestCode="530" Order="0" DepartTime="10:01:08" DepartInterval="189" Departed="0" Direction="0" IsStalled="0" TrackCode="TC4615" LN="C" />
	      <T LCID="1096665" SetNo="065" TripNo="4" SecondsTo="369" TimeTo="6:00" Location="At Chancery Lane" Destination="Hainault via Newbury Park" DestCode="532" Order="0" DepartTime="10:00:55" DepartInterval="369" Departed="0" Direction="0" IsStalled="0" TrackCode="TC4507" LN="C" />
	      <T LCID="1095973" SetNo="016" TripNo="2" SecondsTo="490" TimeTo="8:00" Location="Between Tottenham Court Road and Holborn" Destination="Epping" DestCode="530" Order="0" DepartTime="10:01:11" DepartInterval="490" Departed="0" Direction="0" IsStalled="0" TrackCode="TC4305_1" LN="C" />
	      <T LCID="1095328" SetNo="103" TripNo="3" SecondsTo="680" TimeTo="11:00" Location="At Oxford Circus" Destination="Newbury Park" DestCode="543" Order="0" DepartTime="10:00:52" DepartInterval="680" Departed="0" Direction="0" IsStalled="0" TrackCode="TC4007" LN="C" />
	      <T LCID="1095266" SetNo="017" TripNo="4" SecondsTo="931" TimeTo="16:00" Location="Between Lancaster Gate and Marble Arch" Destination="Epping" DestCode="530" Order="0" DepartTime="10:01:12" DepartInterval="931" Departed="0" Direction="0" IsStalled="0" TrackCode="TC3513" LN="C" />
	      <T LCID="1088177" SetNo="051" TripNo="6" SecondsTo="1023" TimeTo="17:00" Location="Between Queensway and Lancaster Gate" Destination="Woodford Via Hainault" DestCode="531" Order="0" DepartTime="10:01:11" DepartInterval="1023" Departed="0" Direction="0" IsStalled="0" TrackCode="TC3211" LN="C" />
	      <T LCID="1095147" SetNo="075" TripNo="7" SecondsTo="1164" TimeTo="19:00" Location="At Notting Hill Gate" Destination="Hainault via Newbury Park" DestCode="532" Order="0" DepartTime="10:00:51" DepartInterval="1164" Departed="0" Direction="0" IsStalled="0" TrackCode="TC3007" LN="C" />
	      <T LCID="1096147" SetNo="112" TripNo="3" SecondsTo="1242" TimeTo="21:00" Location="At Holland Park" Destination="Loughton" DestCode="529" Order="0" DepartTime="10:00:56" DepartInterval="1242" Departed="0" Direction="0" IsStalled="0" TrackCode="TC2909" LN="C" />
	      <T LCID="1095357" SetNo="146" TripNo="4" SecondsTo="1339" TimeTo="22:00" Location="At Shepherd's Bush" Destination="Hainault via Newbury Park" DestCode="532" Order="0" DepartTime="10:00:51" DepartInterval="1339" Departed="0" Direction="0" IsStalled="0" TrackCode="TC2819" LN="C" />
	      <T LCID="1096137" SetNo="020" TripNo="2" SecondsTo="1546" TimeTo="26:00" Location="At White City" Destination="Epping" DestCode="530" Order="0" DepartTime="10:00:37" DepartInterval="1546" Departed="0" Direction="0" IsStalled="0" TrackCode="TC2627" LN="C" />
	      <T LCID="1095088" SetNo="066" TripNo="5" SecondsTo="1671" TimeTo="28:00" Location="At White City Sidings" Destination="Hainault via Newbury Park" DestCode="532" Order="0" DepartTime="9:49:45" DepartInterval="1671" Departed="0" Direction="0" IsStalled="0" TrackCode="TC2731" LN="C" />
	      <T LCID="1094757" SetNo="104" TripNo="6" SecondsTo="1738" TimeTo="29:00" Location="At East Acton" Destination="Newbury Park" DestCode="543" Order="0" DepartTime="10:01:04" DepartInterval="1738" Departed="0" Direction="0" IsStalled="0" TrackCode="TC2511" LN="C" />
	    </P>
	    <P N="Westbound - Platform 5" Num="5" TrackCode="TC5020" NextTrain="false">
	      <T LCID="1091289" SetNo="061" TripNo="5" SecondsTo="0" TimeTo="-" Location="At Platform" Destination="White City" DestCode="550" Order="0" DepartTime="10:01:09" DepartInterval="0" Departed="0" Direction="0" IsStalled="0" TrackCode="TC5020" LN="C" />
	      <T LCID="1095452" SetNo="001" TripNo="4" SecondsTo="124" TimeTo="2:30" Location="Between Bethnal Green and Liverpool Street" Destination="West Ruislip" DestCode="547" Order="0" DepartTime="10:01:13" DepartInterval="124" Departed="0" Direction="0" IsStalled="0" TrackCode="TC5220" LN="C" />
	      <T LCID="1095948" SetNo="071" TripNo="3" SecondsTo="309" TimeTo="5:00" Location="Left Mile End" Destination="Ealing Broadway" DestCode="548" Order="0" DepartTime="10:01:11" DepartInterval="309" Departed="0" Direction="0" IsStalled="0" TrackCode="TC5432" LN="C" />
	      <T LCID="1095618" SetNo="116" TripNo="3" SecondsTo="492" TimeTo="8:00" Location="Between Stratford and Mile End" Destination="Northolt" DestCode="564" Order="0" DepartTime="10:01:10" DepartInterval="492" Departed="0" Direction="0" IsStalled="0" TrackCode="TC5406" LN="C" />
	      <T LCID="1095531" SetNo="107" TripNo="3" SecondsTo="674" TimeTo="11:00" Location="At Stratford" Destination="Ealing Broadway" DestCode="548" Order="0" DepartTime="10:01:09" DepartInterval="674" Departed="0" Direction="0" IsStalled="0" TrackCode="TC5520" LN="C" />
	      <T LCID="1094888" SetNo="002" TripNo="5" SecondsTo="867" TimeTo="14:00" Location="At Leyton" Destination="West Ruislip" DestCode="547" Order="0" DepartTime="10:01:02" DepartInterval="867" Departed="0" Direction="0" IsStalled="0" TrackCode="TC5610" LN="C" />
	      <T LCID="1095323" SetNo="044" TripNo="5" SecondsTo="1087" TimeTo="18:00" Location="At Leytonstone" Destination="Ealing Broadway" DestCode="548" Order="0" DepartTime="10:00:28" DepartInterval="1087" Departed="0" Direction="0" IsStalled="0" TrackCode="TC5748B" LN="C" />
	      <T LCID="1095805" SetNo="003" TripNo="3" SecondsTo="1148" TimeTo="19:00" Location="Left Snaresbrook" Destination="West Ruislip" DestCode="547" Order="0" DepartTime="10:01:02" DepartInterval="1148" Departed="0" Direction="0" IsStalled="0" TrackCode="TC7010" LN="C" />
	      <T LCID="1095675" SetNo="062" TripNo="3" SecondsTo="1270" TimeTo="21:00" Location="At Redbridge" Destination="White City" DestCode="550" Order="0" DepartTime="10:01:13" DepartInterval="1270" Departed="0" Direction="0" IsStalled="0" TrackCode="TC6108" LN="C" />
	      <T LCID="1095798" SetNo="004" TripNo="3" SecondsTo="1563" TimeTo="26:00" Location="Approaching Woodford" Destination="West Ruislip" DestCode="547" Order="0" DepartTime="10:01:11" DepartInterval="1563" Departed="0" Direction="0" IsStalled="0" TrackCode="TC7220_1" LN="C" />
	      <T LCID="1094968" SetNo="101" TripNo="5" SecondsTo="1685" TimeTo="28:00" Location="At Newbury Park Loop" Destination="Ealing Broadway" DestCode="548" Order="0" DepartTime="9:58:19" DepartInterval="1685" Departed="0" Direction="0" IsStalled="0" TrackCode="TC6333" LN="C" />
	      <T LCID="1095887" SetNo="072" TripNo="3" SecondsTo="1761" TimeTo="29:00" Location="Between Fairlop and Barkingside" Destination="Ealing Broadway" DestCode="548" Order="0" DepartTime="10:01:06" DepartInterval="1761" Departed="0" Direction="0" IsStalled="0" TrackCode="TC6502" LN="C" />
	      <T LCID="1095767" SetNo="117" TripNo="3" SecondsTo="1779" TimeTo="30:00" Location="Between Loughton and Buckhurst Hill" Destination="Northolt" DestCode="564" Order="0" DepartTime="10:01:12" DepartInterval="1779" Departed="0" Direction="0" IsStalled="0" TrackCode="TC7626_2" LN="C" />
	    </P>
	  </S>
	</ROOT>
	
	*
	*/ 
	
	send : function(res,retnObj){ 
		retnObj = JSON.stringify(retnObj);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(retnObj, 'utf8')});
		res.end(retnObj);	
	},
	
	sendError : function(res,error,errorCode){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.writeHead(errorCode, { 'Content-Type': 'application/json'});
		res.end(JSON.stringify(error));
	},
	
	trainsMap : function(data){
		var newArr = [];               
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
	},
	
	infoMap : function(data){
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
	},
	
	getStation : function(req,res) {
		var request = require('request'),
			parseString = xml2js.parseString,
			tflPath = 'http://cloud.tfl.gov.uk/TrackerNet/PredictionDetailed/',
			that = this,
			line = req.params.line,
			code = req.params.code,
			retnObj = {};
			
		request( tflPath + line + '/' + code, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				parseString(body, function (err, result) {
					//Map the TFL XML
					retnObj.id = result.ROOT.S[0].$.Code;
					retnObj.info = that.infoMap(result.ROOT);
					retnObj.trains = that.trainsMap(result.ROOT.S[0].P);
					that.send(res,retnObj);  
				});
			}else{
				that.sendError(res,error,response.statusCode)
			} 
		});
	
	}
		
}
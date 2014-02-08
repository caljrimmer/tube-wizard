define([
	'jquery', 
	'underscore', 
	'backbone', 
	'registry', 
	'd3', 
	'custom/linesData',
	'custom/stationsData'
	], 
	function($, _, Backbone, Registry, d3, linesData, stationsData) {

	function Tube() {
		this.trainArray = [];
	}

	Tube.prototype.map = function(target) {

		$(target).empty();

		var w = $(target).width(),
			h = $(target).height(),
			t = target[0],
			paths = linesData,
			stationsMap = stationsData;

		var svg = d3.select(t).append("svg")
			.attr("width", w)
			.attr("height", h);
			
		this.svg = svg;
        
		// Visual SVG all Lines. Not the routes just the aesthetics.
		var allLines = function(){
			
			_.each(paths,function(v,k){
				
				var Line = svg.append("g")
			      .attr("id", k)
			      .attr("class","lines")
				  .attr("transform","translate("+ v.x +","+ v.y +")");

				_.each(v.data,function(path){
					Line.append("svg:path")
						.attr("d", path.d)
						.attr("class",v.class + "_line");
				});

			});
			  
		}();
		
		//Adds stations and station codes to SVG
		var StationsMap = svg.append("g")
	      .attr("id", "StationsMap")
		  .attr("transform","translate(0,0)");
		
		 _.each(stationsMap,function(v,k){
			
			var lineClass = k.charAt(0);
				
			if(k === "Circle"){
				lineClass = 'Ci';
			}  
			
			_.each(v,function(item){

				if(item.position.type === 'circle'){
					
					StationsMap.append("circle")
						.attr("cx", item.position.x)
						.attr("cy", item.position.y)
						.attr("r", 8)
						.style("fill",'#fff')
						.style("stroke",'#000')
						.style("stroke-width",3)
						.style("opacity",0.6); 
						
					if(item.position.text === 'W'){
					
						StationsMap.append("rect")
							.attr('class','label')
							.attr('id',item.code)
							.attr("x", item.position.x + 15)
							.attr("y", item.position.y - 8)
							.attr("width",36)
							.attr('height',16); 
					
						StationsMap.append("text")
							.attr("x", item.position.x + 20)
							.attr("y", item.position.y + 4) 
							.text(item.code);  
					
					}
					
					if(item.position.text === 'E'){
					
						StationsMap.append("rect")
							.attr('class','label')
							.attr('id',item.code)
							.attr("x", item.position.x + 15)
							.attr("y", item.position.y - 8)
							.attr("width",36)
							.attr('height',16); 
					
						StationsMap.append("text")
							.attr("x", item.position.x + 20)
							.attr("y", item.position.y + 4) 
							.text(item.code);  
					
					}
					
					if(item.position.text === 'N'){
					
						StationsMap.append("rect")
							.attr('class','label')
							.attr('id',item.code)
							.attr("x", item.position.x - 15)
							.attr("y", item.position.y - 30)
							.attr("width",36)
							.attr('height',16); 
					
						StationsMap.append("text")
							.attr("x", item.position.x - 8)
							.attr("y", item.position.y - 18) 
							.text(item.code);  
					
					}
					
					if(item.position.text === 'S'){
					
						StationsMap.append("rect")
							.attr('class','label')
							.attr('id',item.code)
							.attr("x", item.position.x - 15)
							.attr("y", item.position.y + 14)
							.attr("width",36)
							.attr('height',16); 
					
						StationsMap.append("text")
							.attr("x", item.position.x - 8)
							.attr("y", item.position.y + 26) 
							.text(item.code);  
					
					}
						
				}
				
				if(item.position.type === 'rect'){ 
					
				   
					
					if(item.position.attr.rotate === 0){
						
						StationsMap.append("rect")
							.attr("x", item.position.x + item.position.attr.offset.x)
							.attr("y", item.position.y + item.position.attr.offset.y - 3)
							.attr("width", 8)
							.attr("height", 6) 
							.attr("class",lineClass);
							
							if(item.position.attr.offset.x >= 0){
								
								if(item.position.text !== '-'){
									
									StationsMap.append("rect")
										.attr('class','label')
										.attr('id',item.code)
										.attr("x", item.position.x + 15)
										.attr("y", item.position.y - 8)
										.attr("width",36)
										.attr('height',16);
									 
									StationsMap.append("text")
										.attr("x", item.position.x + 20)
										.attr("y", item.position.y + 4) 
										.text(item.code);
										   
								}       
								
									  
							}else{
								
								if(item.position.text !== '-'){
									
									StationsMap.append("rect")
										.attr('class','label')
										.attr('id',item.code)
										.attr("x", item.position.x - 55)
										.attr("y", item.position.y - 8)
										.attr("width",36)
										.attr('height',16);
									
									StationsMap.append("text")
										.attr("x", item.position.x + item.position.attr.offset.x - 40)
										.attr("y", item.position.y + 4) 
										.text(item.code);
										 
								}
									
							}
							   
					}else{
						
						StationsMap.append("rect")
							.attr("x", item.position.x + item.position.attr.offset.x - 3)
							.attr("y", item.position.y + item.position.attr.offset.y)
							.attr("width", 6)
							.attr("height", 8) 
							.attr("class",lineClass);

						if(item.position.text !== '-'){
							
							StationsMap.append("rect")
								.attr('class','label')
								.attr('id',item.code)
								.attr("x", item.position.x - 16)
								.attr("y", item.position.y - 28)
								.attr("width",36)
								.attr('height',16);
							
							StationsMap.append("text")
								.attr("x", item.position.x - 10)
								.attr("y", item.position.y - 16) 
								.text(item.code);  
						}
										
					}  
				}
				
			});
		});
        

		var assetOverlay = svg.append("image")
			.attr("xlink:href", "images/map.png")
			.attr("width", 2422)
			.attr("height", 1620)
			.attr("transform","translate(38,22)");   

		this.svg.on('click',function(){
			console.log(d3.mouse(this));
		});

		
		// Tracking of Trains SVG all Lines. Inivisble to user.
		var allPathLines = function(){

			_.each(paths,function(v,k){

				var Line = svg.append("g")
			      .attr("id", k + "-path")
			      .attr("class","lines-path")
				  .attr("transform","translate("+ v.x +","+ v.y +")");

				_.each(v.data,function(path){
					Line.append("svg:path")
						.attr("d", path.d)
						.attr("class",v.class + "_line");
				});

			});

		}();
			      

	}
	
	Tube.prototype.parseVerbose = function(stationsData,trainData){
		
		if(!_.has(trainData,'Location')) trainData.Location = "";
		
		var location = trainData.Location.replace("'",""),
			where = [],
			length,
			positionAdjust;   
		
		_.each(stationsData,function(v,k){
			if(location.indexOf(v.name) !== -1){
				
				v.positionAdjust = 0;
				
				if(location.indexOf('At ') !== -1){
					v.positionAdjust = -1;
				}
				
				/*
				if(location.indexOf('Approaching') !== -1){
					v.positionAdjust = 0;
				}
				if(location.indexOf('Left') !== -1){
					v.positionAdjust = 0;
				}
				if(location.indexOf('North of') !== -1){
					v.positionAdjust = 0;
				}
				if(location.indexOf('South of') !== -1){
					v.positionAdjust = 0;
				}
				*/
				
				if(location.indexOf('Between') !== -1){
					v.positionAdjust = 0.5;
				}
				
				where.push(v);
			}
		});
		
		if(!where.length) {
			console.log(location);  
			return null;
		}
		
		if(where.length > 1){
			length = ((where[0].atLength - where[1].atLength) * where[0].positionAdjust) +  where[1].atLength;
		}else{
			length = where[0].atLength;
		}
		
		return length;

	}
	
	Tube.prototype.trainsAnimate = function(startLength,stopLength,secondsTo,secondsToCount,path,killMe){
		if(secondsToCount === secondsTo){
			clearInterval(killMe);
		}
		var length = Math.floor((((stopLength - startLength) / secondsTo) * secondsToCount) + startLength);   	
		var p = path.getPointAtLength(length);
		return "translate(" + [p.x, p.y] + ")";  
	}
	
	Tube.prototype.trains = function(data){
		
		var testLine = 'District';
		//var testLine = data.info.lineName.split(' ')[0].replace(',','');
		var testLineClass = testLine.charAt(0);
		
		if(testLine === 'Circle'){
			testLineClass = 'Ci';
		}
		
		if(data.line === 'H'){
			testLineClass = 'H';
			testLine = 'Hammersmith'; 
		}
		
		var that = this,
			Line = this.svg.select('#'+testLine+'-path');
		
		//Removes the old trains	
		d3.selectAll('.lines-path circle').remove();
		d3.selectAll('.lines-path text').remove();
         
		/*
		var trainBlob = Line.append("circle")
		    .attr({
			    r: 10,
			    class : testLineClass,
			    transform: function () {
			        var p = Line.selectAll('path')[0][0].getPointAtLength(2234)
			        return "translate(" + [p.x, p.y] + ")";
			    }  
			})
			.style('stroke','#fff')
			.style('stroke-width',2);
		
		console.log(Line.selectAll('path')[0][0].getTotalLength())
		*/
		
		_.each(data.trains,function(v,k){
			
				var startLength = that.parseVerbose(stationsData[testLine],v),
					stopLength = _.findWhere(stationsData[testLine],{code:data.id}).atLength,
					direction = v.Direction;
				
				v.SecondsTo = parseInt(v.SecondsTo,10);
				v.SecondsToCount = 0;

				if(startLength && v.SecondsTo < 300){            
				
					_.each(Line.selectAll('path')[0],function(path){
					
						var train = Line.append("circle")
						    .attr({
							    r: 10,
							    class : testLineClass,
							    transform: function () {
							        var p = path.getPointAtLength(startLength)
							        return "translate(" + [p.x, p.y] + ")";
							    }  
							})
							.style('stroke','#fff')
							.style('stroke-width',2)
					
						var trainNumber = Line.append("text")
							.attr("dy",".35em")
							.attr("text-anchor","middle")
							.attr('class', 'tube-number')
							.attr('transform',function () {
						        var p = path.getPointAtLength(startLength)
						        return "translate(" + [p.x, p.y] + ")";
						    })  
							.text(v.index);
					    
						if(v.positionAdjust !== -1){
							var killMe = setInterval(function(){
								v.SecondsToCount = v.SecondsToCount + 1;
								var position = that.trainsAnimate(startLength,stopLength,v.SecondsTo,v.SecondsToCount,path,killMe);
								train.attr('transform',position);
								trainNumber.attr('transform',position);
							},1000);
						}  

					});   
				
				}    

		});        

	}

	return Tube;

});

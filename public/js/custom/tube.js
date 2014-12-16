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
	
	Tube.prototype.drawLines = function(paths,svg){
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
	};
	
	Tube.prototype.drawInvisibleRails = function(paths,svg){
		_.each(paths,function(v,k){
			var Line = svg.append("g")
		      .attr("id", k + "-path")
		      .attr("class","lines-path")
			  .attr("transform","translate("+ v.x +","+ v.y +")");
			_.each(v.data,function(path,i){
				Line.append("svg:path")
					.attr("d", path.d)
					.attr("class",v.class + "_line_"+i);
			});
		});
	};
	
	Tube.prototype.drawStationContainer = function(svg){
		return svg.append("g")
	      .attr("id", "StationsMap")
		  .attr("transform","translate(0,0)");
	};
	
	Tube.prototype.labelPosition = function(){
		return {
			circle: {
				N: {
					text: {
						top: -18,
						left: -8
					},
					label: {
						top: -30,
						left: -15
					}
				},
				S: {
					text: {
						top: 26,
						left: -10
					},
					label: {
						top: 14,
						left: -18
					}
				},
				W: {
					text: {
						top: 4,
						left: -44
					},
					label: {
						top: -8,
						left: -50
					}
				},
				E: {
					text: {
						top: 4,
						left: 22
					},
					label: {
						top: -8,
						left: 15
					}
				}
			},
			rect: {
				N: {
					text: {
						top: -18,
						left: -8
					},
					label: {
						top: -30,
						left: -15
					}
				},
				S: {
					text: {
						top: 26,
						left: -10
					},
					label: {
						top: 14,
						left: -18
					}
				},
				W: {
					text: {
						top: 4,
						left: -44
					},
					label: {
						top: -8,
						left: -50
					}
				},
				E: {
					text: {
						top: 4,
						left: 22
					},
					label: {
						top: -8,
						left: 15
					}
				}
			}
		}; 
	};

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
		this.drawLines(paths,svg);
		
		//Adds stations container
		var StationsMap = this.drawStationContainer(svg);
		
		//Moves the tube code name around the stations
		var textPos = this.labelPosition();
		
		//Position all the stations on the map
		_.each(stationsMap,function(v,k){
			
			var lineClass = k.charAt(0);
				
			if(k === "Circle"){
				lineClass = 'Ci';
			}                             
			
			_.each(v,function(item){
				
				var mappedValues,
					rectDimensions,
					offset = {x:0,y:0};
				
				if(item.position.type && item.position.text){
					mappedValues = textPos[item.position.type][item.position.text]; 
				}else{
					mappedValues = textPos.circle.N;
				}
				
				if(item.position.type === 'circle'){ 
					StationsMap.append("circle")
						.attr("cx", item.position.x)
						.attr("cy", item.position.y)
						.attr("r", 8)
						.style("fill",'#fff')
						.style("stroke",'#000')
						.style("stroke-width",3)
						.style("opacity",0.6);  
				}else{

					if(item.position.text === 'W' || item.position.text === 'E'){
						rectDimensions = {x:10,y:6};
					}else{
						rectDimensions = {x:6,y:8}; 
					}
					
					if(item.position.text === 'W'){
						offset = {x:-8,y:0};
					}
					
					if(item.position.text === 'N'){
						offset = {x:0,y:-6};
					}
					
					StationsMap.append("rect")
						.attr("x", item.position.x + offset.x)
						.attr("y", item.position.y + offset.y)
						.attr("width", rectDimensions.x)
						.attr("height", rectDimensions.y) 
						.attr("class",lineClass);

				}
				
				if(item.position.text !== '-'){
					StationsMap.append("rect")
						.attr('class','label')
						.attr('id',item.code)
						.attr("x", item.position.x + mappedValues.label.left)
						.attr("y", item.position.y + mappedValues.label.top)
						.attr("width",36)
						.attr('height',16);
				
					StationsMap.append("text")
						.attr("x", item.position.x + mappedValues.text.left)
						.attr("y", item.position.y + mappedValues.text.top) 
						.text(item.code);   
				}

			});

		});
        
        /*
		var assetOverlay = svg.append("image")
			.attr("xlink:href", "images/map.png")
			.attr("width", 2422)
			.attr("height", 1620)
			.attr("transform","translate(38,22)");   

		this.svg.on('click',function(){
			console.log(d3.mouse(this));
		});
        */
        
		// Tracking of Trains SVG all Lines. Invisible to user.
		this.drawInvisibleRails(paths,svg);
		
	}
	
	Tube.prototype.parseVerbose = function(stationsData,testLine,trainData){
		
		if(!_.has(trainData,'Location')) trainData.Location = "";
		
		var location = trainData.Location.replace("'",""),
			where = [],
			length,
			positionAdjust;   
		
		_.each(stationsData[testLine],function(v,k){

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
		
		return where;

	}
	
	Tube.prototype.trainsAnimate = function(startLength,stopLength,secondsTo,secondsToCount,path,killMe){
		if(secondsToCount === secondsTo){
			clearInterval(killMe);
		}
		var length = Math.floor((((stopLength - startLength) / secondsTo) * secondsToCount) + startLength);   	
		var p = path.getPointAtLength(length);
		return "translate(" + [p.x, p.y] + ")";  
	}
	
	Tube.prototype.findLength = function(where,to,line){
		var startLength,
			indexes,
			index = 0;
			
		if(!where) return null;
		
	    indexes = this.findRoute(where,to,line);
	    index = this.findPathIndex(indexes);                       
		
		//Sets the length position along the path
		if(where.length > 1){
			startLength = ((where[0].atLength[index] - where[1].atLength[index]) * where[0].positionAdjust) +  where[1].atLength[index];
		}else{
			startLength = where[0].atLength[index];
		}
		
		return startLength;
		
	}
	
	Tube.prototype.findPathIndex = function(indexes){
		var index = 0;
		
		if(indexes && indexes.at > 0){
			index = indexes.at;
		}
		
		if(indexes && indexes.to > 0){
			index = indexes.to;
		}
		
		return index;
	}
	
	Tube.prototype.findRoute = function(where,to,line){
		
		if(!where) return null;
		
		var at = where[where.length-1].code,
			index = {
				at : 0,
				to : 0
			};
			
		var routes = {
			District : [
			/*EBY->UPM*/['EBY','ECM','ACT','CHP','TGR','STB','RCP','HMD','BCT','WKN'],
			/*RMD->UPM*/['RMD','KEW','GUN'],
			/*WDN->UPM*/['WDN','WMP','SFS','EPY','PUT','PGR','FBY','WBT'],
			/*WDN->ERD*/['HST','NHG','BAY','PAD','ERD']
			]

		}
		
		_.each(routes[line],function(v,k){
			_.each(v,function(station){
				if(at === station) index.at = k;
				if(to === station) index.to = k;
			});
		});
		
		return index;

	}
	
	Tube.prototype.trains = function(data){
		
		//var testLine = 'District';
		var testLine = data.info.lineName.split(' ')[0].replace(',','');
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
			        var p = Line.selectAll('path')[0][0].getPointAtLength(2280)
			        return "translate(" + [p.x, p.y] + ")";
			    }  
			})
			.style('stroke','#fff')
			.style('stroke-width',2);
		
		console.log(Line.selectAll('path')[0][0].getTotalLength())
		*/

		_.each(data.trains,function(v,k){
			
				var where = that.parseVerbose(stationsData,testLine,v),
					pathObj =  that.findRoute(where,data.id,testLine),
					pathIndex = that.findPathIndex(pathObj),
					startLength = that.findLength(where,data.id,testLine),
					stopLength = _.findWhere(stationsData[testLine],{code:data.id}).atLength[pathIndex],
					direction = v.Direction,
					path; 
				
				v.SecondsTo = parseInt(v.SecondsTo,10);
				v.SecondsToCount = 0; 

				if(startLength && v.SecondsTo < 2000){    
				
					path = Line.selectAll('path')[0][pathIndex];
					
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
				
				}    

		});        

	}

	return Tube;

});

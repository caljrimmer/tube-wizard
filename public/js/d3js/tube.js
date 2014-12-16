define([
	'jquery', 
	'underscore', 
	'backbone', 
	'registry', 
	'd3', 
	'data/linesData',
	'data/stationsData',
	'data/routesData' 
	], 
	function($, _, Backbone, Registry, d3, linesData, stationsData,routesData) {

	function Tube() { 
		this.trainArray = [];
		this.killMe = {};
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
		
		//Only used when constructing new lines
		this.construct.map(svg);

		// Tracking of Trains SVG all Lines. Invisible to user.
		this.drawInvisibleRails(paths,svg);
		
	}; 
	
	Tube.prototype.construct = {
		
		building : false,
		
		map : function(svg){ 
			if(this.building){
				var assetOverlay = svg.append("image")
					.attr("xlink:href", "images/map.png")
					.attr("width", 2422)
					.attr("height", 1620)
					.attr("transform","translate(38,22)");   

				svg.on('click',function(){
					console.log(d3.mouse(this));
				}); 
			}
		},
		
		trains : function(Line,testLineClass){
			if(this.building){
				var trainBlob = Line.append("circle")
				    .attr({
					    r: 10,
					    class : testLineClass,
					    transform: function () {
					        var p = Line.selectAll('path')[0][1].getPointAtLength(2462)
					        return "translate(" + [p.x, p.y] + ")";
					    }  
					})
					.style('stroke','#fff')
					.style('stroke-width',2);
				console.log(Line.selectAll('path')[0][1].getTotalLength());    
			}
		}
		
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
			return null;
		}
		
		return where;

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
			
		var routes = routesData;
		
		_.each(routes[line],function(v,k){
			_.each(v,function(station){
				if(at === station) index.at = k;
				if(to === station) index.to = k;
			});
		});
		
		return index;

	}
	
	Tube.prototype.trainsAnimate = function(startLength,stopLength,secondsTo,secondsToCount,path){
		if(secondsToCount === secondsTo){
			clearInterval(this.killMe);
		}
		var length = Math.floor((((stopLength - startLength) / secondsTo) * secondsToCount) + startLength);   	
		var p = path.getPointAtLength(length);
		return "translate(" + [p.x, p.y] + ")";  
	}
	
	Tube.prototype.calculateLength = function(data,testLine,Line,d){
		var where = this.parseVerbose(stationsData,testLine,d),
			pathObj =  this.findRoute(where,data.id,testLine),
			pathIndex = this.findPathIndex(pathObj),
			startLength = this.findLength(where,data.id,testLine),
			stopLength = _.findWhere(stationsData[testLine],{code:data.id}).atLength[pathIndex],
			path = Line.selectAll('path')[0][pathIndex]; 
			if(parseInt(d.SecondsTo,10) === 0){
				return {
					length : 0,
					path : 0
				} 
			}
			length = Math.floor((((stopLength - startLength) / parseInt(d.OrgSecondsTo,10)) * parseInt(d.OrgSecondsTo - d.SecondsTo,10)) + startLength);
			return {
				length : length,
				path : path
			}  
	} 
	
	Tube.prototype.trainsCircle = function(data,testLine,testLineClass,Line){
		
		var that = this; 
		
		var circle = Line.selectAll("circle")
		    .data(data.trains);
                                
		circle.enter().append("circle")
			.attr('r',10)
			.attr('class',testLineClass)
			.style('stroke','#fff')
			.style('stroke-width',2)
			
		circle.attr('transform',function (d,i) {
	        var obj = that.calculateLength(data,testLine,Line,d);
	   		if(obj.length === 0){
		    	return "translate(" + [0, 0] + ")";
			}
			var p = obj.path.getPointAtLength(obj.length);
	        return "translate(" + [p.x, p.y] + ")";
	    });	

		circle.exit().remove();
		
	};
	
	Tube.prototype.trainsText = function(data,testLine,Line){
		
		var that = this;
		
		var label = Line.selectAll("text")
		    .data(data.trains);

		label.enter().append("text")
			.attr("dy",".35em")
			.attr("text-anchor","middle")
			.attr('class', 'tube-number')
			.text(function(d){
				return d.index;
			});
			
		label.attr('transform',function (d,i) {
	        var obj = that.calculateLength(data,testLine,Line,d);
	   		if(obj.length === 0){
		    	return "translate(" + [0, 0] + ")";
			}   	
			var p = obj.path.getPointAtLength(obj.length);
	        return "translate(" + [p.x, p.y] + ")";
	    });  

		label.exit().remove();
		
	};
	
	Tube.prototype.trains = function(data){
		
		//var testLine = 'Central';
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
		       
		//Only used when constructing new lines
		this.construct.trains(Line,testLineClass);
		   
		//Enter + Update
		this.trainsCircle(data,testLine,testLineClass,Line);
		this.trainsText(data,testLine,Line);

	}

	return Tube;

});

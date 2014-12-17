define([
	'd3', 
	'data/linesData',
	'data/stationsData',
	'data/routesData',
	'data/labelData', 
	], 
	function(d3, linesData, stationsData,routesData,labelData) {

	function Tube() {
		this.linesData = linesData;
		this.stationsData = stationsData;
		this.routesData = routesData;
		this.labelData = labelData;
		this.isBuilding = false;
		this.currentLine = '';
	}
	
	Tube.prototype.drawLines = function(paths,svg){
		var props = Object.getOwnPropertyNames(paths);
		props.forEach(function(prop,i){
			var Line = svg.append("g")
		      .attr("id", i)
		      .attr("class","lines")
			  .attr("transform","translate("+ paths[prop].x +","+ paths[prop].y +")");
			paths[prop].data.forEach(function(p,i){
				Line.append("svg:path")
					.attr("d", p.d)
					.attr("class",paths[prop].class + "_line");
			});
		});
	};
	
	Tube.prototype.drawInvisibleRails = function(paths,svg){
		var props = Object.getOwnPropertyNames(paths);
		props.forEach(function(prop,i){
			var Line = svg.append("g")
		      .attr("id", prop + "-path")
		      .attr("class","lines-path")
			  .attr("transform","translate("+ paths[prop].x +","+ paths[prop].y +")");
			paths[prop].data.forEach(function(p,i){
				Line.append("svg:path")
					.attr("d", p.d)
					.attr("class",paths[prop].class + "_line_"+i);
			});
		});
	};
	
	Tube.prototype.drawStationContainer = function(svg){
		return svg.append("g")
	      .attr("id", "StationsMap")
		  .attr("transform","translate(0,0)");
	};

	Tube.prototype.drawMap = function(target) {
              
		target = target[0];
		target.innerHTML = null;  

		var w = target.getBoundingClientRect().width,
			h = target.getBoundingClientRect().height,
			t = target,
			paths = this.linesData,
			stationsMap = this.stationsData;

		var svg = d3.select(t).append("svg")
			.attr("width", w)
			.attr("height", h);
			
		this.svg = svg;
        
		// Visual SVG all Lines. Not the routes just the aesthetics.
		this.drawLines(paths,svg);
		
		//Adds stations container
		var StationsMap = this.drawStationContainer(svg);
		
		//Moves the tube code name around the stations
		var textPos = labelData;                  
		                     
		var stations = Object.getOwnPropertyNames(stationsMap);
		stations.forEach(function(station,i){
			
			var k = station,
				v = stationsMap[station];
			
			var lineClass = k.charAt(0);
				
			if(k === "Circle"){
				lineClass = 'Ci';
			}                        
			
			v.forEach(function(item,i){

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
		this.construct().map(svg);

		// Tracking of Trains SVG all Lines. Invisible to user.
		this.drawInvisibleRails(paths,svg);
		
	}; 
	
	Tube.prototype.construct = function(){
		
		var isBuilding = this.isBuilding;

		var map = function(svg){ 
			if(isBuilding){
				var assetOverlay = svg.append("image")
					.attr("xlink:href", "images/map.png")
					.attr("width", 2422)
					.attr("height", 1620)
					.attr("transform","translate(38,22)");   

				svg.on('click',function(){
					console.log(d3.mouse(this));
				}); 
			}
		}
		
		var trains = function(Line,testLineClass){
			if(isBuilding){
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
		
		return {
			trains : trains,
			map : map
		}
		
	}
	
	
	
	Tube.prototype.parseVerbose = function(stationsData,testLine,trainData){
		
		if(!trainData.hasOwnProperty('Location')) trainData.Location = "";
		
		var location = trainData.Location.replace("'",""),
			where = [],
			length,
			positionAdjust;   
		
		stationsData[testLine].forEach(function(train,i){

			if(location.indexOf(train.name) !== -1){
				
				train.positionAdjust = 0;
				
				if(location.indexOf('At ') !== -1){
					train.positionAdjust = -1;
				}
				
				if(location.indexOf('Between') !== -1){
					train.positionAdjust = 0.5;
				}
				
				where.push(train);
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
			
		var routes = this.routesData;

		if(routes[line]){
			routes[line].forEach(function(route,i){
				route.forEach(function(station){ 
					if(at === station) index.at = i;
					if(to === station) index.to = i;
				});	
			});		
		}

		return index;

	}
	
	Tube.prototype.calculateLength = function(data,testLine,Line,d){
		
		var where = this.parseVerbose(this.stationsData,testLine,d),
			pathObj =  this.findRoute(where,data.id,testLine),
			pathIndex = this.findPathIndex(pathObj),
			startLength = this.findLength(where,data.id,testLine),
			stopLength = _.findWhere(this.stationsData[testLine],{code:data.id}).atLength[pathIndex],
			path = Line.selectAll('path')[0][pathIndex];
			
		var STo = parseInt(d.SecondsTo,10),
			OSTo = parseInt(d.OrgSecondsTo,10);
			 
			if(STo <= 0) STo = 0; 
			//0.7 helps smaooth out the movement of the trains when the fetch is completed on new TFL data
			length = Math.floor( (((stopLength - startLength) / OSTo) * ((OSTo - STo) * 0.7)) + startLength );
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
			
		circle.transition().attr('transform',function (d,i) {
	        var obj = that.calculateLength(data,testLine,Line,d);
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
			
		label.transition().attr('transform',function (d,i) {
	        var obj = that.calculateLength(data,testLine,Line,d);	
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
		
		//Removes the old trains if new line selected 
		if(this.currentLine !== testLineClass || this.currentLine === ''){
			d3.selectAll('.lines-path circle').remove();
			d3.selectAll('.lines-path text').remove();
			this.currentLine = testLineClass;
		}
		
		var that = this,
			Line = this.svg.select('#'+testLine+'-path');
		       
		//Only used when constructing new lines
		this.construct().trains(Line,testLineClass);
		   
		//Enter + Update
		this.trainsCircle(data,testLine,testLineClass,Line);
		this.trainsText(data,testLine,Line);

	}

	return Tube;

});

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

	function Tube() {}

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
				
				if(item.position.type === 'rect'){
					if(item.position.attr.rotate === 0){
						
						StationsMap.append("rect")
							.attr("x", item.position.x + item.position.attr.offset.x)
							.attr("y", item.position.y + item.position.attr.offset.y - 3)
							.attr("width", 8)
							.attr("height", 6) 
							.attr("class",k.charAt(0));
							
							if(item.position.attr.offset.x >= 0){
								
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
									  
							}else{
								
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
							   
					}else{
						
						StationsMap.append("rect")
							.attr("x", item.position.x + item.position.attr.offset.x - 3)
							.attr("y", item.position.y + item.position.attr.offset.y)
							.attr("width", 6)
							.attr("height", 8) 
							.attr("class",k.charAt(0));
						
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
				
			});
		});
			      

	}
	
	Tube.prototype.parseVerbose = function(stationsData,trainData){
		var atStation = false,
			location = trainData.Location.replace("'",""),
			where = [];   
		
		//Find mentioned stations from API (two with Between hence the Array)
		_.each(stationsData.Bakerloo,function(v,k){
			if(location.indexOf(v.name) !== -1){
				if(location.indexOf('Platform')) atStation = true;
				v.atStation = atStation
				where.push(v);
			}
		});
		
		if(!where.length) {
			console.log(location);  
			return null;
		}
		
		return where[0].atLength;
		
		if(!isAt){
			if(trainData.Direction === 'Eastbound' || trainData.Direction === 'Southbound'){
				return Math.floor((where[0].atLength - where[1].atLength)/2);
			}else{
				return Math.floor((where[1].atLength - where[0].atLength)/2);
			}
		}else{
			return where[0].atLength;
		}
		
	}
	
	Tube.prototype.trains = function(data){
		var that = this,
			Line = this.svg.select('#Bakerloo');
		
		Line.style('opacity',1)
		
		//Removes the old trains	
		Line.selectAll('circle').remove();
		Line.selectAll('text').remove();
		
		_.each(data.trains,function(v,k){
			var startLength = that.parseVerbose(stationsData,v),
				stopLength = _.findWhere(stationsData.Bakerloo,{code:data.id}).atLength,
				direction = v.Direction;

			if(startLength){            
				
				_.each(Line.selectAll('path')[0],function(path){
					
					//Look at journey length against the total path distance.
					var duration = Math.ceil((path.getTotalLength()/Math.abs(startLength - stopLength)) * parseInt(v.SecondsTo,10) * 1000);
					   
					var pathLength = path.getTotalLength(); 
					var train = Line.append("circle")
					    .attr({
						    r: 10,
						    class : 'B',
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
						.text(v.index);
					
					if(!v.atStation){
					 
						train.transition()
						    .duration(duration)
						    .ease("linear")
						    .attrTween("transform", function (d, i) {
						    return function (t) {
								if(direction === "Southbound"){
									var length = startLength - (startLength*t);
									if(stopLength < length){
							        	var p = path.getPointAtLength(length);
										return "translate(" + [p.x, p.y] + ")"; 
									}else{
										train.remove();
									}
								}else{
									var length = ((pathLength-startLength)*t) + startLength;
									if(stopLength > length){
							        	var p = path.getPointAtLength(length);
										return "translate(" + [p.x, p.y] + ")"; 
									}else{
										train.remove();
									}

								}
						    }
						});
					
						trainNumber.transition()
						    .duration(duration)
						    .ease("linear")
						    .attrTween("transform", function (d, i) {
						    return function (t) {
								if(direction === "Southbound"){
									var length = startLength - (startLength * t);
									if(stopLength < length){
							        	var p = path.getPointAtLength(length);
										return "translate(" + [p.x, p.y] + ")"; 
									}else{
										train.remove();
									}
								}else{
									var length = ((pathLength-startLength)*t) + startLength;
									if(stopLength > length){
							        	var p = path.getPointAtLength(length);
										return "translate(" + [p.x, p.y] + ")"; 
									}else{
										train.remove();
									}

								}
						    }
						});
                    
					}

				});   
				
			}  
		});        

	}

	return Tube;

});

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
			stationsMap = stationsData,  
			duration = 10000;

		var svg = d3.select(t).append("svg")
			.attr("width", w)
			.attr("height", h);
			
		this.svg = svg;
        
		// Visual SVG all Lines. Not the routes just the aesthetics.
		var allLines = function(){
			
			_.each(paths,function(v,k){
				
				var Line = svg.append("g")
			      .attr("id", k)
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
						.style("stroke-width",3); 
						
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
	
	Tube.prototype.trains = function(data){
		
		console.log(data)        
		
		var Line = this.svg.select('#Bakerloo')

		_.each(Line.selectAll('path')[0],function(path){

			var pathLength = path.getTotalLength(); 
			var train = Line.append("circle")
			    .attr({
			    r: 8,
			    class : 'B',
			    transform: function () {
			        var p = path.getPointAtLength(0)
					console.log(p)
			        return "translate(" + [p.x, p.y] + ")";
			    }
			}); 

			train.transition()
			    .duration(10000)
			    .ease("linear")
			    .attrTween("transform", function (d, i) {
			    return function (t) {
			        var p = path.getPointAtLength(pathLength*t);
			        return "translate(" + [p.x, p.y] + ")";
			    }
			});

		});

	}

	return Tube;

});

define(['jquery', 'underscore', 'backbone', 'registry', 'd3'], function($, _, Backbone, Registry, d3) {

	function Chart() {
		this.periodLimit = 1200;
	}
	
	Chart.prototype.radial = function(target,obj) {
		
		$(target).empty();
		
		if(obj.time < this.periodLimit){
			this.perc = (this.periodLimit-obj.time)/this.periodLimit;
		}else{
			this.perc = 0.01;
		}     
		
		var width = obj.width,
			height = obj.height;
			
		this.angle = 2 * Math.PI;
		 
		var arc = d3.svg.arc()
		    .innerRadius(9)
		    .outerRadius(14)
		    .startAngle(0);

		var svg = d3.select(target[0]).append("svg")
		    .attr("width", width)
		    .attr("height", height)
		  	.append("g")
		    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

		var background = svg.append("circle")
			.attr("class",obj.type+'_bk')
			.attr("cx", 0)
			.attr("cy", 0)
		    .attr("r", 14);

		this.foreground = svg.append("path")
		    .datum({endAngle: this.perc * this.angle})
		    .attr("class",obj.type)
		    .attr("d", arc);
		
		var text = svg.append("svg:text")
			.attr("dy",".35em")
			.attr("text-anchor","middle")
			.attr('class', 'perc-value')
			.text(obj.index);
			
		this.arcTween = function(transition, newAngle) {
			transition.attrTween("d", function(d) {
			var interpolate = d3.interpolate(d.endAngle, newAngle);
				return function(t) {
					d.endAngle = interpolate(t);
					return arc(d);   
				};  
			});          
		}  

	}
	
	Chart.prototype.radialIncrement = function(obj){
		
		if(obj.time < this.periodLimit){
			this.perc = (this.periodLimit-obj.time)/this.periodLimit;
		}
		if(this.perc <= 1){ 
			this.foreground.transition()
		      .duration(750)
		      .call(this.arcTween, this.perc * this.angle);
		}
		
	}

	return Chart;

});

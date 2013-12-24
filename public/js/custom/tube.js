define(['jquery', 'underscore', 'backbone', 'registry', 'd3'], function($, _, Backbone, Registry, d3) {

	function Tube() {
		this.padding = 2;
		this.radialObj = {};
	}


	Tube.prototype.lines = function(target) {

		$(target).empty();

		var w = $(target).width(),
			h = $(target).height(),
			t = target[0],
			train;

		var svg = d3.select(t).append("svg")
			.attr("width", w)
			.attr("height", h)
		
		var paths = {
			piccadily : [
				{d : 'M799.332,1393.97c-4.659,4.66-6.995,10.761-6.993,16.88v47.75c0,6.11-2.33,12.221-6.99,16.881c-0.232,0.239,0,0,0,0c-4.322,4.31-10.289,6.989-16.873,6.989c-6.109,0-12.223-2.34-16.875-6.989c-4.318-4.341-6.984-10.301-6.984-16.881c0-6.6,2.67-12.58,7.006-16.899l47.826-47.83 M698.171,1495.13l310.563-310.56c3.439-3.45,10.244-6.261,15.115-6.261h132.006'},
				{d : 'M2301.34,264.448v250.703c0,4.867-2.81,11.674-6.26,15.119l-321.5,321.508c-3.45,3.442-6.27,10.242-6.27,15.111v98.739c0,4.869-2.82,11.668-6.261,15.113l-86.149,86.151c-3.44,3.442-10.24,6.263-15.12,6.263h-156.95c-4.87,0-11.67,2.816-15.12,6.262l-92.63,92.623c-3.439,3.44-10.25,6.27-15.12,6.27h-524.877'},
				{d : 'M1065.677,1178.31c-7.498-0.02-14.875-2.829-20.603-8.54l-6.973-6.96c-2.717-2.729-4.377-6.42-4.383-10.579V519.194c0-4.867-2.826-11.662-6.273-15.099c0,0-68.414-68.073-71.307-70.967c-2.803-2.803-8.34-5.819-12.896-5.819c-5.565,0-248.11,0-248.11,0'}
			],
			Metropolitan : [
				{d : 'M689.296,652.657h254.946c5.974,0,13.289,3.461,17.511,7.678l78.764,78.76c3.44,3.447,10.244,6.265,15.115,6.265h147.379'},
				{d : 'M1741.23,1088.282l294.199,0.026c4,0,7.76,1.551,10.58,4.383 M685.9,497.813h226.164c4.873,0,11.674,2.813,15.119,6.262l234.932,235.02c3.441,3.447,10.238,6.265,15.113,6.265l195.195,0.012c4.869,0,11.672,2.818,15.118,6.264l330.379,330.378c3.45,3.442,10.24,6.269,15.11,6.269l302.399,0.026c4,0,7.76,1.551,10.58,4.383l78.26,78.248c5.351,5.336,12.44,8.28,19.99,8.28h149.75c3.99,0,7.76,1.554,10.58,4.378c2.82,2.829,4.38,6.584,4.38,10.582v73.303'}
			],
			Bakerloo : [
				{d : 'M1200.115,719.005c-3.821-3.828-6.264-9.557-6.264-15.121 M1805.689,1387.05l-23.81-23.819c-3.44-3.45-6.26-10.25-6.26-15.12V1114.8c0-4.859-2.82-11.67-6.271-15.109l-124.76-124.773c-3.439-3.444-6.26-10.244-6.26-15.115v-48.562c0-4.869-2.811-11.668-6.26-15.113l-115.2-115.199c-3.44-3.438-10.24-6.26-15.11-6.26l-237.124-0.006c-4.871,0-11.679-2.82-15.115-6.256l-49.406-49.4c-3.821-3.828-6.264-9.557-6.264-15.121v-6.508c0-4.871,0-12.84,0-17.711V373.337'}
			],
			Northern : [
				{d : 'M1645.95,246.454c0-4.869-2.81-11.668-6.261-15.115c-2.359-2.362-2.239-2.246-38.789-38.799'},
				{d : 'M1583.48,656.665v-63.469c0-4.871-2.811-11.674-6.261-15.115l-0.76-0.766c-3.44-3.441-6.26-10.246-6.26-15.115v-18.316c0-4.875,2.819-11.678,6.26-15.118l63.24-63.248c3.45-3.445,6.27-10.244,6.27-15.115v-342.98'},
				{d : 'M1517.79,1343.16c3.44-3.44,6.26-10.25,6.26-15.12V711.597c0-4.872,2.82-11.672,6.261-15.116l20.35-20.357c3.449-3.442,6.26-10.047,6.26-14.68v-68.248c0-4.871,2.82-11.674,6.26-15.115l0.76-0.766c3.451-3.441,6.261-10.246,6.261-15.115v-18.316c0-4.875-2.81-11.678-6.261-15.118c-3.529-3.527-303.56-303.566-303.56-303.566 M1209.33,1651.6l572.42-572.399c3.439-3.45,6.26-10.25,6.26-15.12V702.151c0-5.965-2.42-11.371-6.33-15.279c-3.91-3.916-9.33-6.334-15.29-6.334h-161.62c-11.75,0-21.289-9.531-21.289-21.289v-66.053c0-4.871-2.811-11.674-6.261-15.115l-0.76-0.766c-3.44-3.441-6.26-10.246-6.26-15.115v-18.316c0-4.875,2.819-11.678,6.26-15.118'}
			],
			Victoria : [
				{d : 'M1240.47,1404.78l-171.229-171.23c-3.44-3.439-6.26-10.24-6.26-15.109V876.995c0-4.871,2.82-11.674,6.26-15.109l236.56-236.557c3.44-3.441,10.24-6.266,15.11-6.266h213.45c4.87,0,11.67-2.816,15.12-6.258l36.25-36.246c3.439-3.439,6.25-10.238,6.25-15.113V446.399c0-4.869,2.819-11.668,6.26-15.109l67.68-67.664c3.44-3.447,10.24-6.266,15.11-6.266h257.45'}
			],
			Circle : [
				{d : 'M1006.953,1019.89V801.934c-0.024-1.17,0.453-3.461,1.334-5.541c0.849-2.101,2.136-4.052,2.98-4.865l73.527-73.531c4.125-4.106,9.456-6.317,15.274-6.324l611.362-0.014c5.971,0,11.37,2.418,15.29,6.332l78.25,78.248c3.92,3.91,9.32,6.324,15.29,6.324h149.75c5.971,0,11.37,2.42,15.28,6.334c3.91,3.916,6.33,9.317,6.33,15.283v102.284c0,5.961-2.42,11.371-6.33,15.283s-9.31,6.328-15.28,6.328h-155.93c-5.97,0-11.37,2.42-15.28,6.326l-91.83,91.839c-2.829,2.819-6.59,4.38-10.579,4.38h-503.827c-5.961,0-11.371-2.42-15.279-6.32c-4.217-4.229-6.33-9.76-6.33-15.29V750.757c0-5.971,2.416-11.371,6.33-15.28c3.908-3.916,9.318-6.334,15.279-6.334h56.626'}
			],
			District : [
				{d : 'M608.273,1018.27c-5.973,0-11.375,2.421-15.285,6.33c-3.914,3.91-6.33,9.311-6.33,15.29v160.091'},
				{d : 'M2538.41,399.534l-341.28,341.277c-3.44,3.446-10.24,6.266-15.11,6.266l-221.43-0.008c-4.859,0-11.67,2.813-15.109,6.262L1791.38,907.442c-5.34,5.342-12.44,8.284-19.99,8.284h-165.31c-3.99,0-7.75,1.552-10.58,4.384l-91.83,91.83c-3.91,3.909-9.31,6.329-15.28,6.329H539.208c-5.97,0-11.373-2.42-15.285-6.329l-21.527-21.521c-3.908-3.9-6.328-9.31-6.328-15.28V844.13c0-5.975-2.42-11.371-6.33-15.285c-3.912-3.911-9.315-6.331-15.283-6.331c-5.463,0-17.303,0-17.303,0 M934.097,1018.39c-5.965,0-11.373,2.42-15.283,6.33s-6.33,9.311-6.33,15.29c0,5.8,0,325.061,0,325.061 M934.097,1018.39c-5.965,0-11.373-2.42-15.283-6.33c-3.91-3.909-6.33-9.319-6.33-15.279c0-5.811,0-65.74,0-65.74'},
				{d : 'M934.695,1018.39c5.961,0,11.828-2.89,15.277-6.33c3.453-3.46,6.326-9.319,6.326-15.279V711.757c0-7.547,2.944-14.647,8.284-19.983c5.339-5.344,12.435-8.279,19.982-8.279h56.306'}
			],
			Hammersmith : [
				{d : 'M744.291,1059.89V841.934c0-4.869,2.824-11.671,6.265-15.119l73.527-73.529c5.336-5.336,12.44-8.275,19.985-8.275h611.362c7.55,0,14.65,2.939,19.99,8.275l78.26,78.254c2.83,2.822,6.58,4.375,10.58,4.375h149.75c7.551,0,14.65,2.947,19.99,8.275c5.34,5.346,8.27,12.44,8.27,19.99c0,8.184,0,45.948,0,45.948c0,5.527,2.11,11.06,6.33,15.275l7.59,7.555c4.74,4.74,7.881,7.113,14.091,7.113s12.43-2.373,17.17-7.113l105.33-105.328c2.63-2.602,5.8-4.446,9.18-5.866c3.39-1.388,6.94-2.33,10.63-2.351l221.221,0.014c0.119-0.004,0.229-0.004,0.34,0c1.21-0.018,3.41-0.483,5.41-1.334c2.1-0.844,4.05-2.133,4.869-2.985L2255.34,704.2'}
			],
			DLR : [
				{d : 'M1782.08,737.479v14.131c0,4.869-2.82,11.67-6.26,15.11l-81.771,81.763c-3.45,3.442-6.26,8.588-6.26,13.516v642.531'},
				{d : 'M1479.36,1031.688c-4.87,0-11.671,2.813-15.11,6.259c-4.7,4.688-27.36,27.354-27.36,27.354 M1284.84,1006.708h152.5c4.87,0,11.68,2.826,15.12,6.265l12.45,12.452c3.439,3.439,10.25,6.263,15.12,6.263h465.76c4.87,0,11.67,2.813,15.11,6.259l187.67,187.674 M1657.84,1031.688c4.391,0,10.811,2.813,14.25,6.259l9.44,9.443c3.45,3.44,6.26,10.24,6.26,15.11 M1884.49,1031.694c4.87,0,11.67,2.814,15.12,6.254l314.56,314.571'}
			],
			Central : [
				{d : 'M516.761,624.79v222.43c0,4.869,2.819,11.679,6.264,15.121l257.258,257.252c3.445,3.451,10.25,6.263,15.113,6.263 M2328.1,728.446c0-7.607,6.16-13.771,13.771-13.771h127.069c7.601,0,13.771-6.166,13.771-13.776V545.993c0-7.604-6.17-13.775-13.771-13.775H2341.87c-7.61,0-13.771,6.171-13.771,13.775 M2328.1,346.348v516.811c0,2.814-2.819,9.627-6.26,13.066l-147.74,147.741c-3.439,3.445-10.239,6.257-15.109,6.257'},
				{d : 'M2158.98,1030.223H1958.97c-4.87,0-11.67,2.823-15.12,6.269l-128.859,128.873c-3.45,3.44-10.25,6.258-15.12,6.258h-79.49c-4.87,0-11.66-2.817-15.11-6.258l-33.239-33.236c-3.44-3.448-10.24-6.264-15.11-6.264H612.041'}
			],
			EL : [
				{d : 'M859.466,614.514V95.278 M776.722,606.677c-3.435,3.447-6.262,10.248-6.265,15.119 M954.136,1156.09c0,4.87,2.821,11.67,6.266,15.12l197.728,197.73M2178.16,660.919H2003.8c-4.87,0-11.68-2.817-15.11-6.258l-68.909-68.897c-3.44-3.445-10.24-6.259-15.11-6.259h-291.95c-4.87,0-11.67-2.819-15.12-6.26l-103.33-103.344c-3.45-3.447-10.25-6.262-15.13-6.262h-129.93c-4.86,0-11.67,2.815-15.11,6.262l-83.54,83.539c-3.44,3.446-10.24,6.26-15.11,6.26h-402.9c-4.871,0-11.67,2.816-15.115,6.266 M711.382,672.016c-3.441,3.44-6.259,10.248-6.259,15.12v319.044c0,4.87-2.821,11.681-6.266,15.12l-51.572,51.61c-5.104,5.08-8.284,12.189-8.28,19.979c0,8.41,0,160.091,0,160.091 M2360.63,676.292v-56.76c0-4.869-2.81-11.67-6.26-15.115l-17.16-17.162c-3.44-3.448-10.25-6.266-15.11-6.266H2104.86c-4.86,0-11.671-2.82-15.11-6.256L2050,534.979c-3.45-3.445-6.27-10.25-6.27-15.119v-72.472c0-4.868-2.811-11.668-6.261-15.116l-65.1-65.101c-3.431-3.44-10.24-6.26-15.11-6.26H1727.3c-4.88,0-11.68,2.82-15.12,6.26l-71.59,71.59c-3.45,3.441-10.24,6.259-15.109,6.259H1466.6'},
				{d : 'M776.767,606.686c-3.443,3.442-6.266,10.243-6.275,15.112l-0.159,120.879c-0.003,4.865,2.805,11.671,6.25,15.111l171.331,171.33c3.435,3.444,6.255,10.252,6.255,15.121v211.841c0,4.87,2.819,11.67,6.264,15.11l197.727,197.739 M2178.14,660.929h-174.35c-4.87,0-11.67-2.823-15.101-6.264l-68.909-68.891c-3.44-3.445-10.24-6.258-15.11-6.258h-291.95c-4.859,0-11.659-2.824-15.109-6.265l-103.33-103.336c-3.45-3.445-10.25-6.264-15.12-6.264h-129.92c-4.87,0-11.67,2.819-15.12,6.264l-83.54,83.535c-3.44,3.445-10.24,6.26-15.11,6.26H832.591c-4.881,0-11.677,2.82-15.119,6.265L711.427,672.018c-3.445,3.44-6.267,10.246-6.267,15.118v319.044c0,4.86-2.813,11.66-6.258,15.11l-51.572,51.6c-5.1,5.091-8.28,12.21-8.28,19.98c0,8.42,0,160.85,0,160.85'},
				{d : 'M1828.51,1552.4c0,5.54-2.109,11.069-6.34,15.29c-21.109,21.109-58.27,58.26-58.27,58.26 M1930.561,1192.45c0,5.53-2.121,11.06-6.341,15.29c-7.659,7.66-89.38,89.38-89.38,89.38c-4.22,4.22-6.33,8.1-6.33,13.96v356.17 M1930.561,1335.3c0-13.819,0-35.31,0-712.946'},
				{d : 'M1428.85,691.561l-42.51-42.515c-3.45-3.446-10.25-6.264-15.12-6.264H874.236c-3.516,0.049-7.893-1.713-10.42-4.318c-2.516-2.448-4.367-6.791-4.309-10.418V95.305'}
			]
		};
		
		
		
		//Piccadily
		var Piccadily = svg.append("g")
	      .attr("id", "Piccadily")
		  .attr("transform","translate(-632,-176)");
	
		Piccadily.append("svg:path")
			.attr("d", paths.piccadily[0].d)
			.style("stroke-width", 6)
			.style("stroke", "#1C3E93")
			.style("fill", "none");
			
		Piccadily.append("svg:path")
			.attr("d", paths.piccadily[1].d)
			.style("stroke-width", 6)
			.style("stroke", "#1C3E93")
			.style("fill", "none");
			
		Piccadily.append("svg:path")
			.attr("d", paths.piccadily[2].d)
			.style("stroke-width", 6)
			.style("stroke", "#1C3E93")
			.style("fill", "none");
			
		//Metropolitan
		var Metropolitan = svg.append("g")
	      .attr("id", "Metropolitan")
		  .attr("transform","translate(-632,-409)");
		
		Metropolitan.append("svg:path")
			.attr("d", paths.Metropolitan[0].d)
			.attr("class","met-1")
			.style("stroke-width", 6)
			.style("stroke", "#96005E")
			.style("fill", "none");
		
		Metropolitan.append("svg:path")
			.attr("d", paths.Metropolitan[1].d)
			.attr("class","met-2") 
			.style("stroke-width", 6)
			.style("stroke", "#96005E")
			.style("fill", "none"); 
			
		var targetPath = d3.selectAll('g'),
		    pathNode = targetPath.selectAll('path').node(),
		    pathLength = pathNode.getTotalLength();
		
		_.each(pathNode,function(path){
			var pathLength = path.getTotalLength();
			var train = targetPath.append("circle")
			    .attr({
			    r: 8,
			    fill: '#96005E',
			    transform: function () {
			        var p = path.getPointAtLength(0)
			        return "translate(" + [p.x, p.y] + ")";
			    }
			}); 
		});

		

		// Animate the circle:

		duration = 10000;
		train.transition()
		    .duration(duration)
		    .ease("linear")
		    .attrTween("transform", function (d, i) {
		    return function (t) {
		        var p = pathNode.getPointAtLength(pathLength*t);
		        return "translate(" + [p.x, p.y] + ")";
		    }
		});   
			
		//Bakerloo
		var Bakerloo = svg.append("g")
	      .attr("id", "Bakerloo")
		  .attr("transform","translate(-499,-130)"); 
		
		Bakerloo.append("svg:path")
			.attr("d", paths.Bakerloo[0].d)
			.style("stroke-width", 6)
			.style("stroke", "#AF6010")
			.style("fill", "none");
			
		//Northern
		
		var Northern = svg.append("g")
	      .attr("id", "Northern")
		  .attr("transform","translate(-270,-30)");
		
		Northern.append("svg:path")
			.attr("d", paths.Northern[0].d)
			.style("stroke-width", 6)
			.style("stroke", "#231F20")
			.style("fill", "none"); 
				
		Northern.append("svg:path")
			.attr("d", paths.Northern[1].d)
			.style("stroke-width", 6)
			.style("stroke", "#231F20")
			.style("fill", "none");
			
		Northern.append("svg:path")
			.attr("d", paths.Northern[2].d)
			.style("stroke-width", 6)
			.style("stroke", "#231F20")
			.style("fill", "none");
		
		//Circle
		
		var Circle = svg.append("g")
	      .attr("id", "Circle")
		  .attr("transform","translate(-308,-39)");
		
		Circle.append("svg:path")
			.attr("d", paths.Circle[0].d)
			.style("stroke-width", 6)
			.style("stroke", "#FFD200")
			.style("fill", "none");
			
		//District
		
		var District = svg.append("g")
	      .attr("id", "District")
		  .attr("transform","translate(-100,0)");
				
		District.append("svg:path")
			.attr("d", paths.District[0].d)
			.style("stroke-width", 6)
			.style("stroke", "#00843F")
			.style("fill", "none");
			
		District.append("svg:path")
			.attr("d", paths.District[1].d)
			.style("stroke-width", 6)
			.style("stroke", "#00843F")
			.style("fill", "none"); 
				
		District.append("svg:path")
			.attr("d", paths.District[2].d)
			.style("stroke-width", 6)
			.style("stroke", "#00843F")
			.style("fill", "none");
			
		//Hammersmith
		
		var Hammersmith = svg.append("g")
	      .attr("id", "Hammersmith")
		  .attr("transform","translate(-52,-78)");
		   				    
		Hammersmith.append("svg:path")
			.attr("d", paths.Hammersmith[0].d)
			.style("stroke-width", 6)
			.style("stroke", "#F285A0")
			.style("fill", "none");

		//DLR
		
		var DLR = svg.append("g")
	      .attr("id", "DLR")
		  .attr("transform","translate(240,-120)");
		   				    
		DLR.append("svg:path")
			.attr("d", paths.DLR[0].d)
			.style("stroke-width", 6)
			.style("stroke", "#00A99D")
			.style("fill", "none");  

		DLR.append("svg:path")
			.attr("d", paths.DLR[1].d)
			.style("stroke-width", 6)
			.style("stroke", "#00A99D")
			.style("fill", "none"); 

		//Central
		
		var Central = svg.append("g")
	      .attr("id", "Central")
		  .attr("transform","translate(-255,-310)");
		   				    
		Central.append("svg:path")
			.attr("d", paths.Central[0].d)
			.style("stroke-width", 6)
			.style("stroke", "#ED3024")
			.style("fill", "none");  

		Central.append("svg:path")
			.attr("d", paths.Central[1].d)
			.style("stroke-width", 6)
			.style("stroke", "#ED3024")
			.style("fill", "none");  

		//Overground
		
		var EL = svg.append("g")
	      .attr("id", "EL")
		  .attr("transform","translate(-158,-54)");
		   				    
		EL.append("svg:path")
			.attr("d", paths.EL[0].d)
			.style("stroke-width", 6)
			.style("stroke", "#F7931E")
			.style("fill", "none");  

		EL.append("svg:path")
			.attr("d", paths.EL[1].d)
			.style("stroke-width", 6)
			.style("stroke", "#F7931E")
			.style("fill", "none"); 

		EL.append("svg:path")
			.attr("d", paths.EL[2].d)
			.style("stroke-width", 6)
			.style("stroke", "#F7931E")
			.style("fill", "none");
			
		EL.append("svg:path")
			.attr("d", paths.EL[3].d)
			.style("stroke-width", 6)
			.style("stroke", "#F7931E")
			.style("fill", "none"); 
		
		var assetOverlay = 	svg.append("image")
			.attr("xlink:href", "images/map.png")
			.attr("width", 2422)
			.attr("height", 1620)
			.attr("transform","translate(38,22)");   
			
		//Stations
		var stations = {};
		stations["Amersham"] = { x: 117.5674, y: 193.3823 };
		stations["Chorleywood"] = { x: 285.0654, y: 207.4351 };
		stations["Mill Hill East"] = { x: 1316.9741, y: 261.0347 };
		stations["Rickmansworth"] = { x: 306.2056, y: 236.7271 };
		stations["Perivale"] = { x: 340.7793, y: 712.6431 };
		stations["Kentish Town West"] = { x: 1342.5054, y: 526.9585 };
		stations["Camden Road"] = { x: 1415.4062, y: 604.6323 };
		stations["Dalston Kingsland"] = { x: 1861.8066, y: 628.8521 };
		stations["Hackney Central"] = { x: 1892.168, y: 661.3706 };
		stations["Wanstead Park"] = { x: 2157.4961, y: 640.8804 };
		stations["Vauxhall"] = { x: 1111.8071, y: 1357.4546 };
		stations["Hanger Lane"] = { x: 368.2026, y: 767.9116 };
		stations["Edgware"] = { x: 991.7798, y: 284.6177 };
		stations["Burnt Oak"] = { x: 1021.0874, y: 324.522 };
		stations["Colindale"] = { x: 1055.2778, y: 355.0181 };
		stations["Hendon Central"] = { x: 1063.6187, y: 385.522 };
		stations["Brent Cross"] = { x: 1103.6987, y: 416.0181 };
		stations["Golders Green"] = { x: 1115.1084, y: 446.522 };
		stations["West Silvertown"] = { x: 2141.3574, y: 1055.1245 };
		stations["Pontoon Dock"] = { x: 2206.127, y: 1108.2144 };
		stations["London City Airport"] = { x: 2224.0293, y: 1161.3159 };
		stations["Woolwich Arsenal"] = { x: 2417.8086, y: 1325.146 };
		stations["King George V"] = { x: 2310.2383, y: 1214.4058 };
		stations["Hampstead"] = { x: 1165.8394, y: 477.019 };
		stations["Belsize Park"] = { x: 1229.2896, y: 542.9644 };
		stations["Chalk Farm"] = { x: 1264.0894, y: 573.4683 };
		stations["Chalfont & Latimer"] = { x: 247.9302, y: 152.8804 };
		stations["Chesham"] = { x: 116.1196, y: 127.7349 };
		stations["New Cross Gate"] = { x: 1636.1035, y: 1362.4956 };
		stations["Moor Park"] = { x: 438.9243, y: 238.3599 };
		stations["Northwood"] = { x: 468.7925, y: 268.2222 };
		stations["Northwood Hills"] = { x: 488.6553, y: 294.7935 };
		stations["Pinner"] = { x: 538.1606, y: 333.7427 };
		stations["North Harrow"] = { x: 564.1733, y: 363.606 };
		stations["Custom House for ExCeL"] = { x: 2363.0723, y: 994.1479 };
		stations["Prince Regent"] = { x: 2312.9336, y: 1024.0054 };
		stations["Royal Albert"] = { x: 2342.8027, y: 1053.8745 };
		stations["Beckton Park"] = { x: 2372.6621, y: 1083.7437 };
		stations["Cyprus"] = { x: 2401.0918, y: 1112.8745 };
		stations["Gallions Reach"] = { x: 2432.4023, y: 1143.4741 };
		stations["Beckton"] = { x: 2462.2617, y: 1173.3335 };
		stations["Watford"] = { x: 431.3545, y: 173.4819 };
		stations["Croxley"] = { x: 431.3545, y: 205.9526 };
		stations["Fulham Broadway"] = { x: 761.2056, y: 1240.4937 };
		stations["Lambeth North"] = { x: 1345.2729, y: 1287.644 };
		stations["Heathrow Terminal 4"] = { x: 242.9331, y: 1360.6343 };
		stations["Harrow- on-the-Hill"] = { x: 606.5137, y: 390.772 };
		stations["Kensal Rise"] = { x: 802.646, y: 573.103 };
		stations["Canonbury"] = { x: 1771.9922, y: 594.4956 };
		stations["Bethnal Green"] = { x: 1862.1719, y: 776.5474 };
		stations["Westferry"] = { x: 1922.2227, y: 974.7241 };
		stations["Seven Sisters"] = { x: 1803.2344, y: 417.7808 };
		stations["Blackwall"] = { x: 2027.9238, y: 974.7241 };
		stations["Brondesbury Park"] = { x: 866.6123, y: 573.105 };
		stations["Hampstead Heath"] = { x: 1275.1948, y: 477.0347 };
		stations["Harringay Green Lanes"] = { x: 1777.125, y: 362.2554 };
		stations["Leytonstone High Road"] = { x: 2149.6152, y: 584.3921 };
		stations["Leyton Midland Road"] = { x: 2036.1348, y: 584.3921 };
		stations["Northwick Park"] = { x: 691.3706, y: 392.7593 };
		stations["Preston Road"] = { x: 772.5488, y: 402.7593 };
		stations["Royal Victoria"] = { x: 2212.375, y: 971.2974 };
		stations["Wembley Park"] = { x: 796.0166, y: 492.3188 };
		stations["Rayners Lane"] = { x: 371.3237, y: 414.7515 };
		stations["Watford High Street"] = { x: 656.0542, y: 160.4019 };
		stations["Ruislip Gardens"] = { x: 266.1401, y: 419.728 };
		stations["South Ruislip"] = { x: 235.0088, y: 482.0806 };
		stations["Greenford"] = { x: 274.6743, y: 663.9878 };
		stations["Northolt"] = { x: 263.0361, y: 552.1714 };
		stations["South Harrow"] = { x: 376.6934, y: 466.6831 };
		stations["Sudbury Hill"] = { x: 385.4927, y: 521.2056 };
		stations["Sudbury Town"] = { x: 371.2832, y: 575.7378 };
		stations["Alperton"] = { x: 406.4478, y: 630.2632 };
		stations["Pimlico"] = { x: 1093.0737, y: 1225.6343 };
		stations["Park Royal"] = { x: 398.0054, y: 814.3159 };
		stations["North Ealing"] = { x: 384.5913, y: 859.5952 };
		stations["Acton Central"] = { x: 515.064, y: 975.5601 };
		stations["South Acton"] = { x: 524.4834, y: 1020.7847 };
		stations["Ealing Broadway"] = { x: 313.6519, y: 904.103 };
		stations["Watford Junction"] = { x: 648.8213, y: 127.4448 };
		stations["West Ruislip"] = { x: 239.1929, y: 283.9585 };
		stations["Bushey"] = { x: 712.4722, y: 193.3589 };
		stations["Carpenders Park"] = { x: 656.2129, y: 226.3228 };
		stations["Hatch End"] = { x: 695.4165, y: 259.2788 };
		stations["North Wembley"] = { x: 653.6592, y: 470.312 };
		stations["West Brompton"] = { x: 753.1689, y: 1173.8452 };
		stations["Ealing Common"] = { x: 360.0073, y: 995.7065 };
		stations["South Kenton"] = { x: 667.2158, y: 442.5347 };
		stations["Kenton"] = { x: 780.0566, y: 366.1753 };
		stations["Wembley Central"] = { x: 645.8408, y: 498.0952 };
		stations["Kensal Green"] = { x: 790.0239, y: 618.4448 };
		stations["Queen's Park"] = { x: 788.7378, y: 646.231 };
		stations["Gunnersbury"] = { x: 564.814, y: 1200.5776 };
		stations["Kew Gardens"] = { x: 564.8823, y: 1247.1675 };
		stations["Richmond"] = { x: 565.0415, y: 1287.2769 };
		stations["Stockwell"] = { x: 1287.519, y: 1444.0483 };
		stations["Bow Church"] = { x: 1906.4785, y: 857.5288 };
		stations["Stonebridge Park"] = { x: 647.9375, y: 525.8804 };
		stations["Harlesden"] = { x: 689.2012, y: 553.6646 };
		stations["Camden Town"] = { x: 1272.0806, y: 611.1694 };
		stations["Willesden Junction"] = { x: 656.5298, y: 581.4468 };
		stations["Headstone Lane"] = { x: 659.5938, y: 292.2456 };
		stations["Parsons Green"] = { x: 782.8408, y: 1273.5679 };
		stations["Putney Bridge"] = { x: 785.9897, y: 1306.5288 };
		stations["East Putney"] = { x: 798.1631, y: 1352.6069 };
		stations["Southfields"] = { x: 800.6025, y: 1385.5679 };
		stations["Wimbledon Park"] = { x: 769.9717, y: 1418.5269 };
		stations["Wimbledon"] = { x: 797.3892, y: 1451.4976 };
		stations["Island Gardens"] = { x: 1888.0508, y: 1274.3979 };
		stations["Greenwich"] = { x: 2006.3203, y: 1366.5874 };
		stations["Deptford Bridge"] = { x: 2006.3203, y: 1398.5269 };
		stations["South Quay"] = { x: 1906.4199, y: 1175.5269 };
		stations["Crossharbour"] = { x: 1896.1191, y: 1208.4761 };
		stations["Mudchute"] = { x: 1916.3203, y: 1241.437 };
		stations["Heron Quays"] = { x: 1898.9102, y: 1142.5659 };
		stations["West India Quay"] = { x: 2006.4805, y: 1051.1265 };
		stations["Elverson Road"] = { x: 2006.3203, y: 1430.4565 };
		stations["Oakwood"] = { x: 1751.2188, y: 205.2515 };
		stations["Cockfosters"] = { x: 1749.9004, y: 172.2935 };
		stations["Southgate"] = { x: 1665.5898, y: 238.2144 };
		stations["Arnos Grove"] = { x: 1652.4785, y: 271.1714 };
		stations["Bounds Green"] = { x: 1652.5586, y: 304.1265 };
		stations["Theydon Bois"] = { x: 2046.0586, y: 146.9888 };
		stations["Epping"] = { x: 2084.668, y: 119.1733 };
		stations["Debden"] = { x: 2080.3086, y: 174.8042 };
		stations["Loughton"] = { x: 2069.5195, y: 202.6138 };
		stations["Buckhurst Hill"] = { x: 2042.4395, y: 240.7241 };
		stations["Walthamstow Queen's Road"] = { x: 1965.6602, y: 509.5054 };
		stations["Woodgrange Park"] = { x: 2153.1504, y: 675.1167 };
		stations["Leytonstone"] = { x: 2050.9316, y: 548.8267 };
		stations["Leyton"] = { x: 2085.6211, y: 630.5366 };
		stations["Wood Green"] = { x: 1651.4512, y: 337.0913 };
		stations["Turnpike Lane"] = { x: 1642.6699, y: 370.0483 };
		stations["Manor House"] = { x: 1647.3594, y: 418.6685 };
		stations["Stanmore"] = { x: 876.4678, y: 305.6138 };
		stations["Canons Park"] = { x: 873.9639, y: 338.5728 };
		stations["Queensbury"] = { x: 873.9639, y: 371.5327 };
		stations["Kingsbury"] = { x: 873.9639, y: 404.4878 };
		stations["High Barnet"] = { x: 1459.811, y: 165.3237 };
		stations["Totteridge & Whetstone"] = { x: 1487.6206, y: 198.2866 };
		stations["Woodside Park"] = { x: 1459.3911, y: 231.2437 };
		stations["West Finchley"] = { x: 1459.3701, y: 264.2007 };
		stations["Finchley Central"] = { x: 1459.3701, y: 314.1177 };
		stations["Woodford"] = { x: 2062.7715, y: 360.4351 };
		stations["South Woodford"] = { x: 2026.8594, y: 392.519 };
		stations["Snaresbrook"] = { x: 2052.9102, y: 425.48 };
		stations["Hainault"] = { x: 2227.3398, y: 346.2017 };
		stations["Fairlop"] = { x: 2240.4609, y: 379.1646 };
		stations["Barkingside"] = { x: 2212.1992, y: 412.1226 };
		stations["Newbury Park"] = { x: 2196.6895, y: 445.0835 };
		stations["East Finchley"] = { x: 1457.6196, y: 347.0806 };
		stations["Highgate"] = { x: 1457.6196, y: 380.0386 };
		stations["Archway"] = { x: 1447.6196, y: 419.5015 };
		stations["Devons Road"] = { x: 2006.3691, y: 885.9429 };
		stations["Langdon Park"] = { x: 2006.3691, y: 918.9019 };
		stations["All Saints"] = { x: 2006.3691, y: 951.8628 };
		stations["Tufnell Park"] = { x: 1457.6196, y: 458.9702 };
		stations["Kentish Town"] = { x: 1459.5898, y: 497.1685 };
		stations["Neasden"] = { x: 906.0229, y: 465.0327 };
		stations["Dollis Hill"] = { x: 934.6426, y: 493.644 };
		stations["Willesden Green"] = { x: 983.2671, y: 522.2642 };
		stations["South Tottenham"] = { x: 1894.8691, y: 395.1685 };
		stations["Swiss Cottage"] = { x: 884.8198, y: 436.8257 };
		stations["Imperial Wharf"] = { x: 946.6265, y: 1246.5972 };
		stations["Brixton"] = { x: 1334.1997, y: 1507.0483 };
		stations["Kilburn"] = { x: 995.8633, y: 550.8853 };
		stations["West Hampstead"] = { x: 1023.9546, y: 579.4995 };
		stations["Blackhorse Road"] = { x: 1939.2441, y: 421.8726 };
		stations["Acton Town"] = { x: 489.7124, y: 1069.9565 };
		stations["Canning Town"] = { x: 2133.5137, y: 975.7046 };
		stations["Finchley Road"] = { x: 1052.564, y: 607.6616 };
		stations["Highbury & Islington"] = { x: 1684.7031, y: 594.5562 };
		stations["Canary Wharf"] = { x: 1896.6738, y: 1099.0972 };
		stations["Stratford"] = { x: 2034.9629, y: 675.9019 };
		stations["Finsbury Park"] = { x: 1734.3223, y: 495.9556 };
		stations["Elephant & Castle"] = { x: 1402.6128, y: 1360.1479 };
		stations["Stepney Green"] = { x: 1879.832, y: 891.3706 };
		stations["Barking"] = { x: 2278.3125, y: 731.9741 };
		stations["East Ham"] = { x: 2248.9727, y: 762.0503 };
		stations["Upton Park"] = { x: 2141.1035, y: 753.6792 };
		stations["Plaistow"] = { x: 2202.1621, y: 809.4253 };
		stations["Poplar"] = { x: 2001.5938, y: 1007.3198 };
		stations["West Ham"] = { x: 2144.0742, y: 844.1226 };
		stations["Upper Holloway"] = { x: 1580.0645, y: 473.2856 };
		stations["Pudding Mill Lane"] = { x: 2069.4531, y: 751.3784 };
		stations["Kennington"] = { x: 1325.7524, y: 1411.2085 };
		stations["Borough"] = { x: 1461.9922, y: 1274.9585 };
		stations["Elm Park"] = { x: 2434.8926, y: 579.7964 };
		stations["Dagenham East"] = { x: 2324.1211, y: 571.2642 };
		stations["Dagenham Heathway"] = { x: 2381.5625, y: 633.1245 };
		stations["Becontree"] = { x: 2341.5117, y: 668.4644 };
		stations["Upney"] = { x: 2312.332, y: 702.3628 };
		stations["Heathrow Terminal 5"] = { x: 148.6274, y: 1412.9702 };
		stations["Finchley Road & Frognal"] = { x: 1127.7417, y: 522.8823 };
		stations["Crouch Hill"] = { x: 1538.7129, y: 396.8179 };
		stations["Northfields"] = { x: 338.6743, y: 1113.0405 };
		stations["Boston Manor"] = { x: 294.937, y: 1141.6206 };
		stations["South Ealing"] = { x: 360.5566, y: 1084.4702 };
		stations["Osterley"] = { x: 298.7939, y: 1170.1909 };
		stations["Hounslow Central"] = { x: 307.7993, y: 1251.7104 };
		stations["Hounslow East"] = { x: 339.229, y: 1223.1714 };
		stations["Clapham North"] = { x: 1150.272, y: 1457.3101 };
		stations["Oval"] = { x: 1264.3823, y: 1408.8413 };
		stations["Clapham Common"] = { x: 1100.4219, y: 1487.4312 };
		stations["Clapham South"] = { x: 1090.3613, y: 1517.5405 };
		stations["Balham"] = { x: 1105.4712, y: 1547.6616 };
		stations["Tooting Bec"] = { x: 1051.8105, y: 1577.771 };
		stations["Tooting Broadway"] = { x: 984.4414, y: 1607.8804 };
		stations["Colliers Wood"] = { x: 976.9155, y: 1637.9897 };
		stations["South Wimbledon"] = { x: 942.9585, y: 1668.1108 };
		stations["Arsenal"] = { x: 1603.8711, y: 504.2095 };
		stations["Holloway Road"] = { x: 1529.041, y: 534.3267 };
		stations["Caledonian Road"] = { x: 1493.7808, y: 564.439 };
		stations["Morden"] = { x: 952.478, y: 1698.2104 };
		stations["West Croydon"] = { x: 1750.9004, y: 1706.8198 };
		stations["Hounslow West"] = { x: 206.1875, y: 1235.8101 };
		stations["Hatton Cross"] = { x: 162.3843, y: 1278.6108 };
		stations["Heathrow Terminals 1, 2, 3"] = { x: 109.5649, y: 1315.1401 };
		stations["Clapham Junction"] = { x: 1059.582, y: 1419.2808 };
		stations["West Harrow"] = { x: 540.7104, y: 438.9976 };
		stations["Brondesbury"] = { x: 905.7534, y: 609.3413 };
		stations["Caledonian Road & Barnsbury"] = { x: 1589.9336, y: 647.9351 };
		stations["Tottenham Hale"] = { x: 1843.582, y: 467.9146 };
		stations["Walthamstow Central"] = { x: 1981.4219, y: 467.9146 };
		stations["Hackney Wick"] = { x: 1982.0508, y: 712.6685 };
		stations["Homerton"] = { x: 1900.041, y: 712.6685 };
		stations["West Acton"] = { x: 511.376, y: 927.5483 };
		stations["Limehouse"] = { x: 1880.0195, y: 1010.6206 };
		stations["East India"] = { x: 2085.0898, y: 1011.271 };
		stations["Crystal Palace"] = { x: 1579.25, y: 1671.3726 };
		stations["Chiswick Park"] = { x: 487.4385, y: 1119.2222 };
		stations["Roding Valley"] = { x: 2155.5508, y: 275.7749 };
		stations["Grange Hill"] = { x: 2231.9902, y: 277.8813 };
		stations["Chigwell"] = { x: 2189.2207, y: 323.6401 };
		stations["Redbridge"] = { x: 2187.0801, y: 474.3931 };
		stations["Gants Hill"] = { x: 2238.7793, y: 507.2983 };
		stations["Wanstead"] = { x: 2147.8906, y: 507.2983 };
		stations["North Greenwich"] = { x: 2083.8887, y: 1114.8628 };
		stations["Ickenham"] = { x: 246.3052, y: 353.0347 };
		stations["Turnham Green"] = { x: 563.1265, y: 1119.4038 };
		stations["Uxbridge"] = { x: 121.7422, y: 351.9683 };
		stations["Hillingdon"] = { x: 187.9614, y: 313.814 };
		stations["Ruislip"] = { x: 341.0063, y: 312.5845 };
		stations["Gospel Oak"] = { x: 1343.7539, y: 455.6245 };
		stations["Mile End"] = { x: 1926.7949, y: 787.1558 };
		stations["Bow Road"] = { x: 2026.4863, y: 812.7515 };
		stations["Bromley-by-Bow"] = { x: 2070.6953, y: 848.8599 };
		stations["Upminster"] = { x: 2432.8242, y: 473.8101 };
		stations["Upminster Bridge"] = { x: 2364.5547, y: 503.9224 };
		stations["Hornchurch"] = { x: 2368.6152, y: 534.0347 };
		stations["Norwood Junction"] = { x: 1750.5039, y: 1674.0249 };
		stations["Sydenham"] = { x: 1661.4141, y: 1569.3452 };
		stations["Forest Hill"] = { x: 1662.0645, y: 1536.5444 };
		stations["Anerley"] = { x: 1752.0352, y: 1641.2144 };
		stations["Penge West"] = { x: 1748.9062, y: 1608.4038 };
		stations["Honor Oak Park"] = { x: 1631.0449, y: 1503.7437 };
		stations["Brockely"] = { x: 1674.3262, y: 1430.3647 };
		stations["Harrow & Wealdstone"] = { x: 675.8022, y: 333.3228 };
		stations["Cutty Sark for Maritime Greenwich"] = { x: 2026.2637, y: 1335.6655 };
		stations["Ruislip Manor"] = { x: 400.0464, y: 327.7349 };
		stations["Eastcote"] = { x: 442.6572, y: 363.8276 };
		stations["Wapping"] = { x: 1851.2539, y: 1043.0249 };
		stations["Shadwell"] = { x: 1849.4434, y: 963.98 };
		stations["New Cross"] = { x: 1854.4238, y: 1362.4956 };
		stations["Canada Water"] = { x: 1786.1836, y: 1125.855 };
		stations["Surrey Quays"] = { x: 1748.8125, y: 1195.3452 };
		stations["Whitechapel"] = { x: 1850.2324, y: 924.064 };
		stations["Lewisham"] = { x: 2006.3242, y: 1461.8843 };
		stations["Kilburn Park"] = { x: 690.1104, y: 692.1724 };
		stations["Regent's Park"] = { x: 1178.4048, y: 815.0806 };
		stations["Kilburn High Road"] = { x: 875.3823, y: 656.2827 };
		stations["Edgware Road"] = { x: 949.6655, y: 704.1421 };
		stations["South Hampstead"] = { x: 963.9385, y: 656.2827 };
		stations["Goodge Street"] = { x: 1256.3745, y: 860.6538 };
		stations["Shepherd's Bush Market"] = { x: 650.2266, y: 986.1851 };
		stations["Goldhawk Road"] = { x: 654.7407, y: 1032.564 };
		stations["Hammersmith"] = { x: 664.9448, y: 1070.6655 };
		stations["Bayswater"] = { x: 942.4321, y: 835.2202 };
		stations["Warren Street"] = { x: 1225.9844, y: 783.2974 };
		stations["Aldgate"] = { x: 1688.1445, y: 944.3999 };
		stations["Euston"] = { x: 1272.7637, y: 723.3599 };
		stations["Farringdon"] = { x: 1440.563, y: 806.8198 };
		stations["Barbican"] = { x: 1487.6138, y: 844.2349 };
		stations["Russell Square"] = { x: 1350.1533, y: 829.396 };
		stations["Kensington (Olympia)"] = { x: 781.6841, y: 1008.1948 };
		stations["Mornington Crescent"] = { x: 1285.8237, y: 659.3452 };
		stations["High Street Kensington"] = { x: 942.0439, y: 963.7896 };
		stations["Old Street"] = { x: 1601.6152, y: 777.5737 };
		stations["St. John's Wood"] = { x: 1107.8843, y: 656.855 };
		stations["Green Park"] = { x: 1164.9937, y: 967.7651 };
		stations["Baker Street"] = { x: 1144.4443, y: 736.3452 };
		stations["Notting Hill Gate"] = { x: 928.293, y: 883.9458 };
		stations["Victoria"] = { x: 1092.4854, y: 1084.4663 };
		stations["Aldgate East"] = { x: 1758.6113, y: 901.8062 };
		stations["Blackfriars"] = { x: 1419.1143, y: 1056.4956 };
		stations["Mansion House"] = { x: 1415.5142, y: 1030.3452 };
		stations["Cannon Street"] = { x: 1448.7437, y: 1004.187 };
		stations["Oxford Circus"] = { x: 1144.5732, y: 883.9604 };
		stations["Bond Street"] = { x: 1069.5327, y: 883.8521 };
		stations["Tower Hill"] = { x: 1670.1426, y: 1025.0171 };
		stations["Westminster"] = { x: 1192.2622, y: 1118.5874 };
		stations["Tottenham Court Road"] = { x: 1248.1416, y: 926.3384 };
		stations["Piccadilly Circus"] = { x: 1205.0015, y: 999.6538 };
		stations["Charing Cross"] = { x: 1263.7915, y: 1045.7769 };
		stations["Holborn"] = { x: 1395.2007, y: 916.3384 };
		stations["Tower Gateway"] = { x: 1755.4414, y: 1037.7866 };
		stations["Monument"] = { x: 1594.9004, y: 1016.647 };
		stations["Moorgate"] = { x: 1595.4512, y: 867.396 };
		stations["Leicester Square"] = { x: 1345.042, y: 975.1226 };
		stations["London Bridge"] = { x: 1587.3027, y: 1138.4468 };
		stations["St. Paul's"] = { x: 1500.2715, y: 907.8823 };
		stations["Hyde Park Corner"] = { x: 989.2388, y: 1000.3374 };
		stations["Knightsbridge"] = { x: 984.6001, y: 1026.8179 };
		stations["Stamford Brook"] = { x: 622.8711, y: 1119.2085 };
		stations["Ravenscourt Park"] = { x: 683.3662, y: 1119.2085 };
		stations["West Kensington"] = { x: 823.3809, y: 1119.2085 };
		stations["North Acton"] = { x: 610.9263, y: 927.5464 };
		stations["Holland Park"] = { x: 852.1147, y: 917.5464 };
		stations["Marylebone"] = { x: 1011.0435, y: 714.5503 };
		stations["Angel"] = { x: 1503.7129, y: 753.1284 };
		stations["Queensway"] = { x: 954.1445, y: 917.062 };
		stations["South Kensington"] = { x: 982.71, y: 1121.3687 };
		stations["Earl's Court"] = { x: 893.5273, y: 1121.3687 };
		stations["Sloane Square"] = { x: 1060.3921, y: 1119.2476 };
		stations["Covent Garden"] = { x: 1370.1011, y: 945.7612 };
		stations["Liverpool Street"] = { x: 1665.5508, y: 816.6724 };
		stations["Great Portland Street"] = { x: 1211.1016, y: 728.4517 };
		stations["Bank"] = { x: 1552.5215, y: 928.5767 };
		stations["East Acton"] = { x: 668.5234, y: 871.3335 };
		stations["Chancery Lane"] = { x: 1427.1406, y: 876.7554 };
		stations["Lancaster Gate"] = { x: 1007.6011, y: 881.8813 };
		stations["Warwick Avenue"] = { x: 699.9922, y: 730.1206 };
		stations["Maida Vale"] = { x: 716.6992, y: 711.3062 };
		stations["Paddington"] = { x: 853.8096, y: 714.7612 };
		stations["Baron's Court"] = { x: 789.8198, y: 1056.9448 };
		stations["Gloucester Road"] = { x: 937.4785, y: 1056.7358 };
		stations["St. James's Park"] = { x: 1156.6636, y: 1067.3745 };
		stations["Temple"] = { x: 1381.4531, y: 1080.6851 };
		stations["Latimer Road"] = { x: 780.8276, y: 847.687 };
		stations["Ladbroke Grove"] = { x: 803.417, y: 825.0913 };
		stations["Royal Oak"] = { x: 765.9268, y: 755.6851 };
		stations["Westbourne Park"] = { x: 697.8228, y: 780.3599 };
		stations["Bermondsey"] = { x: 1681.9141, y: 1131.605 };
		stations["Rotherhithe"] = { x: 1756.2051, y: 1090.3745 };
		stations["Shoreditch High Street"] = { x: 1761.4844, y: 822.4253 };
		stations["Dalston Junction"] = { x: 1722.6758, y: 659.7378 };
		stations["Haggerston"] = { x: 1757.4453, y: 709.1558 };
		stations["Hoxton"] = { x: 1781.666, y: 758.5698 };
		stations["Wood Lane"] = { x: 685.4492, y: 940.5767 };
		stations["Shepherd's Bush"] = { x: 791.8657, y: 879.4976 };
		stations["White City"] = { x: 715.8872, y: 869.7573 };
		stations["King's Cross St. Pancras"] = { x: 1398.7744, y: 682.6167 };
		stations["Euston Square"] = { x: 1349.8145, y: 780.5767 };
		stations["Edgware Road"] = { x: 982.7212, y: 789.978 };
		stations["Waterloo"] = { x: 1233.7144, y: 1167.7651 };
		stations["Southwark"] = { x: 1371.5142, y: 1222.0054 };
		stations["Embankment"] = { x: 1356.7544, y: 1120.8647 };
		stations["Marble Arch"] = { x: 1073.6084, y: 916.062 };
		
		var Stations = svg.append("g")
	      .attr("id", "Stations")
		  .attr("transform","translate(-60,-84)");
		
		_.each(stations,function(v,k){ 
			
			Stations.append("rect")
				.attr('class','label')
				.attr('id',k.replace("'","").split(' ')[0] + v.x.toString().split('.')[0])
				.attr("x", v.x - 5)
				.attr("y", v.y - 14)
				.attr('width',function(){
					if(k.length < 12){
						return k.length * 8;
					}else if(k.length < 16){
						return k.length * 7; 
					}else{
						return k.length * 6;
					}
				
				}) 
				.attr('height',20)

			
			Stations.append("text")
				.attr("x", v.x)
				.attr("y", v.y) 
				.text(k)
				.on("click", function(d,i){
					//Highlight Station
					$('.label').css({'fill':'rgba(0,0,0,0.1)'}); 
					$('#'+k.replace("'","").split(' ')[0] + v.x.toString().split('.')[0]).css({'fill':'rgba(0,0,0,1)'});
					$('#map').css({
						top : -v.x  + 86 + 140,
						left : -v.y + 72 + 160
					});
				});
				
		});
			      

	}

	return Tube;

});

define([
  'jquery',
  'underscore',
  'backbone',
  'd3js/tube',
  'data/stationsData',	
  'models/Station',
  'views/BaseView',
  'views/TubeView' 
], function($, _, Backbone, Tube, stationsData, Station, BaseView, TubeView){
	
    var MapView = BaseView.extend({
	
		el : $('#canvas'),
		
		initialize : function(){
			this.tube = new Tube();
			this.state = new Backbone.Model({});
			this.model = new Station();
		},
		
		render : function(){

			this.tubeView = new TubeView({
				el : this.$el.find('#map-viewport'),
				model : this.model,
				state : this.state
			});
			
			this.tubeView.render();          
			
			this.$el.css({
				width:'2500px',
				height:'1655px'
			});
			
			this.$el.find('#map-viewport').css({
				height:'1655px'
			});

			this.$el.find('#table').remove();

		}
		  
	});
	
	return MapView

});




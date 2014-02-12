define([
  'jquery',
  'underscore',
  'backbone',
  'custom/tube',
  'custom/stationsData',	
  'models/Station',
  'views/BaseView',
  'views/TubeView' 
], function($, _, Backbone, Tube, stationsData, Station, BaseView, TubeView){
	
    var DesktopView = BaseView.extend({
	
		el : $('#canvas'),
		
		initialize : function(){
			this.tube = new Tube();
			this.state = new Backbone.Model({});
			this.model = new Station({id:'OXC'});
		},
		
		render : function(){

			this.tubeView = new TubeView({
				el : $(this.el).find('#map-viewport'),
				model : this.model,
				state : this.state
			});
			
			this.tubeView.render();          
			
			$(this.el).css({
				width:$(window).width(),
				height:$(window).height()
			});
			
			$(this.el).find('#map-viewport').css({
				height:'1655px'
			});

		},
		
		                    
		controllerNewSelect : function(state){
			this.controllerModelFetchInterval(state)
		}
		  
	});
	
	return DesktopView

});




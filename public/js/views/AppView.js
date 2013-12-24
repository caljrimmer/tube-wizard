define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'custom/tube',	
  'models/Station'
], function($, _, Backbone, registry, Tube, Station){
	
    var AppView = Backbone.View.extend({
	
		el : $('canvas'),
		
		initialize : function(){
			this.model = new Station();
			this.tube = new Tube();
		},
		
		render : function(types){
			this.model.fetch({
				success : function(model){
					console.log(model)
				}
			});
			
			this.tube.lines($('#map'));
		}
		  
	});
	
	return AppView

});




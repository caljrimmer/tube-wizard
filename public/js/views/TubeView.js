define([
  'jquery',
  'underscore',
  'backbone',
  'd3',
  'draggable',
  'custom/tube'
], function($, _, Backbone, d3, Draggable, Tube){
	
    var TubeView = Backbone.View.extend({
		
		initialize : function(options){
			this.tube = new Tube();
			this.state = options.state;
			this.renderMapShift(this.state);
			this.model.bind('sync',this.controllerTrains,this)
			this.state.bind('change',this.renderMapShift,this);
		},
		
		render : function(types){
			this.tube.map($(this.el).find('#map')); 
			d3.selectAll('.labelOn').attr('class','label');
			d3.selectAll('#'+this.state.get('code')).attr('class','labelOn');
			this.draggable = new Draggable(this.$el.find('#map')[0]); 
		},
		
		renderMapShift : function(model){
			var state  = model.toJSON();
			if(_.has(state,'position')){ 
				$(this.el).find('#map').animate({
					left: - state.position.x + ($(this.el).width()/2),
					top: - state.position.y + ($(this.el).height()/2) - 100
				},500);
				d3.selectAll('.labelOn').attr('class','label');
				d3.selectAll('#'+this.state.get('code')).attr('class','labelOn');  
			}
		},
		
		controllerTrains : function(model){
			this.tube.trains(model.toJSON());
		}
		  
	});
	
	return TubeView;

});




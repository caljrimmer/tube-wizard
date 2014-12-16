define([
  'jquery',
  'underscore',
  'backbone',
  'd3',
  'draggable',
  'd3js/tube'
], function($, _, Backbone, d3, Draggable, Tube){
	
    var TubeView = Backbone.View.extend({
		
		initialize : function(options){
			this.tube = new Tube();
			this.tickrate = {};
			this.state = options.state;
			this.model.bind('sync',this.controllerTrains,this)
			this.state.bind('change',this.renderMapShift,this);
		},
		
		render : function(types){
			this.tube.map($(this.el).find('#map')); 
			this.renderStationsOn();
			this.draggable = new Draggable(this.$el.find('#map')[0]);
			this.renderMapShift(this.state); 
		}, 
		
		renderStationsOn : function(){
			this.$el.find('.labelOn').attr('class','label');
			this.$el.find('#'+this.state.get('code')).attr('class','labelOn');
		},
		
		renderMapShift : function(model){
			var state  = model.toJSON();
			if(_.has(state,'position')){ 
				$(this.el).find('#map').animate({
					left: (this.$el.width()/2) - state.position.x,
					top: ($(window).height()/2) - state.position.y
				},500);
				this.renderStationsOn();  
			}
		},
		
		controllerCleanModel : function(){
			this.currentModel = {};
			clearInterval(this.tickrate);
		},
		 
		//We are waiting 30 secs per TFL return data.
		//Thus we augment the data to tick through with a move fluid motion.
		controllerLessSecondsTo : function(model,delay){
			_.each(model.trains,function(v,k){ 
				var num = parseInt(v.SecondsTo,10);
				if(!_.has(v,'OrgSecondsTo')){
					model.trains[k].OrgSecondsTo = v.SecondsTo;
				}
				if(num >= delay){   
					model.trains[k].SecondsTo = (num - delay).toFixed(0);
				}else{
					model.trains[k].SecondsTo = '0';
				}
			});
			return model;
		},
		
		controllerTrains : function(model){      
			var that = this,
				delay = 1; 

			this.controllerCleanModel();
			this.currentModel = that.controllerLessSecondsTo(model.toJSON(),delay);
			this.tube.trains(that.currentModel);
			this.tickrate = setInterval(function(){
				that.currentModel = that.controllerLessSecondsTo(that.currentModel,delay);
				that.tube.trains(that.currentModel);
			},(delay*1000))
		}
		  
	});
	
	return TubeView;

});




define([
  'jquery',
  'underscore',
  'backbone',
  'countdown',
  'text!templates/table/table-row.html',
  'custom/charts'
], function($, _, Backbone, Countdown, TableRowTemplate, Charts){
	
    var TableRowView = Backbone.View.extend({
	
		tagName : 'li',
		
		template : _.template(TableRowTemplate),
		
		initialize : function(options){
			this.charts = new Charts();
			this.state = options.state; 
		},
		
		render : function(){
                
			var template = $(this.template(this.model)),
				type = this.state.get('line'),
				that = this;
			
			$(this.el).html(template);
			   
			this.charts.radial($(that.el).find('.radial'),{
				height : 30,
				width : 30,
				time : this.model.SecondsTo,
				type : type,
				index : this.model.index
			});
			
			this.charts.progessBar($(that.el).find('.progress'),{
				width:360,
				height:3,
				type : type
			});
			
			if(this.model.SecondsTo < 61){                
				this.submitCountdown = new Countdown(this.model.SecondsTo, function(seconds) {
					if(seconds % 10 === 0 && seconds > 20) $(template[4]).text(seconds);
					if(seconds <= 20) $(template[4]).text(seconds);
					that.charts.increment({
						time : seconds
					});
				}, function() {
					$(template[4]).text('-');
				});  
			}
			
			return this;
		}
		  
	});
	
	return TableRowView;

});




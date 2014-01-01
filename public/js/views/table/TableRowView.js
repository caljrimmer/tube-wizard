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
		
		className : 'clearfix',
		
		template : _.template(TableRowTemplate),
		
		initialize : function(){
			this.charts = new Charts(); 
		},
		
		render : function(){
                
			var template = $(this.template(this.model)),
				that = this;
			
			$(this.el).html(template);
			
			this.charts.radial($(that.el).find('.radial'),{
				height : 30,
				width : 30,
				time : this.model.SecondsTo,
				type : this.model.line,
				index : this.model.index
			});
			
			if(this.model.SecondsTo < 61){                
				this.submitCountdown = new Countdown(this.model.SecondsTo, function(seconds) {
					if(seconds % 10 === 0 && seconds > 10) $(template[4]).text(seconds);
					if(seconds < 10) $(template[4]).text(seconds); 
					that.charts.radialIncrement({
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




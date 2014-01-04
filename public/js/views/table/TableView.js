define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/table/table.html',
  'views/table/TableRowView'
], function($, _, Backbone, TableTemplate, TableRowView){
	
    var TableView = Backbone.View.extend({
		
		template : _.template(TableTemplate),
		
		initialize : function(options){
			this.state = options.state;
			this.state.bind('change',this.renderRows,this);
			this.model.bind('sync',this.renderRows,this);
		},
		
		render : function(types){
			$(this.el).html(this.template());
		},
		
		renderRows : function(){
			       
			var container = $(this.el),
				line = this.model.get('info').line,
				trains = this.model.toJSON().trains,
				count = 0;
				
			container.find('ul.tube-lines').empty();
			trains = _.groupBy(trains, 'Direction');
			
			_.each(trains,function(v,k){
				container.find('ul.tube-lines').append('<li class="header">'+k+'</li>');
				_.each(v,function(v2,k2){
					v2.line = line;
					v2.index = count + 1;
					var view = new TableRowView({
						model : v2
					});
					container.find('ul.tube-lines').append(view.render().el);
					++count;
				});
			});
		}
		  
	});
	
	return TableView;

});




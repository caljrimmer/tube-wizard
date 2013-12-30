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
			$(this.el).html(this.template(this.model.toJSON()));
		},
		
		renderRows : function(){       
			var container = $(this.el),
				line = this.model.get('info').line;
			container.find('ul ul li').not('.header').remove();
			_.each(this.model.toJSON(),function(v,k){
				var count = 0;
				if(!(k === 'info' || k === "id")){
					_.each(v,function(v2,k2){  
						var drilled = container.find('#'+k);
						v2.line = line;
						v2.index = count + 1;
						var view = new TableRowView({
							model : v2
						});
						drilled.find('ul').append(view.render().el);   
						drilled.show();                             
						drilled.find('.header').show(); 
						++count;
					});
				}
			});
		}
		  
	});
	
	return TableView;

});




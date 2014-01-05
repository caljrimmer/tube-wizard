define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/table/table.html',
  'views/table/TableRowView'
], function($, _, Backbone, TableTemplate, TableRowView){
	
    var TableView = Backbone.View.extend({
		
		template : _.template(TableTemplate),
		
		events : {
			'click [data-filter]' : 'eventDirection'
		},
		
		initialize : function(options){
			this.state = options.state;
			this.state.bind('change',this.render,this);
			this.model.bind('sync',this.render,this);
		},
		
		render : function(){
			$(this.el).html(this.template(this.model.toJSON()));
			this.renderRows();
		},
		
		renderRows : function(){   
			var container = $(this.el),
				info = this.model.get('info'),
				trains = this.model.toJSON().trains,
				count = 0;
			container.find('ul.tube-lines').empty();
			trains = _.groupBy(trains, 'Direction');
			_.each(trains,function(v,k){
				_.each(v,function(v2,k2){
					if(k2 < 4){
						v2.line = info.line;
						v2.index = count + 1;
						var view = new TableRowView({
							model : v2,
							className : v2.Direction + ' clearfix'
						});
						container.find('ul.tube-lines').append(view.render().el); 
					}
					++count; 
				});
			});
			this.afterRenderSelected();
		},
		
		afterRenderSelected : function(co){
			$(this.el).find('[data-filter]').removeClass('selected');
			$(this.el).find('.'+this.state.get('direction')).show();
			$(this.el).find('[data-filter="'+this.state.get('direction')+'"]').addClass('selected');
		},
		
		eventDirection : function(e){
			this.state.set({direction:$(e.target).attr('data-filter')},{silent:true});
			this.renderRows(); 
		}
		  
	});
	
	return TableView;

});




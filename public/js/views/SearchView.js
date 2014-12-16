define([
  'jquery',
  'underscore',
  'backbone',
  'data/stationsData',      
  'views/SearchItemView',
  'text!templates/search.html'
], function($, _, Backbone, stationsData, SearchItemView, SearchTemplate){
	
    var SearchView = Backbone.View.extend({
		
		template : _.template(SearchTemplate),
		
		events : {
			'focus #search-text' : 'eventFocus',
			'keyup #search-text' : 'eventSearch',
			'click #search-results li' : 'eventSearchSelect' 
		},
		
		initialize : function(options){
			this.state = options.state;
			this.state.bind('change',this.render,this);
			this.data = stationsData;
		},
		
		render : function(){
			$(this.el).html(this.template(this.state.toJSON()));
		},
		
		afterRenderResults : function(results){
			var container = $(this.el).find('#search-results'),
				that = this;
			container.empty();
			_.each(results,function(v,k){        				
				var view = new SearchItemView({
					state : that.state,
					model : new Backbone.Model(v),
				})
				container.append(view.render().el)
			});
		},
		
		controllerFindStation : function(needle){
			var results = [];
			_.each(stationsData,function(items,line){
				_.each(items,function(v,k){
					v.line = line.charAt(0);
					if(line === 'Circle') v.line = "Ci";
					if(v.code.toLowerCase().indexOf(needle) !== -1 || v.name.toLowerCase().indexOf(needle) !== -1){
						results.push(v);
					} 
				});
			});                  
			return results;
		},
		
		eventFocus : function(e){
			$(e.target).val('');
			$(this.el).find('.selected').hide();
			this.eventSearch(e);
		},
		
		eventSearch : function(e){
			this.afterRenderResults(this.controllerFindStation($(e.target).val().toLowerCase()))
		}
		  
	});
	
	return SearchView;

});




define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/search-result.html'
], function($, _, Backbone, SearchResultTemplate){
	
    var SearchView = Backbone.View.extend({ 
	
		tagName : 'li',
		
		template : _.template(SearchResultTemplate),
		
		events : {
			'click' : 'eventSearchSelect' 
		},
		
		initialize : function(options){
			this.state = options.state;
		},
		
		render : function(types){
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},
		
		eventSearchSelect : function(e){
			console.log(this.model.toJSON())
			this.state.set(this.model.toJSON());
		}
		  
	});
	
	return SearchView;

});




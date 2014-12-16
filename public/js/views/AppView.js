define([
  'jquery',
  'underscore',
  'backbone',
  'd3js/tube',
  'data/stationsData',	
  'models/Station',
  'views/BaseView',
  'views/table/TableView',
  'views/SearchView',
  'views/TubeView' 
], function($, _, Backbone, Tube, stationsData, Station, BaseView, TableView, SearchView, TubeView){
	
    var AppView = BaseView.extend({
	
		el : $('#canvas'),
		
		initialize : function(){ 
			var that = this;
			this.t = {};
			this.tube = new Tube();
			this.model = new Station();
			if(_.has(window.localStorage,'tw-state')){
				this.state = new Backbone.Model(JSON.parse(window.localStorage.getItem('tw-state')))
			}else{
				//Sets Oxford Street as default
				this.state = new Backbone.Model(stationsData.Bakerloo[14]);
				this.state.set({line:'V'});
			}
			this.state.bind('change',this.controllerNewSelect,this);
			this.controllerModelFetchInterval(this.state);
			
			$(window).bind('resize',_.debounce(function(){
				that.controllerModelFetchInterval(that.state);
				that.render();
			},500))
		},
		
		render : function(types){
			
			this.searchView = new SearchView({
				el : $(this.el).find('#search'),
				state : this.state
			});
			this.searchView.render();
			
			this.tableView = new TableView({
				el : $(this.el).find('#table'),
				model : this.model,
				state : this.state
			});
			
			this.tubeView = new TubeView({
				el : $(this.el).find('#map-viewport'),
				model : this.model,
				state : this.state
			});
			this.tubeView.render();
			this.afterRender();

		},
		
		controllerModelFetchInterval : function(state,interval){
			var that = this,
				line = state.get('line'),
				code = state.get('code');
			
			//If circle line then we need to send new code for backend
			if(line === "Ci"){
				line = "h";
			};      
            
			this.model.set('code',code);
			this.model.set('line',line);
			this.model.fetch();  
			clearInterval(this.t);	
			this.t = setInterval(function(){
				that.model.fetch();
			},30000);
		},
		
		afterRender : function(){
			this.$el.find('#map-viewport').css({
				height: $(window).height()
			});   
		},
		                    
		controllerNewSelect : function(state){
			this.controllerModelFetchInterval(state)
			this.controllerLocalStorge(state)
		},
		
		controllerLocalStorge : function(model){
			window.localStorage.setItem('tw-state',JSON.stringify(model.toJSON()));
		}
		  
	});
	
	return AppView

});




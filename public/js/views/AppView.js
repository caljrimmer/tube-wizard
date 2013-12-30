define([
  'jquery',
  'underscore',
  'backbone',
  'custom/tube',
  'custom/stationsData',	
  'models/Station',
  'views/table/TableView',
  'views/SearchView',
  'views/TubeView' 
], function($, _, Backbone, Tube, stationsData, Station, TableView, SearchView, TubeView){
	
    var AppView = Backbone.View.extend({
	
		el : $('#canvas'),
		
		initialize : function(){
			this.tube = new Tube();
			if(_.has(window.localStorage,'tw-state')){
				this.state = new Backbone.Model(JSON.parse(window.localStorage.getItem('tw-state')))
			}else{
				this.state = new Backbone.Model(stationsData.Bakerloo[14]);
			}
			this.state.bind('change',this.controllerNewSelect,this); 
			this.controllerModelFetchInterval(this.state)
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
			this.tableView.render();
			
			this.tubeView = new TubeView({
				el : $(this.el).find('#map-viewport'),
				model : this.model,
				state : this.state
			});
			this.tubeView.render();

		},
		
		controllerModelFetchInterval : function(state,interval){
			var that = this;
			if(!this.model){
				this.model = new Station({id:this.state.get('code')});
			}
			this.model.set({id:state.get('code')});
			this.model.fetch();
			var t = setInterval(function(){
				that.model.fetch();
			},60000)
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




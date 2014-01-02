define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'views/AppView',
  'views/MapView' 
], function($, _, Backbone, registry, AppView, MapView){

	var Router = Backbone.Router.extend({

		routes: {
			'map' : 'map',
			'': 'default',
			'*notFound': 'default'
		},
		
		default : function(){
			registry.zombieKiller();
			registry.views.appView = new AppView();
			registry.views.appView.render();
		},
		
		map : function(){
			registry.zombieKiller();
			registry.views.mapView = new MapView();
			registry.views.mapView.render();
		}

	});

	return Router;


});

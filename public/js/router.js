define([
  'jquery',
  'underscore',
  'backbone',
  'registry',
  'views/AppView',
  'views/MapView',
  'views/DesktopView'  
], function($, _, Backbone, registry, AppView, MapView,DesktopView){

	var Router = Backbone.Router.extend({

		routes: {
			'map' : 'map',
			'desktop' : 'desktop',
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
		},
		
		desktop : function(){
			registry.zombieKiller();
			registry.views.desktopView = new DesktopView();
			registry.views.desktopView.render();
		}

	});

	return Router;


});

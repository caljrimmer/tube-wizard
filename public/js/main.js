require.config({
    paths: {
        'jquery' : 'vendor/jquery-2.0.3.min',
        'underscore' : 'vendor/underscore',
        'backbone' : 'vendor/backbone-1.1.0.min',
		'text' : 'vendor/text',
		'd3' : 'vendor/d3',
		'countdown' : 'vendor/countdown',
		'charts' : 'custom/charts',
		'draggable' : 'vendor/draggable',
		'registry' : 'custom/registry'
    },
	shim: {
		d3: {
			exports: 'd3'
		},
		countdown : {
			exports : 'Countdown'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}  
	 } 
});
	
require([
  'app'
], function(app){
	window.app = app;
	Backbone.history.start();
}); 

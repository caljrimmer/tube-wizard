define([
  'jquery',
  'underscore',
  'backbone',
  'registry'
], function($, _, Backbone, registry){
		
	var Station = Backbone.Model.extend({
		urlRoot : 'http://localhost:4001/api/station/'
		
	});

	return Station; 
		
});
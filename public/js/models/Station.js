define([
  'jquery',
  'underscore',
  'backbone',
  'registry'
], function($, _, Backbone, registry){
		
	var Station = Backbone.Model.extend({
		urlRoot : 'http://www.pencyl.com/api/station/'
	});

	return Station; 
		
});
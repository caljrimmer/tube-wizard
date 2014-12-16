define([
  'jquery',
  'underscore',
  'backbone',
  'registry'
], function($, _, Backbone, registry){
		
	var Station = Backbone.Model.extend({
		urlRoot : 'api/station/',
		url : function(method, model, options) {
			return this.urlRoot + this.get('line') + '/' + this.get('code');
		}

	});

	return Station; 
		
});
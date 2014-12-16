define([
  'jquery',
  'underscore',
  'backbone',
  'registry'
], function($, _, Backbone, registry){

	var BaseView = function (options) {
	    Backbone.View.apply(this, [options]);
    };

	_.extend(BaseView.prototype, Backbone.View.prototype, {
		clean : function(view){
	        view.unbind();
			view.undelegateEvents();
			if(view.$el.find('.mask').length){
				view.$el.find('.mask').remove();	
			}else{
				view.$el.empty();
			}
		},
	    dispose: function () {
			this.unbindFromAll();
			this.clean(this)
			this.cleanSubViews();         
	    }
	});
	
	BaseView.extend = Backbone.View.extend;
	return BaseView    

});

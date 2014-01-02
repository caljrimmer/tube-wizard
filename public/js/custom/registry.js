define(['underscore','backbone'], function(_,Backbone) {
	
    var registry = {
		models : {},
		collections : {},
		views : {},
		zombieKiller : function(){
			$.each(this.views,function(k,v){
				v.dispose();
			});
			this.views = {};
		},
		events : _.extend({},Backbone.Events) 
	};

    return registry;

});

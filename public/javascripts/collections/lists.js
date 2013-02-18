var listExpress = listExpress || {};

var ListList = Backbone.Collection.extend({
	model: listExpress.List,
	url: '/api/lists/',
	
	completed: function(){
		return this.filter(function(item){
			return item.get('completed');
		});
	},
	
	remaining: function(){
		return this.without.apply(this, this.completed());
	},
});

listExpress.Lists = new ListList();
var listExpress = listExpress || {};

var ItemList = Backbone.Collection.extend({
	model: listExpress.Item,
	url: '/api/items',
	
	completed: function(){
		return this.filter(function(item){
			return item.get('completed');
		});
	},
	
	remaining: function(){
		return this.without.apply(this, this.completed());
	}
	
});

listExpress.Items = new ItemList();
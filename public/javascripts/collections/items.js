var listExpress = listExpress || {};

var ItemList = Backbone.Collection.extend({
	model: listExpress.Item,
	url: function(){
		return this.url;
	},
	
	initialize: function(models, options){
		console.log(options.url);
		//this.url = options.url || '/api/items';
		this.url = '/api/items';
	},
	
	completed: function(){
		return this.filter(function(item){
			return item.get('completed');
		});
	},
	
	remaining: function(){
		return this.without.apply(this, this.completed());
	},
	
	sortByCategory: function(){
		return this.sortBy(function(item){
			return item.get('category');
		});
	},
	
	groupByCategory: function(){
		return this.groupBy(function(item){
			return item.get('category');	
		});
	},
	
	filterByCategory: function(category){
		return this.filter(function(item){
			return item.get('category') === category;
		});
	},
	
});

listExpress.Items = new ItemList();
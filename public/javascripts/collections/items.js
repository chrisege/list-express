var listExpress = listExpress || {};

var ItemList = Backbone.Collection.extend({
	model: listExpress.Item,
	url: function(){
		if (this.id) {
			return "/api/lists/"+this.id+"/items";
		}
		
	},
	
	initialize: function(models, options){
		if (options) {
			this.id = options.id || "";			
		}
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

listExpress.itemList = new ItemList();
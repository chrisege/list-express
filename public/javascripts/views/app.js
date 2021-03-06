var listExpress = listExpress || {};

listExpress.AppView = Backbone.View.extend({
	el: "#listExpress",
	collection: listExpress.Items,
	initialize: function(){
		this.input = this.$('#newItemForm');
		this.categories = this.getCategories();
		window.listExpress.Items.on('reset', this.renderCategoryCollections, this);
		window.listExpress.Items.on('add', this.addOne, this);
		this.collection.fetch();
	},
	
	render: function(){
		var completed = this.collection.completed().length;
	},
	
	events: {
		'click #newItemSave': 'create',
	},
	
	getCategories: function(){
		return _.uniq(this.collection.pluck('category'));
	},
	
	getCategoryCollections: function(){
		var that = this;
		var categories = this.getCategories();
		var categoryCollections = [];
		_.each(categories, function(category){
			var categoryCollection = new ItemList(that.collection.filterByCategory(category));
			categoryCollection.name = category;
			categoryCollections.push(categoryCollection);
		});
		return categoryCollections;
	
	},
	
	renderCategoryCollections: function(collection){
		collection = this.getCategoryCollections();
		var that = this;
		this.$('#itemContainer').html('');
		_.each(collection, function(collection){
			that.renderCollection(collection);
		});
	},
	
	renderCollection: function(collection){
		var that = this;
		var tmpl = _.template($('#headingTemplate').html());
		    tmpl = tmpl({category: collection.name});
		this.$('#itemContainer').append(tmpl);
		_.each(collection.models, function(item){
			that.addOne(item);
		}, this);
	},
	
	
	renderItem: function(item){
		var itemView = new listExpress.ItemView({
			model:item
		});
		this.$('#itemContainer').append(itemView.render().el);
	},
	
	addOne: function(item){
		var itemView = new listExpress.ItemView({
			model:item
		});
		var el = $("#"+item.attributes.category);
		if (el.length > 0) {
			el.append(itemView.render().el);
		} else {
			this.renderCategoryCollections();
		}
	},
	
	renderAll: function(){
		var that = this;
		this.$('#itemContainer').html('');
		_.each(this.collection.models, function(item){
			that.renderItem(item);
		}, this);
	},
	
	newAttributes: function() {
      return {
        title: $(this.input).children('#newItemTitle').val().trim(),
	    category: this.input.children("#newItemCategory").val().trim(),
        completed: false
      };
    },
	
	create: function(){
		this.collection.create(this.newAttributes());
		this.input.children('input').val('');
		//this.collection.reset();
	},
	
});
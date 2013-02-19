var listExpress = listExpress || {};

listExpress.ListView = Backbone.View.extend({
	el: "#listExpress",
	tagName: 'div',
	initialize: function(models, options){
		this.id = options.id;
		console.log(options.id);

		this.collection = new ItemList([], {id: this.id});
		this.collection.on('reset', this.render, this);
		this.collection.on('reset', this.renderCategoryCollections, this);
		this.collection.on('add', this.addOne, this);
		this.collection.fetch();
		this.categoryCollections = [];
		this.input = $('#newItemForm');
		console.log(this.input);
		//console.log(this.collection);
	},
		
	render: function(){
		var completed = this.collection.completed().length;
		var tmpl = _.template($("#listDisplayTemplate").html());
		this.$el.append(tmpl(this.collection));
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
			//console.log(that.collection);
			var categoryCollection = new ItemList(that.collection.filterByCategory(category));
			
			//strip out spaces from category name here too
			categoryCollection.name = category;
			categoryCollections.push(categoryCollection);
			that.categoryCollections.push(categoryCollection);
		});
		return categoryCollections;
	
	},
	
	renderCategoryCollections: function(collection){
		catCollection = this.getCategoryCollections();
		var that = this;
		this.$('#itemContainer').html('');
		_.each(catCollection, function(collection){
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
		
		//todo: strip out spaces from item.attributes.category
		//so categories can have spaces

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
		console.log($('#newItemTitle').val());
      return {
        title: $('#newItemTitle').val().trim(),
	    category: $("#newItemCategory").val().trim(),
		listId: this.id,
        completed: false
      };
    },
	
	create: function(){
		console.log('create');
		this.collection.create(this.newAttributes());
		//this.input.children('input').val('');
		//this.collection.reset();
	},
	
	close: function(){
		this.$el.html('');
		this.undelegateEvents();
		this.collection.remove();
		this.collection.unbind();
		_.each(this.categoryCollections, function(collection){
			collection.remove();
			collection.unbind();
		});
		this.unbind();
	},
	
});
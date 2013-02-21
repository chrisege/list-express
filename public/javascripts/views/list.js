var listExpress = listExpress || {};

listExpress.ListView = Backbone.View.extend({
	el: "#listExpress",
	tagName: 'div',
	model: listExpress.List,
	initialize: function(models, options){
		if (options) {
			this.id = options.id;
		} 
		this.collection = new ItemList([], {id: this.id});
		
		this.listenTo(this.collection, 'reset', this.render);
		
		//this.collection.on('reset', this.render, this);
		//this.collection.on('reset', this.renderAllGrouped, this);
		this.collection.on('add', this.addOne, this);
		this.collection.fetch();
		this.input = $('#newItemForm');

	},
		
	testFunction: function(){
		console.log('testFunction');
	},
	
	render: function(){
		// console.log('render');
		var completed = this.collection.completed().length;
		var tmpl = _.template($("#listDisplayTemplate").html());
		this.$el.append(tmpl(this.collection));
		this.renderAllGrouped();
	},
	
	events: {
		'click #newItemSave': 'create',
	},
	
	renderCollection: function(collection, name){
		var that = this;
		var tmpl = _.template($('#headingTemplate').html());
			tmpl = tmpl({category: name});
		this.$('#itemContainer').append(tmpl);
		_.each(collection, function(item){
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
			this.renderAllGrouped();
		}
	},
	
	
	renderAll: function(){
		var that = this;
		this.$('#itemContainer').html('');
		_.each(this.collection.models, function(item){
			that.renderItem(item);
		}, this);
	},
	
	renderAllGrouped: function(){
		var that = this;
		this.$('#itemContainer').html('');
		_.each(this.collection.groupByCategory(), function(value, key){
			that.renderCollection(value, key);
		});
	},
	
	newAttributes: function() {
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
		// this.$el.html('');
		this.unbind();
		//this.collection.remove();
		this.remove();
		console.log('closed');
	},
	
});
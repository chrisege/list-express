var listExpress = listExpress || {};

listExpress.ListView = Backbone.View.extend({
	el: "#listExpress div",
	tagName: 'div',
	model: listExpress.List,
	initialize: function(models, options){
		if (options) {
			this.id = options.id;
		} 
		this.collection = listExpress.itemList;
		this.listenTo(this.collection, 'reset', this.render);
		this.listenTo(this.collection, 'add', this.addOne);
		this.input = $('#newItemForm');
		this.subviews = []
	},
	
	render: function(){
		var completed = this.collection.completed().length;
		this.renderAllGrouped();
	},
	
	events: {
		'click #newItemSave': 'create',
	},
	
	renderAllGrouped: function(){
		var that = this;
		$('#itemContainer').html('');
		_.each(this.collection.groupByCategory(), function(value, key){
			that.renderCollectionHeading(value, key);
			that.renderCollection(value, key);
		});
	},
	
	renderCollectionHeading: function(collection, name){
		var tmpl = _.template($('#headingTemplate').html());
			tmpl = tmpl({category: name});
		$('#itemContainer').append(tmpl);
	},
	
	renderCollection: function(collection, name){
		var that = this;
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
		this.subviews.push(itemView);
		
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
	
	newAttributes: function() {
      return {
        title: $('#newItemTitle').val().trim(),
	    category: $("#newItemCategory").val().trim(),
		listId: this.id,
        completed: false
      };
    },
	
	create: function(){
		this.collection.create(this.newAttributes());
	},
	
	close: function(){
		_.each(this.subviews, function(subview){
			subview.close();
		});
		this.unbind();
		this.undelegateEvents();
		this.remove();
	},
	
});
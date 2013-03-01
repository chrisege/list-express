var listExpress = listExpress || {};

// UserView shows all of a given user's lists.
// It should provide logic to select a list and render
// a ListView for that list.
// Since we don't have users yet, it just shows all lists.

listExpress.UserView = Backbone.View.extend({
	el: "#listingContainer",
	
	// change this to pull a given user's lists
	// once users are built.
	collection: listExpress.Lists,
	template: $("#listTitleTemplate").html(),
	events: {
		// 'click .listLink': 'renderSelectedList',
		'click #newListSave': 'create',
	},
	
	initialize: function(){
		this.collection.fetch();
		this.listenTo(this.collection, 'reset', this.renderAll);
		this.listenTo(this.collection, 'add', this.addOne);
		this.subViews = [];
	},
	
	renderAll: function(){
		var that = this;
		_.each(this.collection.models, function(listTitle){
			that.addOne(listTitle);
		});
	},
	
	addOne: function(item){
		item.parentView = this;
		var listTitleView = new listExpress.ListTitleView({
			model:item
		});
		this.$el.append(listTitleView.render().el);
	},
		
	
	renderSelectedList: function(id){
		if (this.listView) {
			this.listView.close();
		}		
		var tmpl = _.template($("#listDisplayTemplate").html());
		$("#listExpress").append(tmpl());
		listExpress.itemList.url = "/api/lists/"+id+"/items";
		listExpress.itemList.fetch()
		this.listView = new listExpress.ListView([], {id: id});
	},
	
	emptySubViews: function(){
		_.each(this.subViews, function(subView){
			subView.close();
		});
	},
	
	create: function(){
		this.collection.create(this.newAttributes());
	},
	
	newAttributes: function(){
		return {
	        title: $('#newListTitle').val().trim(),
	        completed: false
	      };
	},

});

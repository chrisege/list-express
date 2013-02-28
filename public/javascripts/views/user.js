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
	template: $("#listingTemplate").html(),
	events: {
		'click .listLink': 'renderSelectedList',
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
		this.$el.find('p').remove();
		this.tmpl = _.template(this.template);
		_.each(this.collection.models, function(item){
			that.$el.append(that.tmpl(item.toJSON()));
		});
	},
	
	addOne: function(item){
		this.tmpl = _.template(this.template);
		this.$el.append(this.tmpl(item.toJSON()));
	},
	
	getSelectedId: function(){
		this.selected = this.collection.at(1);
		return this.selected.id;
	},
	
	
	renderSelectedList: function(e){
		var selectedID = $(e.currentTarget.id);
		selectedID = selectedID.selector;
		if (this.listView) {
			this.listView.close();
		}		
		var tmpl = _.template($("#listDisplayTemplate").html());
		$("#listExpress").append(tmpl());
		listExpress.itemList.url = "/api/lists/"+selectedID+"/items";
		listExpress.itemList.fetch()
		this.listView = new listExpress.ListView([], {id: selectedID});
	},
	
	emptySubViews: function(){
		_.each(this.subViews, function(subView){
			subView.close();
		});
	},
	
	create: function(){
		console.log('create');
		this.collection.create(this.newAttributes());
	},
	
	newAttributes: function(){
		return {
	        title: $('#newListTitle').val().trim(),
	        completed: false
	      };
	},

});

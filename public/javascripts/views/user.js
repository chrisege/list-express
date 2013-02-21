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
	},
	
	initialize: function(){
		this.collection.fetch();
		this.listenTo(this.collection, 'reset', this.renderAll);
		//this.collection.on('reset', this.renderAll, this);
		//this.collection.on('reset', this.renderSelectedList, this);
		this.subViews = [];
	},
	
	renderAll: function(){
		var that = this;
		this.tmpl = _.template(this.template);
		_.each(this.collection.models, function(item){
			that.$el.append(that.tmpl(item.toJSON()));
		});
	},
	
	
	
	getSelectedId: function(){
		this.selected = this.collection.at(1);
		//console.log(this.selected.id);
		return this.selected.id;
	},
	
	renderSelectedList: function(e){
		this.emptySubViews();
		this.subViews = [];
		var selectedID = $(e.currentTarget.id);
		selectedID = selectedID.selector;
		if (this.listView) {
			this.listView.close();
			this.listView.remove();
		}
		console.log(this.listView);
		
		this.listView = new listExpress.ListView([], {id: selectedID});
		//console.log(window.listExpress.itemList);
		//listExpress.itemlist = new listExpress.ListView([], {id: selectedID});
		//this.subViews.push(listView);
		//console.log(this.subViews);
	},
	
	emptySubViews: function(){
		_.each(this.subViews, function(subView){
			// subView.unbind();
			// subView.remove();
			subView.close();
		});
	},
	

});

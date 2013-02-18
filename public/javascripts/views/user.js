var listExpress = listExpress || {};

// UserView shows all of a given user's lists.
// It should provide logic to select a list and render
// a ListView for that list.
// Since we don't have users yet, it just shows all lists.

listExpress.UserView = Backbone.View.extend({
	el: "toBeDetermined",
	
	// change this to pull a given user's lists
	// once users are built.
	collection: listExpress.Lists,
	
	initialize: function(){
		this.collection.fetch();
		this.collection.on('reset', this.renderSelectedList, this);
		// this.selected = this.collection.at(1);
		// console.log(this.collection);
		// console.log(this.collection.length);
	},
	
	getSelectedId: function(){
		this.selected = this.collection.at(1);
		//console.log(this.selected.id);
		return this.selected.id;
	},
	
	renderSelectedList: function(){
		var selectedID = this.getSelectedId();
		//console.log(selectedID);
		new listExpress.ListView([], {id: selectedID});
	},
	

});

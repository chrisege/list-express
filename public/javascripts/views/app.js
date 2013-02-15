var listExpress = listExpress || {};

listExpress.AppView = Backbone.View.extend({
	el: "#listExpress",
	
	initialize: function(){
		window.listExpress.Items.on('reset', this.renderAll, this);
		window.listExpress.Items.on('add', this.renderItem, this);
		//window.listExpress.Items.on('all', this.render, this); 
		//this.listenTo(listExpress.Items, "change", this.render);		
		listExpress.Items.fetch();
	},
	
	render: function(){
		var that = this;
		this.$('#itemContainer').html('');
		_.each(listExpress.Items.models, function(item){
			that.renderItem(item);
		}, this);
	},
	
	renderItem: function(item){
		var itemView = new listExpress.ItemView({
			model:item
		});
		this.$el.append(itemView.render().el);
	},
	
	renderAll: function(){
		var that = this;
		this.$('#itemContainer').html('');
		_.each(listExpress.Items.models, function(item){
			that.renderItem(item);
		}, this);
	}
	
});
var listExpress = listExpress || {};

listExpress.AppView = Backbone.View.extend({
	el: "#listExpress",
	collection: listExpress.Items,
	initialize: function(){
		this.input = this.$('#newItemForm');
		//console.log(this.input);
		//window.listExpress.Items.on('all', this.render, this);
		window.listExpress.Items.on('reset', this.renderAll, this);
		window.listExpress.Items.on('add', this.renderAll, this);
		listExpress.Items.fetch();
	},
	
	render: function(){
		var completed = this.collection.completed().length;
	},
	
	events: {
		'click #newItemSave': 'create',
	},
	
	renderItem: function(item){
		var itemView = new listExpress.ItemView({
			model:item
		});
		this.$('#itemContainer').append(itemView.render().el);
	},
	
	renderAll: function(){
		var that = this;
		this.$('#itemContainer').html('');
		_.each(listExpress.Items.models, function(item){
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
	
	renderGrouped: function(){
			this.$('#itemContainer').html('');
			var that = this;
			var grouped = listExpress.Items.groupBy(function(Item){
				_.each(grouped, function(category, index){
					that.$('#itemContainer').append(index);
					_.each(category, function(item){
						that.renderItem(item);
					});
				});
			});	
		},
});
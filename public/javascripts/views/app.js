var listExpress = listExpress || {};

listExpress.AppView = Backbone.View.extend({
	el: "#listExpress",
	
	initialize: function(){
		this.input = this.$('#newItemForm');
		console.log(this.input);
		window.listExpress.Items.on('reset', this.renderAll, this);
		window.listExpress.Items.on('add', this.renderItem, this);
		listExpress.Items.fetch();
	},
	
	render: function(){
		var that = this;
		this.$('#itemContainer').html('');
		_.each(listExpress.Items.models, function(item){
			that.renderItem(item);
		}, this);
	},
	
	events: {
		'click #newItemSave': 'create',
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
	},
	
	newAttributes: function() {
      return {
        title: $(this.input).children('#newItemTitle').val().trim(),
	    category: this.input.children("#newItemCategory").val().trim(),
        completed: false
      };
    },
	
	create: function(){
		listExpress.Items.create(this.newAttributes());
		this.input.children('input').val('');
	},
	
});
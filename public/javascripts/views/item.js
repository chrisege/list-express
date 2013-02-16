var listExpress = listExpress || {};

listExpress.ItemView = Backbone.View.extend({
	//el:"#itemContainer",
	tagName: 'tr',
	template: $("#itemTemplate").html(),
	
	events: {
		'click .toggle': 'toggleCompleted',
		'click .delete': 'clear',
	},
	
	initialize: function(){
		this.listenTo(this.model, 'destroy', this.remove);
	},
	
	toggleCompleted: function(){
		//console.log(this.model);
		this.model.toggle();
	},
	
	clear: function(){
		this.model.destroy({
			success: function() {
				
            }
		});
	},
	
	render: function(){
		var tmpl = _.template(this.template);
		this.$el.append(tmpl(this.model.toJSON()));
		return this;
	},
});
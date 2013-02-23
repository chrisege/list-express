var listExpress = listExpress || {};

listExpress.ItemView = Backbone.View.extend({
	tagName: 'div',
	className: 'row-fluid',
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
	
	close: function(){
		this.remove();
		this.undelegateEvents();
		this.unbind();
	},
	
	render: function(){
		var tmpl = _.template(this.template);
		this.$el.append(tmpl(this.model.toJSON()));
		return this;
	},
});
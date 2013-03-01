var listExpress = listExpress || {};

listExpress.ListTitleView = Backbone.View.extend({
	tagName: 'div',
	template: $("#listTitleTemplate").html(),
	events: {
		'click .listLink': 'selectList',
	},
	
	render: function(){
		var tmpl = _.template(this.template);
		this.$el.append(tmpl(this.model.toJSON()));
		return this;
	},
	
	selectList: function(){
		this.model.parentView.renderSelectedList(this.model, this.model.id);
	},
	
});

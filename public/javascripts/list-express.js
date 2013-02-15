

var Item = Backbone.Model.extend({
	defaults: {
		title: "",
		completed: false,
		category: ""			
	}
});

var ItemView = Backbone.View.extend({
	tagName: "div",
	className: "itemContainer",
	template: $("#itemTemplate").html(),
	render: function(){
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.toJSON()));
		return this;
	}
});

var item = new Item({
	title: "first item"
});
//console.log(item);

itemView = new ItemView({
	model:item
});


$('document').ready(function(){
	$("#itemContainer").html(itemView.render().el);
});
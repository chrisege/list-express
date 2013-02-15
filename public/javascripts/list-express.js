
var listExpress = listExpress || {};


$(function() {
	// var item = new listExpress.Item({
	// 		title: "first item"
	// 	});
   // Kick things off by creating the **App**.
   // var itemView = new listExpress.ItemView({
   // 	model: item
   //    });
   // 	$("#itemContainer").html(itemView.render().el);
	new listExpress.AppView();
	//window.listExpress.Items.create({title:"first item"});

});
// var Item = Backbone.Model.extend({
// 	defaults: {
// 		title: "",
// 		completed: false,
// 		category: ""			
// 	},
// 	toggle: function() {
//       this.save({
//         completed: !this.get('completed')
//       });
//     }
// });


// var ItemList = Backbone.Collection.extend({
// 	model: Item,
// 	
// 	completed: function(){
// 		return this.filter(function(item){
// 			return item.get('completed');
// 		});
// 	},
// 	
// 	remaining: function(){
// 		return this.without.apply(this, this.completed());
// 	}
// 	
// });

// var ItemView = Backbone.View.extend({
// 	tagName: "div",
// 	className: "itemContainer",
// 	template: $("#itemTemplate").html(),
// 	render: function(){
// 		var tmpl = _.template(this.template);
// 		this.$el.html(tmpl(this.model.toJSON()));
// 		return this;
// 	}
// });


// var item = new Item({
// 	title: "first item"
// });
// 
// 
// var itemView = new ItemView({
// 	model:item
// });
// 
// 
// $('document').ready(function(){
// 	$("#itemContainer").html(itemView.render().el);
// });

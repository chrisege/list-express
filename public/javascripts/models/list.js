var listExpress = listExpress || {};

listExpress.List = Backbone.Model.extend({
	idAttribute: "_id",
	defaults: {
		title: "",
		completed: false,
	},
	toggle: function() {
      this.save({
        completed: !this.get('completed')
      });
    }
});
var listExpress = listExpress || {};

listExpress.Item = Backbone.Model.extend({
	idAttribute: "_id",
	defaults: {
		title: "",
		completed: false,
		category: ""			
	},
	toggle: function() {
      this.save({
        completed: !this.get('completed')
      });
    }
});
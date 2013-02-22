

var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://localhost/library_database');

module.exports = function(app){	
	//Get a list of all items
	
	// app.get('/', function(req, res){
	//         res.render('index', { title: 'List-Express'});
	//     });

	//Schemas
	var Item = new mongoose.Schema({
	    title:String,
	    completed:Boolean,
		category:String,
		listId: String,
	});

	var List = new mongoose.Schema({
		title:String,
		completed:Boolean,
	});

	//Models
	var ItemModel = mongoose.model('Item', Item);
	var ListModel = mongoose.model('List', List);
	
	app.get('/api/lists', function(req, res) {
		return ListModel.find(function (err, lists){
			if (!err) {
				console.log('lists: '+lists.length);
				return res.send(lists);
			} else {
				return console.log(err);
			}
		});
	});
	
	app.post('/api/lists', function (req, res) {
		var list = new ListModel ({
			title:req.body.title,
			completed:req.body.completed,
		});
		list.save(function(err){
			if (!err) {
				return console.log('created');
			} else {
				return console.log(err);
			}
		});
	});
	
	app.put('/api/lists/:id', function(req, res) {
		console.log('Updating list '+ req.title);
		return ListModel.findById(req.params.id, function(err, list) {
			list.title = req.body.title;
			list.completed = req.body.completed;
			list.save(function(err) {
				if (!err) {
		            return console.log('list updated');
		        } else {
		            return console.log(err);
		        }
			});
		});
	});
	
	app.get('/api/lists/:id/items', function(req,res) {
		return ItemModel.find({listId: req.params.id}, function(err,items) {
			if (!err) {
				console.log(req.params.id+ ' list items: '+items.length);
				return res.send(items);
			} else {
				return console.log(err);
			}
		});
	});
	
	app.post('/api/lists/:id/items', function(req,res) { 
		var item = new ItemModel({
			title:req.body.title,
	        completed:req.body.completed,
	        category:req.body.category,
			listId:req.params.id
		});
		item.save(function (err) {
	        if (!err) {
	            return console.log('created');
	        } else {
	            return console.log(err);
	        }
	    });
	    return res.send(item);
	});
	
	//Update an item
	//currently doesn't check to make sure listId matches. does that matter?
	app.put('/api/lists/:listId/items/:itemId', function(req, res){
		console.log('Updating item ' + req.title);
		return ItemModel.findById(req.params.itemId, function(err, item){
			item.title = req.body.title;
			item.completed = req.body.completed;
			item.category = req.body.category;
			return item.save(function(err){
				if (!err){
					console.log('item updated');
				} else {
					console.log(err);
				}
				return res.send(item)
			});
		  });
	});
	
	//delete an item
	//currently doesn't check to make sure listId matches. does that matter?
	app.delete('/api/lists/:listId/items/:itemId', function(req, res){
		console.log('Deleting item ' + req.title);
		return ItemModel.findById(req.params.itemId, function(err, item){
			return item.remove(function(err){
				if (!err){
					console.log('item deleted');
				} else {
					console.log(err);
				}
				return res.send(item)
			});
		});
	});
	
	
	app.get('/api/items', function (req, res) {
	    return ItemModel.find(function (err, items) {
	        if (!err) {
				console.log('items: '+items.length);
	            return res.send(items);
	        } else {
	            return console.log(err);
	        }
	    });
	});
	
	//Insert a new item
	app.post('/api/items', function (req, res) {
	    var item = new ItemModel({
	        title:req.body.title,
	        completed:req.body.completed,
	        category:req.body.category
	    });
	    item.save(function (err) {
	        if (!err) {
	            return console.log('created');
	        } else {
	            return console.log(err);
	        }
	    });
	    return res.send(item);
	});
	
	//Update an item
	app.put('/api/items/:id', function(req, res){
		console.log('Updating item ' + req.title);
		return ItemModel.findById(req.params.id, function(err, item){
			item.title = req.body.title;
			item.completed = req.body.completed;
			item.category = req.body.category;
			return item.save(function(err){
				if (!err){
					console.log('item updated');
				} else {
					console.log(err);
				}
				return res.send(item)
			});
		  });
	});
	
	app.delete('/api/items/:id', function(req, res){
		console.log('Deleting item ' + req.title);
		return ItemModel.findById(req.params.id, function(err, item){
			return item.remove(function(err){
				if (!err){
					console.log('item deleted');
				} else {
					console.log(err);
				}
				return res.send(item)
			});
		});
	});
}
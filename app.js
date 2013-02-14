
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);


//Connect to database
mongoose.connect('mongodb://localhost/library_database');

//Schemas
var Item = new mongoose.Schema({
    title:String,
    completed:Boolean,
	category:String,
});

//Models
var ItemModel = mongoose.model('Item', Item);

//Get a list of all books
app.get('/api/items', function (req, res) {
    return ItemModel.find(function (err, items) {
        if (!err) {
            return res.send(items);
        } else {
            return console.log(err);
        }
    });
});

//Insert a new book
app.post('/api/items', function (req, res) {
    var item = new ItemModel({
        title:req.body.title,
        status:req.body.status,
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

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


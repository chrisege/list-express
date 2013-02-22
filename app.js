
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , piler = require('piler')
  , cons = require('consolidate')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path');

//var app = express();



var piler = require("piler");
app.clientjs = piler.createJSManager();
app.clientcss = piler.createCSSManager();

app.configure(function(){
  app.clientjs.bind(app);
  app.clientcss.bind(app);

  app.clientcss.addFile(__dirname + "/public/stylesheets/style.css");
  app.clientjs.addFile(__dirname + "/node_modules/zepto/zepto.min.js");
  app.clientjs.addFile(__dirname + "/node_modules/lodash/lodash.js");
  app.clientjs.addFile(__dirname + "/node_modules/backbone/backbone.js"); //switch to min at some point


  app.engine('html', cons.handlebars);

  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');

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

require('./routes/index')(app);
require('./routes/api')(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


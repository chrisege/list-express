
/*
 * GET home page.
 */

var fs = require('fs');

module.exports = function(app){
   	app.get('/', function(req, res){
        res.render('index', { 
			title: 'List-Express',
			css: app.clientcss.renderTags(),
			js: app.clientjs.renderTags()
		});
    });
}

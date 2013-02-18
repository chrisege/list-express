$.post('/api/lists/', {
	'title': 'test list',
}, function(data, textStatus, jqXHR) {
    console.log( 'Post response:' );
    console.dir( data );
    console.log( textStatus );
    console.dir( jqXHR );
});

$.get( '/api/lists/', function( data, textStatus, jqXHR ) {
    console.log( 'Get response:' );
    console.dir( data );
    console.log( textStatus );
    console.dir( jqXHR );
});
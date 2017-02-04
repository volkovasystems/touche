const touche = require( "./touche.js" );

touche( "hello.world", true );

touche( "yeah.world" )( function done( ){
	console.log( arguments );
} );

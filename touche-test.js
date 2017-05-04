const assert = require( "assert" );
const touche = require( "./touche.js" );

assert.ok( touche( "hello.world", true ) );

touche( "yeah.world" )( function done( ){
	console.log( arguments );
} );

console.log( "ok" );

const assert = require( "assert" );
const touche = require( "./touche.js" );

assert.equal( touche( "hello.world", true ), true, "should be true" );

touche( "yeah.world" )( function done( ){
	assert.equal( arguments[ 1 ], true, "should be true" );
} );

console.log( "ok" );

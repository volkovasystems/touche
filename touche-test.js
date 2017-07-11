const assert = require( "assert" );
const fs = require( "fs" );
const touche = require( "./touche.js" );

assert.equal( touche( "test.txt", true ), true, "should be true" );

fs.unlinkSync( "test.txt" );

touche( "test.txt" )( function done( error, result ){
	assert.equal( result, true, "should be true" );

	fs.unlinkSync( "test.txt" );
} );

console.log( "ok" );

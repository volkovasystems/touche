/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "touche",
			"path": "touche/touche.js",
			"file": "touche.js",
			"module": "touche",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
			"repository": "https://github.com:volkovasystems/touche.git",
			"test": "touche-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Create new file.
	@end-module-documentation

	@include:
		{
			"falzy": "falzy",
			"fs": "fs",
			"letgo": "letgo",
			"zelf": "zelf"
		}
	@end-include
*/

const falzy = require( "falzy" );
const fs = require( "fs" );
const letgo = require( "letgo" );
const zelf = require( "zelf" );

const touche = function touche( path, synchronous ){
	/*;
		@meta-configuration:
			{
				"path:required": "string",
				"synchronous": "boolean"
			}
		@end-meta-configuration
	*/

	if( falzy( path ) || typeof path != "string" ){
		throw new Error( "invalid path" );
	}

	if( synchronous === true ){
		try{
			fs.closeSync( fs.openSync( path, "a" ) );

			return true;

		}catch( error ){
			throw new Error( `cannot create file, ${ error.stack }` );
		}

	}else{
		let catcher = letgo.bind( zelf( this ) )( function later( callback ){
			fs.open( path, "a", function done( error, descriptor ){
				if( error instanceof Error ){
					callback( new Error( `cannot create file, ${ error.stack }` ), false );

				}else{
					fs.close( descriptor, function done( error ){
						if( error instanceof Error ){
							callback( new Error( `cannot create file, ${ error.stack }` ), false );

						}else{
							callback( null, true );
						}
					} );
				}
			} );
		} );

		return catcher;
	}
};

module.exports = touche;

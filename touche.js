/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
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
			"fs": "fs",
			"letgo": "letgo",
			"zelf": "zelf"
		}
	@end-include
*/

var fs = require( "fs" );
var letgo = require( "letgo" );
var zelf = require( "zelf" );

var touche = function touche( path, synchronous ){
	/*;
		@meta-configuration:
			{
				"path:required": "string",
				"synchronous": "boolean"
			}
		@end-meta-configuration
	*/

	if( typeof path != "string" || !path ){
		throw new Error( "invalid path" );
	}

	if( synchronous ){
		try{
			fs.closeSync( fs.openSync( path, "a" ) );

			return true;

		}catch( error ){
			throw new Error( "error creating file, " + error.message );
		}

	}else{
		var self = zelf( this );

		var catcher = letgo.bind( self )( );

		fs.open( path, "a",
			function onOpenFile( error, descriptor ){
				if( error ){
					error = new Error( "error creating file, " + error.message );

					catcher.cache.callback( error, false );

				}else{
					fs.close( descriptor, function onCloseFile( error ){
						if( error ){
							error = new Error( "error creating file, " + error.message );

							catcher.cache.callback( error, false );

						}else{
							catcher.cache.callback( null, true );
						}
					} );
				}
			} );

		return catcher;
	}
};

module.exports = touche;

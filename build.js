'use strict';

var babe = require('babel-core'),
    glob = require('glob'),
    path = require('path'),
    file = require('fs-extra');

// Creating scripts list.
var scripts = [
    'data-type',
    'iterator',
    'obj-patches',
    'str-patches',
    'int-patches'
]

// Creating script content holder.
var content = '';

// Reading each scripts.
scripts.forEach(( name ) => {
    let fl = path.resolve('./utils', `${name}.js`);

    try {
        let text = file.readFileSync(fl, 'utf8');

        content += text + '\r\n';
    }
    catch ( err ) {
        console.log(err);
    }
});

// Adding sourcemap url.
content += '/*# sourceMappingURL=jsfix.js.map */';

// Compiling the scripts.
var compiled = babe.transform(content, {
    sourceMaps      : true,
    sourceMapTarget : 'jsfix.js.map',
    presets         : [ 'es2015' ]
});

// Adding files.
file.ensureFileSync('./dist/jsfix.js');
file.ensureFileSync('./dist/jsfix.js.map');

// Writing compiled scripts to file.
file.writeFileSync('./dist/jsfix.js', compiled.code);
file.writeJsonSync('./dist/jsfix.js.map', compiled.map);

console.log('Build success!');
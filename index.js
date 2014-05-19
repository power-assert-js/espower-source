/**
 * espower-source - Power Assert instrumentor from source to source.
 * 
 * https://github.com/twada/espower-source
 *
 * Copyright (c) 2014 Takuto Wada
 * Licensed under the MIT license.
 *   https://github.com/twada/espower-source/blob/master/MIT-LICENSE.txt
 */
var espower = require('espower'),
    esprima = require('esprima'),
    escodegen = require('escodegen'),
    merge = require('lodash.merge'),
    convert = require('convert-source-map');

function espowerSourceToSource(jsCode, filepath, options) {
    'use strict';

    var jsAst, espowerOptions, modifiedAst, escodegenOutput, code, map;

    jsAst = esprima.parse(jsCode, {tolerant: true, loc: true, tokens: true, raw: true, source: filepath});
    espowerOptions = merge(merge(espower.defaultOptions(), options), {
        destructive: true,
        path: filepath
    });
    modifiedAst = espower(jsAst, espowerOptions);
    escodegenOutput = escodegen.generate(modifiedAst, {
        sourceMap: true,
        sourceMapWithCode: true
    });
    code = escodegenOutput.code; // Generated source code
    map = convert.fromJSON(escodegenOutput.map.toString());
    map.sourcemap.sourcesContent = [jsCode];
    return code + '\n' + map.toComment() + '\n';
}

module.exports = espowerSourceToSource;

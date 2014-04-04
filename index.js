/*
 * espower-source - Power Assert instrumentor from source to source.
 * 
 * https://github.com/twada/espower-source
 *
 * Copyright (c) 2014 Takuto Wada
 * Licensed under the MIT license.
 *   https://raw.github.com/twada/espower-source/master/MIT-LICENSE.txt
 */
var espower = require('espower'),
    esprima = require('esprima'),
    escodegen = require('escodegen'),
    merge = require('lodash.merge'),
    sourceMap = require('convert-source-map');

function espowerSourceToSource(jsCode, filepath, options) {
    'use strict';

    var espowerOptions, modifiedAst, generatedOutput, code, map,
        jsAst = esprima.parse(jsCode, {tolerant: true, loc: true, tokens: true, source: filepath});
    espowerOptions = merge(merge(espower.defaultOptions(), options), {
        destructive: true,
        path: filepath,
        source: jsCode
    });
    modifiedAst = espower(jsAst, espowerOptions);
    generatedOutput = escodegen.generate(modifiedAst, {
        sourceMap: true,
        sourceMapWithCode: true
    });
    code = generatedOutput.code; // Generated source code
    map = sourceMap.fromJSON(generatedOutput.map);
    map.sourcemap.sourcesContent = [jsCode];
    return code + '\n' + map.toComment() + '\n';
}

module.exports = espowerSourceToSource;

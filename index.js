/**
 * espower-source - Power Assert instrumentor from source to source.
 * 
 * https://github.com/power-assert-js/espower-source
 *
 * Copyright (c) 2014-2015 Takuto Wada
 * Licensed under the MIT license.
 *   https://github.com/power-assert-js/espower-source/blob/master/MIT-LICENSE.txt
 */
'use strict';

var espower = require('espower');
var esprima = require('esprima');
var escodegen = require('escodegen');
var extend = require('xtend');
var convert = require('convert-source-map');
var transfer = require('multi-stage-sourcemap').transfer;

function mergeSourceMap(incomingSourceMap, outgoingSourceMap) {
    if (typeof outgoingSourceMap === 'string' || outgoingSourceMap instanceof String) {
        outgoingSourceMap = JSON.parse(outgoingSourceMap);
    }
    if (!incomingSourceMap) {
        return outgoingSourceMap;
    }
    return JSON.parse(transfer({fromSourceMap: outgoingSourceMap, toSourceMap: incomingSourceMap}));
}

function handleUpstreamSourceMap (jsCode, options) {
    var inMap;
    if (options.sourceMap) {
        if (typeof options.sourceMap === 'string' || options.sourceMap instanceof String) {
            options.sourceMap = JSON.parse(options.sourceMap);
        }
        inMap = options.sourceMap;
    } else {
        var commented = convert.fromSource(jsCode);
        if (commented) {
            inMap = commented.toObject();
            options.sourceMap = inMap;
        }
    }
    return inMap;
}

function instrument (jsCode, filepath, options) {
    var jsAst = esprima.parse(jsCode, {tolerant: true, loc: true, source: filepath});
    var modifiedAst = espower(jsAst, options);
    // keep paths absolute by not using `file` and `sourceMapRoot`
    // paths will be resolved by mold-source-map
    return escodegen.generate(modifiedAst, {
        sourceMap: true,
        sourceMapWithCode: true
    });
}

function mergeEspowerOptions (options, filepath) {
    return extend(espower.defaultOptions(), options, {
        destructive: true,
        path: filepath
    });
}

function espowerSource(jsCode, filepath, options) {
    var espowerOptions = mergeEspowerOptions(options, filepath);
    var inMap = handleUpstreamSourceMap(jsCode, espowerOptions);
    var instrumented = instrument(jsCode, filepath, espowerOptions);
    var outMap = convert.fromJSON(instrumented.map.toString());
    if (inMap) {
        var mergedRawMap = mergeSourceMap(inMap, outMap.toObject());
        var reMap = convert.fromObject(mergedRawMap);
        reMap.setProperty('sources', inMap.sources);
        reMap.setProperty('sourceRoot', inMap.sourceRoot);
        reMap.setProperty('sourcesContent', inMap.sourcesContent);
        return instrumented.code + '\n' + reMap.toComment() + '\n';
    } else {
        // Keeping paths absolute. Paths will be resolved by mold-source-map.
        outMap.setProperty('sources', [filepath]);
        outMap.setProperty('sourcesContent', [jsCode]);
        return instrumented.code + '\n' + outMap.toComment() + '\n';
    }
}

module.exports = espowerSource;

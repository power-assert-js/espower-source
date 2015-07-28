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
var _path = require('path');
var isAbsolute = require('path-is-absolute');

function mergeSourceMap (incomingSourceMap, outgoingSourceMap) {
    if (typeof outgoingSourceMap === 'string' || outgoingSourceMap instanceof String) {
        outgoingSourceMap = JSON.parse(outgoingSourceMap);
    }
    if (!incomingSourceMap) {
        return outgoingSourceMap;
    }
    return JSON.parse(transfer({fromSourceMap: outgoingSourceMap, toSourceMap: incomingSourceMap}));
}

function handleIncomingSourceMap (originalCode, options) {
    var inMap;
    if (options.sourceMap) {
        if (typeof options.sourceMap === 'string' || options.sourceMap instanceof String) {
            options.sourceMap = JSON.parse(options.sourceMap);
        }
        inMap = options.sourceMap;
    } else {
        var commented = convert.fromSource(originalCode);
        if (commented) {
            inMap = commented.toObject();
            options.sourceMap = inMap;
        }
    }
    return inMap;
}

function adjustFilepath (filepath, sourceRoot) {
    if (!sourceRoot || !isAbsolute(filepath)) {
        return filepath;
    }
    var relativePath = _path.relative(sourceRoot, filepath);
    if (relativePath.split(_path.sep).indexOf('..') !== -1) {
        // if absolute filepath conflicts with sourceRoot, use filepath only.
        return filepath;
    }
    return relativePath;
}

function instrument (originalCode, filepath, options) {
    var jsAst = esprima.parse(originalCode, {tolerant: true, loc: true});
    var modifiedAst = espower(jsAst, options);
    var escodegenOptions = extend({
        sourceMap: adjustFilepath(filepath || options.path, options.sourceRoot),
        sourceContent: originalCode,
        sourceMapWithCode: true
    });
    return escodegen.generate(modifiedAst, escodegenOptions);
}

function instrumentWithoutSourceMapOutput (originalCode, options) {
    var jsAst = esprima.parse(originalCode, {tolerant: true, loc: true});
    var modifiedAst = espower(jsAst, options);
    return escodegen.generate(modifiedAst);
}

function mergeEspowerOptions (options, filepath) {
    return extend(espower.defaultOptions(), {
        path: filepath
    }, options, {
        destructive: true
    });
}

module.exports = function espowerSource (originalCode, filepath, options) {
    if (!originalCode) {
        throw new espower.EspowerError('`originalCode` is not specified', espowerSource);
    }
    var espowerOptions = mergeEspowerOptions(options, filepath);
    var inMap = handleIncomingSourceMap(originalCode, espowerOptions);
    if (!(filepath || espowerOptions.path)) {
        return instrumentWithoutSourceMapOutput(originalCode, espowerOptions);
    }
    var instrumented = instrument(originalCode, filepath, espowerOptions);
    var outMap = convert.fromJSON(instrumented.map.toString());
    if (inMap) {
        var mergedRawMap = mergeSourceMap(inMap, outMap.toObject());
        var reMap = convert.fromObject(mergedRawMap);
        if (inMap.sources) {
            reMap.setProperty('sources', inMap.sources);
        }
        if (inMap.sourceRoot) {
            reMap.setProperty('sourceRoot', inMap.sourceRoot);
        }
        if (inMap.sourcesContent) {
            reMap.setProperty('sourcesContent', inMap.sourcesContent);
        }
        return instrumented.code + '\n' + reMap.toComment() + '\n';
    } else {
        return instrumented.code + '\n' + outMap.toComment() + '\n';
    }
};

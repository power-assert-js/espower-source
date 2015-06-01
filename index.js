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

function handleIncomingSourceMap (jsCode, options) {
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

function adjustPathsWithSourceRoot (filepath, sourceRoot) {
    var relativePath;
    if (isAbsolute(filepath)) {
        relativePath = _path.relative(sourceRoot, filepath);
        if (relativePath.split(_path.sep).indexOf('..') !== -1) {
            // if absolute filepath conflicts with sourceRoot, use filepath only.
            return {
                sourceMap: filepath
            };
        }
    } else {
        relativePath = filepath;
    }
    return {
        sourceMapRoot: sourceRoot,
        sourceMap: relativePath
    };
}

function generate (modifiedAst, jsCode, filepath, options) {
    var extra;
    if (options.sourceRoot) {
        extra = adjustPathsWithSourceRoot(filepath, options.sourceRoot);
    } else {
        extra = { sourceMap: filepath };
    }
    var escodegenOptions = extend({
        sourceContent: jsCode,
        sourceMapWithCode: true
    }, extra);
    return escodegen.generate(modifiedAst, escodegenOptions);
}

function instrument (jsCode, filepath, options) {
    var jsAst = esprima.parse(jsCode, {tolerant: true, loc: true});
    var modifiedAst = espower(jsAst, options);
    return generate(modifiedAst, jsCode, filepath, options);
}

function mergeEspowerOptions (options, filepath) {
    return extend(espower.defaultOptions(), {
        path: filepath
    }, options, {
        destructive: true
    });
}

module.exports = function espowerSource (jsCode, filepath, options) {
    var espowerOptions = mergeEspowerOptions(options, filepath);
    var inMap = handleIncomingSourceMap(jsCode, espowerOptions);
    var instrumented = instrument(jsCode, filepath, espowerOptions);
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

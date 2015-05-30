var espowerSource = require('..');
var esprima = require('esprima');
var escodegen = require('escodegen');
var sourceMap = require('source-map');
var convert = require('convert-source-map');
var extend = require('xtend');
var assert = require('assert');

describe('incoming SourceMap support', function () {

    function withIncomingInlineSourceMap(testName, config) {
        it(testName + ' with inline SourceMap: ' + config.inlineSourceMap, function () {
            var originalCode = 'var str = "foo";\nvar anotherStr = "bar"\n\nassert.equal(\nstr,\nanotherStr\n);';
            var incomingCodeAndMap = escodegen.generate(esprima.parse(originalCode, {tolerant: true, loc: true, source: config.incomingFilepath}), {
                format: {
                    compact: true
                },
                sourceMap: config.incomingFilepath,
                sourceMapRoot: config.incomingSourceMapRoot,
                sourceContent: originalCode,
                sourceMapWithCode: true
            });

            var incomingCode = incomingCodeAndMap.code;
            // console.log(incomingCode);
            var incomingSourceMap = incomingCodeAndMap.map.toString();
            // console.log(incomingSourceMap);

            var espowerOptions = {
                patterns: [
                    'assert.equal(actual, expected, [message])'
                ],
                sourceRoot: config.espowerSourceRoot
            };

            if (config.inlineSourceMap) {
                incomingCode = incomingCode + '\n' + convert.fromJSON(incomingSourceMap).toComment() + '\n';
            } else {
                espowerOptions.sourceMap = incomingSourceMap;
            }
            var intermediateFilepath = '/path/to/absolute/intermediate/transformed_test.js';
            var result = espowerSource(incomingCode, intermediateFilepath, espowerOptions);
            var compactCode = escodegen.generate(esprima.parse(convert.removeComments(result)), {format: {compact: true}});

            assert.equal(compactCode, "var str='foo';var anotherStr='bar';assert.equal(assert._expr(assert._capt(str,'arguments/0'),{content:'assert.equal(str, anotherStr)',filepath:'" + config.filepathInGeneratedCode + "',line:4}),assert._expr(assert._capt(anotherStr,'arguments/1'),{content:'assert.equal(str, anotherStr)',filepath:'" + config.filepathInGeneratedCode + "',line:4}));");

            var outgoingSourceMap = convert.fromSource(result).toObject();
            assert.equal(outgoingSourceMap.sources.length, 1);
            assert.equal(outgoingSourceMap.sources[0], config.filepathInSourceMap);
            assert.equal(outgoingSourceMap.sourcesContent.length, 1);
            assert.equal(outgoingSourceMap.sourcesContent[0], originalCode);
            assert.equal(outgoingSourceMap.sourceRoot, config.sourceRootInOutgoingSourceMap);
        });
    }

    function incomingSourceMapTest (testName, config) {
        withIncomingInlineSourceMap(testName, extend(config, {inlineSourceMap: false}));
        withIncomingInlineSourceMap(testName, extend(config, {inlineSourceMap: true}));
    }

    incomingSourceMapTest('filepath in sourceMap is absolute', {
        incomingFilepath: '/path/to/absolute/original_test.js',
        incomingSourceMapRoot: undefined,
        espowerSourceRoot: undefined,
        filepathInGeneratedCode: '/path/to/absolute/original_test.js',
        filepathInSourceMap: '/path/to/absolute/original_test.js',
        sourceRootInOutgoingSourceMap: undefined
    });

    incomingSourceMapTest('filepath in sourceMap is relative', {
        incomingFilepath: 'relative/original_test.js',
        incomingSourceMapRoot: undefined,
        espowerSourceRoot: undefined,
        filepathInGeneratedCode: 'relative/original_test.js',
        filepathInSourceMap: 'relative/original_test.js',
        sourceRootInOutgoingSourceMap: undefined
    });

    incomingSourceMapTest('when sourceMap.sourceRoot is given and options.sourceRoot is not given', {
        incomingFilepath: 'test/original_test.js',
        incomingSourceMapRoot: '/path/to/base',
        espowerSourceRoot: undefined,
        filepathInGeneratedCode: 'test/original_test.js',
        filepathInSourceMap: 'test/original_test.js',
        sourceRootInOutgoingSourceMap: '/path/to/base'
    });

    incomingSourceMapTest('when options.sourceRoot is given and sourceMap.sourceRoot is not given', {
        incomingFilepath: '/path/to/project/test/original_test.js',
        incomingSourceMapRoot: undefined,
        espowerSourceRoot: '/path/to/project/',
        filepathInGeneratedCode: 'test/original_test.js',
        filepathInSourceMap: '/path/to/project/test/original_test.js',
        sourceRootInOutgoingSourceMap: undefined
    });

    incomingSourceMapTest('when both options.sourceRoot and sourceMap.sourceRoot are given, options.sourceRoot has precedence over sourceMap.sourceRoot', {
        incomingFilepath: 'project/test/original_test.js',
        incomingSourceMapRoot: '/path/to',
        espowerSourceRoot: '/path/to/project/',
        filepathInGeneratedCode: 'test/original_test.js',
        filepathInSourceMap: 'project/test/original_test.js',
        sourceRootInOutgoingSourceMap: '/path/to'
    });

    incomingSourceMapTest('when path in sourceMap is already relative, just use it even if sourceRoot exists', {
        incomingFilepath: 'already/relative/test.js',
        incomingSourceMapRoot: undefined,
        espowerSourceRoot: '/path/to/project/test/already/relative',
        filepathInGeneratedCode: 'already/relative/test.js',
        filepathInSourceMap: 'already/relative/test.js',
        sourceRootInOutgoingSourceMap: undefined
    });
});
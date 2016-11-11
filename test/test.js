var espowerSource = require('..');
var espower = require('espower');
var sourceMap = require('source-map');
var convert = require('convert-source-map');
var fs = require('fs');
var assert = require('assert');

describe('with default options', function() {
    beforeEach(function () {
        this.path = 'test/fixtures/example.js';
        this.input = fs.readFileSync('test/fixtures/example.js', 'utf8'),
        this.output = espowerSource(this.input, this.path);
        this.map = convert.fromSource(this.output).toObject();
    });

    it('should return a string', function() {
        assert.equal(typeof this.output, 'string');
    });

    it('should transform source', function() {
        var expected = fs.readFileSync('test/expected/example.js', 'utf8');
        assert.equal(this.output, expected);
    });

    describe('generated sourceMap', function() {
        testSourceMapCommonAttributes();
        it('names', function () {
            assert.deepEqual(this.map.names, [
                "_PowerAssertRecorder1", "PowerAssertRecorder", "captured", "prototype",
                "_capt", "value", "espath", "push",
                "_expr", "source", "powerAssertContext", "events",
                "_rec1", "_rec2", "_rec3",
                "assert", "require", "truthy", "falsy", "content", "filepath", "line", "equal"
            ]);
        });
        it('mappings', function () {
            assert.equal(this.map.mappings, 'AAAA,IAAAA,qBAAA;AAAA,aAAAC,mBAAA;AAAA,aAAAC,QAAA;AAAA;AAAA,IAAAD,mBAAA,CAAAE,SAAA,CAAAC,KAAA,YAAAA,KAAA,CAAAC,KAAA,EAAAC,MAAA;AAAA,aAAAJ,QAAA,CAAAK,IAAA;AAAA,YAAAF,KAAA,EAAAA,KAAA;AAAA,YAAAC,MAAA,EAAAA,MAAA;AAAA;AAAA,eAAAD,KAAA;AAAA;AAAA,IAAAJ,mBAAA,CAAAE,SAAA,CAAAK,KAAA,YAAAA,KAAA,CAAAH,KAAA,EAAAI,MAAA;AAAA;AAAA,YAAAC,kBAAA;AAAA,gBAAAL,KAAA,EAAAA,KAAA;AAAA,gBAAAM,MAAA,OAAAT,QAAA;AAAA;AAAA,YAAAO,MAAA,EAAAA,MAAA;AAAA;AAAA;AAAA,WAAAR,mBAAA;AAAA;AAGO,IAAAW,KAAA,OAAAZ,qBAAA,GAHP;AAIa,IAAAa,KAAA,OAAAb,qBAAA,GAJb;AAIqB,IAAAc,KAAA,OAAAd,qBAAA,GAJrB;AAAA,IAAIe,MAAA,GAASC,OAAA,CAAQ,cAAR,CAAb,EACIC,MAAA,GAAS,MADb,EAEIC,KAAA,GAAQ,OAFZ;AAGAH,MAAA,CAAOH,KAAA,CAAAJ,KAAA,CAAAI,KAAA,CAAAR,KAAA,CAAAc,KAAA;AAAA,IAAAC,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAAP,EAHA;AAIAN,MAAA,CAAOO,KAAP,CAAaT,KAAA,CAAAL,KAAA,CAAAK,KAAA,CAAAT,KAAA,CAAAa,MAAA;AAAA,IAAAE,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAAb,EAAqBP,KAAA,CAAAN,KAAA,CAAAM,KAAA,CAAAV,KAAA,CAAAc,KAAA;AAAA,IAAAC,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAArB');
        });
    });

    describe('consuming generated sourceMap', function () {
        beforeEach(function () {
            this.consumer = new sourceMap.SourceMapConsumer(this.map);
            var mappings = [];
            this.consumer.eachMapping(function (mapping) {
                mappings.push(mapping);
            });
            this.mappings = mappings;
        });
        it('mapping count', function () {
            assert.equal(this.mappings.length, 186);
        });
        it('mapping with names', function () {
            var withNames = this.mappings.filter(function (mapping) { return mapping.name; });
            assert.equal(withNames.length, 67);
        });
        it('originalPosition', function () {
            assert.deepEqual(this.consumer.originalPositionFor({line:26,column:4}),
                             {source:'test/fixtures/example.js',line:1,column:4,name:'assert'});
            assert.deepEqual(this.consumer.originalPositionFor({line:26,column:38}),
                             {source:'test/fixtures/example.js',line:2,column:4,name:'truthy'});
            assert.deepEqual(this.consumer.originalPositionFor({line:26,column:55}),
                             {source:'test/fixtures/example.js',line:3,column:4,name:'falsy'});
            assert.deepEqual(this.consumer.originalPositionFor({line:32,column:7}),
                             {source:'test/fixtures/example.js',line:5,column:7,name:'equal'});
        });
    });
});


describe('with customized options', function() {
    beforeEach(function () {
        this.path = 'test/fixtures/customized.js';
        this.input = fs.readFileSync('test/fixtures/customized.js', 'utf8'),
        this.output = espowerSource(this.input, this.path, {
            patterns: [
                'refute(actual, [message])',
                'refute.same(actual, expected, [message])',
                'refute.isNull(object, [message])'
            ]
        });
        this.map = convert.fromSource(this.output).toObject();
    });

    it('should return a string', function() {
        assert.equal(typeof this.output, 'string');
    });

    it('should transform source', function() {
        var expected = fs.readFileSync('test/expected/customized.js', 'utf8');
        assert.equal(this.output, expected);
    });

    describe('generated sourceMap', function() {
        testSourceMapCommonAttributes();
        it('names', function () {
            assert.deepEqual(this.map.names, [
                "_PowerAssertRecorder1", "PowerAssertRecorder", "captured", "prototype",
                "_capt", "value", "espath", "push",
                "_expr", "source", "powerAssertContext", "events",
                "_rec1", "_rec2", "_rec3", "_rec4",
                "empower","require","formatter","busterAssertions","refute","targetMethods","oneArg","twoArgs","truthy","falsy","content","filepath","line","isNull","same"
            ]);
        });
        it('mappings', function () {
            assert.equal(this.map.mappings, 'AAAA,IAAAA,qBAAA;AAAA,aAAAC,mBAAA;AAAA,aAAAC,QAAA;AAAA;AAAA,IAAAD,mBAAA,CAAAE,SAAA,CAAAC,KAAA,YAAAA,KAAA,CAAAC,KAAA,EAAAC,MAAA;AAAA,aAAAJ,QAAA,CAAAK,IAAA;AAAA,YAAAF,KAAA,EAAAA,KAAA;AAAA,YAAAC,MAAA,EAAAA,MAAA;AAAA;AAAA,eAAAD,KAAA;AAAA;AAAA,IAAAJ,mBAAA,CAAAE,SAAA,CAAAK,KAAA,YAAAA,KAAA,CAAAH,KAAA,EAAAI,MAAA;AAAA;AAAA,YAAAC,kBAAA;AAAA,gBAAAL,KAAA,EAAAA,KAAA;AAAA,gBAAAM,MAAA,OAAAT,QAAA;AAAA;AAAA,YAAAO,MAAA,EAAAA,MAAA;AAAA;AAAA;AAAA,WAAAR,mBAAA;AAAA;AAMO,IAAAW,KAAA,OAAAZ,qBAAA,GANP;AAOc,IAAAa,KAAA,OAAAb,qBAAA,GAPd;AAQY,IAAAc,KAAA,OAAAd,qBAAA,GARZ;AAQoB,IAAAe,KAAA,OAAAf,qBAAA,GARpB;AAAA,IAAIgB,OAAA,GAAUC,OAAA,CAAQ,SAAR,CAAd,EACIC,SAAA,GAAYD,OAAA,CAAQ,wBAAR,CADhB,EAEIE,gBAAA,GAAmBF,OAAA,CAAQ,mBAAR,CAFvB,EAGIG,MAAA,GAASJ,OAAA,CAAQG,gBAAA,CAAiBC,MAAzB,EAAiCF,SAAA,EAAjC,EAA8C;AAAA,QAAEG,aAAA,EAAe;AAAA,YAAEC,MAAA,EAAQ,CAAC,QAAD,CAAV;AAAA,YAAsBC,OAAA,EAAS,CAAC,MAAD,CAA/B;AAAA,SAAjB;AAAA,KAA9C,CAHb,EAIIC,MAAA,GAAS,MAJb,EAKIC,KAAA,GAAQ,OALZ;AAMAL,MAAA,CAAOR,KAAA,CAAAJ,KAAA,CAAAI,KAAA,CAAAR,KAAA,CAAAoB,MAAA;AAAA,IAAAE,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAAP,EANA;AAOAR,MAAA,CAAOS,MAAP,CAAchB,KAAA,CAAAL,KAAA,CAAAK,KAAA,CAAAT,KAAA,CAAAqB,KAAA;AAAA,IAAAC,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAAd,EAPA;AAQAR,MAAA,CAAOU,IAAP,CAAYhB,KAAA,CAAAN,KAAA,CAAAM,KAAA,CAAAV,KAAA,CAAAoB,MAAA;AAAA,IAAAE,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAAZ,EAAoBb,KAAA,CAAAP,KAAA,CAAAO,KAAA,CAAAX,KAAA,CAAAqB,KAAA;AAAA,IAAAC,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAApB');
        });
    });

    describe('consuming generated sourceMap', function () {
        beforeEach(function () {
            this.consumer = new sourceMap.SourceMapConsumer(this.map);
            var mappings = [];
            this.consumer.eachMapping(function (mapping) {
                mappings.push(mapping);
            });
            this.mappings = mappings;
        });
        it('mapping count', function () {
            assert.equal(this.mappings.length, 267);
        });
        it('mapping with names', function () {
            var withNames = this.mappings.filter(function (mapping) { return mapping.name; });
            assert.equal(withNames.length, 91);
        });
        it('originalPosition', function () {
            assert.deepEqual(this.consumer.originalPositionFor({line:27,column:34}),
                             {source:'test/fixtures/customized.js',line:2,column:4,name:'formatter'});
            assert.deepEqual(this.consumer.originalPositionFor({line:27,column:81}),
                             {source:'test/fixtures/customized.js',line:3,column:4,name:'busterAssertions'});
            assert.deepEqual(this.consumer.originalPositionFor({line:27,column:130}),
                             {source:'test/fixtures/customized.js',line:4,column:4,name:'refute'});
            assert.deepEqual(this.consumer.originalPositionFor({line:32,column:8}),
                             {source:'test/fixtures/customized.js',line:5,column:4,name:'truthy'});
            assert.deepEqual(this.consumer.originalPositionFor({line:32,column:25}),
                             {source:'test/fixtures/customized.js',line:6,column:4,name:'falsy'});
            assert.deepEqual(this.consumer.originalPositionFor({line:38,column:7}),
                             {source:'test/fixtures/customized.js',line:8,column:7,name:'isNull'});
            assert.deepEqual(this.consumer.originalPositionFor({line:43,column:7}),
                             {source:'test/fixtures/customized.js',line:9,column:7,name:'same'});
        });
    });
});


function testSourceMapCommonAttributes() {
    it('version', function () {
        assert.equal(this.map.version, 3);
    });
    it('sources', function () {
        assert.deepEqual(this.map.sources, [this.path]);
    });
    it('sourceRoot', function () {
        assert(this.map.sourceRoot === undefined);
    });
    it('sourcesContent', function () {
        assert.deepEqual(this.map.sourcesContent, [this.input]);
    });
    it('file', function () {
        assert(this.map.file === undefined);
    });
}


describe('incoming code with SourceMap comment', function() {
    beforeEach(function () {
        this.path = 'test/fixtures/with-sourcemap.js';
        this.input = fs.readFileSync('test/fixtures/with-sourcemap.js', 'utf8'),
        this.output = espowerSource(this.input, this.path);
        this.map = convert.fromSource(this.output).toObject();
    });

    it('should return a string', function() {
        assert.equal(typeof this.output, 'string');
    });

    it('should transform source', function() {
        var expected = fs.readFileSync('test/expected/with-sourcemap.js', 'utf8');
        assert.equal(this.output, expected);
    });

    describe('generated sourceMap', function() {
        it('version', function () {
            assert.equal(this.map.version, 3);
        });
        it('sources', function () {
            assert.deepEqual(this.map.sources, ['/absolute/path/to/coffee_script_test.coffee']);
        });
        it('sourceRoot', function () {
            assert(this.map.sourceRoot === undefined);
        });
        it('sourcesContent', function () {
            assert.deepEqual(this.map.sourcesContent, [
                [
                    'assert = require \'power-assert\'',
                    '',
                    'class Person',
                    '  constructor: (name, age) ->',
                    '    @name = name',
                    '    @age = age',
                    '',
                    'describe "various types", ->',
                    '  beforeEach ->',
                    '    @types = [',
                    '      "string"',
                    '      98.6',
                    '      true',
                    '      false',
                    '      null',
                    '      `undefined`',
                    '      [',
                    '        "nested"',
                    '        "array"',
                    '      ]',
                    '      {',
                    '        object: true',
                    '      }',
                    '      NaN',
                    '      Infinity',
                    '      /^not/',
                    '      new Person("alice", 3)',
                    '    ]',
                    '',
                    '  it "demo", ->',
                    '    index = @types.length - 1',
                    '    bob = new Person("bob", 5)',
                    '    assert @types[index].name is bob.name',
                    ''
                ].join('\n')
            ]);
        });
        it('file', function () {
            assert(this.map.file === undefined);
        });
        it('names', function () {
            assert.deepEqual(this.map.names, []);
        });
        it('mappings', function () {
            assert.equal(this.map.mappings, 'AAAA,IAAA,qBAAA;AAAA,aAAA,mBAAA;AAAA,aAAA,QAAA;AAAA;AAAA,IAAA,mBAAA,CAAA,SAAA,CAAA,KAAA,YAAA,KAAA,CAAA,KAAA,EAAA,MAAA;AAAA,aAAA,QAAA,CAAA,IAAA;AAAA,YAAA,KAAA,EAAA,KAAA;AAAA,YAAA,MAAA,EAAA,MAAA;AAAA;AAAA,eAAA,KAAA;AAAA;AAAA,IAAA,mBAAA,CAAA,SAAA,CAAA,KAAA,YAAA,KAAA,CAAA,KAAA,EAAA,MAAA;AAAA;AAAA,YAAA,kBAAA;AAAA,gBAAA,KAAA,EAAA,KAAA;AAAA,gBAAA,MAAA,OAAA,QAAA;AAAA;AAAA,YAAA,MAAA,EAAA,MAAA;AAAA;AAAA;AAAA,WAAA,mBAAA;AAAA;AAAA,IAAA,MAAA,EAAA,MAAA;AAAA,MAAA,GAAS,OAAA,CAAQ,cAAR,CAAT,CAAA;AAAA,MAAA,GAAA,YAAA;AAAA,IAGe,SAAA,MAAA,CAAC,IAAD,EAAO,GAAP,EAAA;AAAA,QACX,KAAC,IAAD,GAAQ,IAAR,CADW;AAAA,QAEX,KAAC,GAAD,GAAO,GAAP,CAFW;AAAA,KAHf;AAAA,kBAAA;AAAA,CAAA,EAAA,CAAA;AAAA,QAAA,CAOS,eAPT,EAO0B,YAAA;AAAA,IACxB,UAAA,CAAW,YAAA;AAAA,eACT,KAAC,KAAD,GAAS;AAAA,YACP,QADO;AAAA,YAEP,IAFO;AAAA,YAGP,IAHO;AAAA,YAIP,KAJO;AAAA,YAKP,IALO;AAAA,YAMP,SANO;AAAA,YAOP;AAAA,gBACE,QADF;AAAA,gBAEE,OAFF;AAAA,aAPO;AAAA,YAWP,EACE,MAAA,EAAQ,IADV,EAXO;AAAA,YAcP,GAdO;AAAA,YAeP,QAfO;AAAA,YAgBP,MAhBO;AAAA,YAiBH,IAAA,MAAA,CAAO,OAAP,EAAgB,CAAhB,CAjBG;AAAA,UADA;AAAA,KAAX,EADwB;AAAA,WAsBxB,EAAA,CAAG,MAAH,EAAW,YAAA;AAAA,QAGF,IAAA,KAAA,OAAA,qBAAA,GAHE;AAAA,QACT,IAAA,GAAA,EAAA,KAAA,CADS;AAAA,QACT,KAAA,GAAQ,KAAC,KAAD,CAAO,MAAP,GAAgB,CAAxB,CADS;AAAA,QAET,GAAA,GAAU,IAAA,MAAA,CAAO,KAAP,EAAc,CAAd,CAAV,CAFS;AAAA,eAGT,MAAA,CAAO,KAAA,CAAA,KAAA,CAAA,KAAA,CAAA,KAAA,CAAA,KAAA,CAAA,KAAA,CAAA,KAAA,CAAA,KAAA,CAAA,KAAA,CAAA,KAAA,MAAC,KAAD,oCAAA,KAAO,CAAA,KAAA,CAAA,KAAA,qCAAP,8BAAc,IAAd,0BAAA,KAAsB,CAAA,KAAA,CAAtB,KAAsB,CAAA,KAAA,CAAA,GAAA,8BAAI,IAAJ,sBAAtB;AAAA,YAAA,OAAA;AAAA,YAAA,QAAA;AAAA,YAAA,IAAA;AAAA,UAAP,EAHS;AAAA,KAAX,EAtBwB;AAAA,CAP1B');
        });
    });

    describe('consuming generated sourceMap', function () {
        beforeEach(function () {
            this.consumer = new sourceMap.SourceMapConsumer(this.map);
            var mappings = [];
            this.consumer.eachMapping(function (mapping) {
                mappings.push(mapping);
            });
            this.mappings = mappings;
        });
        it('mapping count', function () {
            assert.equal(this.mappings.length, 312);
        });
        it('mapping with names', function () {
            var withNames = this.mappings.filter(function (mapping) { return mapping.name; });
            assert.equal(withNames.length, 0);
        });
        it('originalPosition', function () {
            // name
            assert.deepEqual(this.consumer.generatedPositionFor({
                source:'/absolute/path/to/coffee_script_test.coffee',
                line:4,
                column:16
            }), {
                line:26,
                column:20,
                lastColumn: null
            });

            assert.deepEqual(this.consumer.originalPositionFor({line:26,column:4}),
                             {source:'/absolute/path/to/coffee_script_test.coffee',line:4,column:15,name:null});

            assert.deepEqual(this.consumer.originalPositionFor({line:54,column:8}),
                             {source:'/absolute/path/to/coffee_script_test.coffee',line:31,column:4,name:null});

            assert.deepEqual(this.consumer.originalPositionFor({line:57,column:15}),
                             {source:'/absolute/path/to/coffee_script_test.coffee',line:33,column:4,name:null});
        });
    });
});


describe('parameter prerequisites', function () {
    var code = 'var str = "foo";\nvar anotherStr = "bar"\n\nassert.equal(\nstr,\nanotherStr\n);';
    var filepath = 'relative/original_test.js';
    var options = {
        patterns: [
            'assert.equal(actual, expected, [message])'
        ]
    };

    it('`originalCode` is mandatory and throw EspowerError when not specified', function () {
        assert.throws(function () {
            espowerSource(null, filepath, options);
        }, espower.EspowerError);
    });

    it('`filepath` is optional', function () {
        assert.doesNotThrow(function () {
            espowerSource(code, null, options);
        });
    });

    it('`options` is optional', function () {
        assert.doesNotThrow(function () {
            espowerSource(code, filepath, null);
        });
    });

    it('does not throw EspowerError when both filepath and options.path are not specified', function () {
        assert.doesNotThrow(function () {
            espowerSource(code, null, options);
        });
    });
});


describe('when filepath is not specified', function () {
    describe('neither filepath nor options.path are not specified', function () {
        beforeEach(function () {
            var input = fs.readFileSync('test/fixtures/example.js', 'utf8');
            this.output = espowerSource(input);
        });
        it('no filepath and sourcemap in output', function () {
            var expected = fs.readFileSync('test/expected/example_without_filepath_and_sourcemap.js', 'utf8');
            assert.equal(this.output, expected);
        });
        it('sourcemap will not be attached', function () {
            var map = convert.fromSource(this.output);
            assert(!map);
        });
    });

    describe('but options.path is given', function () {
        beforeEach(function () {
            var optionsPath = 'test/fixtures/example.js';
            var input = fs.readFileSync('test/fixtures/example.js', 'utf8');
            this.output = espowerSource(input, null, { path: optionsPath });
        });
        it('filepath in output', function () {
            var expected = fs.readFileSync('test/expected/example.js', 'utf8');
            assert.equal(this.output, expected);
        });
        it('sourcemap will be attached', function () {
            var map = convert.fromSource(this.output);
            assert(map);
        });
    });

    describe('and options.path is not specified but inlined sourcemap is given', function () {
        beforeEach(function () {
            var input = fs.readFileSync('test/fixtures/with-sourcemap.js', 'utf8');
            this.output = espowerSource(input);
        });
        it('filepath in output', function () {
            var expectedWithSourceMap = fs.readFileSync('test/expected/with-sourcemap.js', 'utf8');
            var expected = convert.removeComments(expectedWithSourceMap);
            assert.equal(this.output + '\n\n', expected);
        });
        it('sourcemap will not be attached', function () {
            var map = convert.fromSource(this.output);
            assert(!map);
        });
    });

    describe('and options.path is not specified but options.sourceMap is given', function () {
        beforeEach(function () {
            var input = fs.readFileSync('test/fixtures/with-sourcemap.js', 'utf8');
            var sourceMapComment = convert.fromSource(input);
            var bareCode = convert.removeComments(input);
            this.output = espowerSource(bareCode, null, { sourceMap: sourceMapComment.toObject() });
        });
        it('filepath in output', function () {
            var expectedWithSourceMap = fs.readFileSync('test/expected/with-sourcemap.js', 'utf8');
            var expected = convert.removeComments(expectedWithSourceMap);
            assert.equal(this.output + '\n\n', expected);
        });
        it('sourcemap will not be attached', function () {
            var map = convert.fromSource(this.output);
            assert(!map);
        });
    });
});


describe('empty and blank files', function() {
    it('when file content is empty', function() {
        var output = espowerSource('', 'path/to/test.js');
        assert.equal(typeof output, 'string');
        assert.equal(output, '\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiJ9\n');
    });
    it('when file content is blank', function() {
        var output = espowerSource('  \n  \n', 'path/to/test.js');
        assert.equal(typeof output, 'string');
        assert.equal(output, '\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbXX0=\n');
    });
});

describe('syntax error handling', function() {
    var source = [
        "var a = 1;",
        "var b = 2;",
        "var c = 3;",
        "", // test empty line
        "var e = 5;",
        "var f = 6;",
        "syntax error at line 7",
        "var g = 8;",
        "var h = 9;",
        "var i = 10;",
        "var j = 11;",
        "var k = 12;",
        "var l = 13;"].join('\n');

    it('can generate SyntaxError with custom message with 10 lines surrounding the line', function() {
        var error;
        try {
            espowerSource(source, "dummy.js");
        } catch(e) {
            error = e;
        }
        assert(error instanceof SyntaxError);
        assert.notEqual(error.message.indexOf('     2: var b = 2;'), -1);
        assert.notEqual(error.message.indexOf('     4: '), -1);
        assert.notEqual(error.message.indexOf('     7: syntax error at line 7'), -1);
        assert.notEqual(error.message.indexOf('       ^'), -1);
        assert.notEqual(error.message.indexOf('    12: var k = 12;'), -1);
    });
});

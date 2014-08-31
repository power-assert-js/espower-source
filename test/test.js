var espowerSource = require('..');
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
        this.expected = fs.readFileSync('test/expected/example.js', 'utf8');
    });

    it('should return a string', function() {
        assert.equal(typeof this.output, 'string');
    });

    it('should transform source', function() {
        assert.equal(this.output, this.expected);
    });

    describe('generated sourceMap', function() {
        testSourceMapCommonAttributes();
        it('names', function () {
            assert.deepEqual(this.map.names, ["assert","require","truthy","falsy","_expr","_capt","content","filepath","line","equal"]);
        });
        it('mappings', function () {
            assert.equal(this.map.mappings, 'AAAA,IAAIA,MAAA,GAASC,OAAA,CAAQ,cAAR,CAAb,EACIC,MAAA,GAAS,MADb,EAEIC,KAAA,GAAQ,OAFZ;AAGAH,MAAA,CAAOA,MAAA,CAAAI,KAAA,CAAAJ,MAAA,CAAAK,KAAA,CAAAF,KAAA;AAAA,IAAAG,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAAP,EAHA;AAIAR,MAAA,CAAOS,KAAP,CAAaT,MAAA,CAAAI,KAAA,CAAAJ,MAAA,CAAAK,KAAA,CAAAH,MAAA;AAAA,IAAAI,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAAb,EAAqBR,MAAA,CAAAI,KAAA,CAAAJ,MAAA,CAAAK,KAAA,CAAAF,KAAA;AAAA,IAAAG,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAArB');
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
            assert.equal(this.mappings.length, 86);
        });
        it('mapping with names', function () {
            var withNames = this.mappings.filter(function (mapping) { return mapping.name; });
            assert.equal(withNames.length, 31);
        });
        it('originalPosition', function () {
            assert.deepEqual(this.consumer.originalPositionFor({line:1,column:4}),
                             {source:'test/fixtures/example.js',line:1,column:4,name:'assert'});
            assert.deepEqual(this.consumer.originalPositionFor({line:1,column:38}),
                             {source:'test/fixtures/example.js',line:2,column:4,name:'truthy'});
            assert.deepEqual(this.consumer.originalPositionFor({line:1,column:55}),
                             {source:'test/fixtures/example.js',line:3,column:4,name:'falsy'});
            assert.deepEqual(this.consumer.originalPositionFor({line:7,column:7}),
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
        this.expected = fs.readFileSync('test/expected/customized.js', 'utf8');
    });

    it('should return a string', function() {
        assert.equal(typeof this.output, 'string');
    });

    it('should transform source', function() {
        assert.equal(this.output, this.expected);
    });

    describe('generated sourceMap', function() {
        testSourceMapCommonAttributes();
        it('names', function () {
            assert.deepEqual(this.map.names, ["empower","require","formatter","busterAssertions","refute","targetMethods","oneArg","twoArgs","truthy","falsy","_expr","_capt","content","filepath","line","isNull","same"]);
        });
        it('mappings', function () {
            assert.equal(this.map.mappings, 'AAAA,IAAIA,OAAA,GAAUC,OAAA,CAAQ,SAAR,CAAd,EACIC,SAAA,GAAYD,OAAA,CAAQ,wBAAR,CADhB,EAEIE,gBAAA,GAAmBF,OAAA,CAAQ,mBAAR,CAFvB,EAGIG,MAAA,GAASJ,OAAA,CAAQG,gBAAA,CAAiBC,MAAzB,EAAiCF,SAAA,EAAjC,EAA8C;AAAA,QAAEG,aAAA,EAAe;AAAA,YAAEC,MAAA,EAAQ,CAAC,QAAD,CAAV;AAAA,YAAsBC,OAAA,EAAS,CAAC,MAAD,CAA/B;AAAA,SAAjB;AAAA,KAA9C,CAHb,EAIIC,MAAA,GAAS,MAJb,EAKIC,KAAA,GAAQ,OALZ;AAMAL,MAAA,CAAOA,MAAA,CAAAM,KAAA,CAAAN,MAAA,CAAAO,KAAA,CAAAH,MAAA;AAAA,IAAAI,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAAP,EANA;AAOAV,MAAA,CAAOW,MAAP,CAAcX,MAAA,CAAAM,KAAA,CAAAN,MAAA,CAAAO,KAAA,CAAAF,KAAA;AAAA,IAAAG,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAAd,EAPA;AAQAV,MAAA,CAAOY,IAAP,CAAYZ,MAAA,CAAAM,KAAA,CAAAN,MAAA,CAAAO,KAAA,CAAAH,MAAA;AAAA,IAAAI,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAAZ,EAAoBV,MAAA,CAAAM,KAAA,CAAAN,MAAA,CAAAO,KAAA,CAAAF,KAAA;AAAA,IAAAG,OAAA;AAAA,IAAAC,QAAA;AAAA,IAAAC,IAAA;AAAA,EAApB');
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
            assert.equal(this.mappings.length, 161);
        });
        it('mapping with names', function () {
            var withNames = this.mappings.filter(function (mapping) { return mapping.name; });
            assert.equal(withNames.length, 53);
        });
        it('originalPosition', function () {
            assert.deepEqual(this.consumer.originalPositionFor({line:1,column:34}),
                             {source:'test/fixtures/customized.js',line:2,column:4,name:'formatter'});
            assert.deepEqual(this.consumer.originalPositionFor({line:1,column:81}),
                             {source:'test/fixtures/customized.js',line:3,column:4,name:'busterAssertions'});
            assert.deepEqual(this.consumer.originalPositionFor({line:1,column:130}),
                             {source:'test/fixtures/customized.js',line:4,column:4,name:'refute'});
            assert.deepEqual(this.consumer.originalPositionFor({line:6,column:8}),
                             {source:'test/fixtures/customized.js',line:5,column:4,name:'truthy'});
            assert.deepEqual(this.consumer.originalPositionFor({line:6,column:25}),
                             {source:'test/fixtures/customized.js',line:6,column:4,name:'falsy'});
            assert.deepEqual(this.consumer.originalPositionFor({line:12,column:7}),
                             {source:'test/fixtures/customized.js',line:8,column:7,name:'isNull'});
            assert.deepEqual(this.consumer.originalPositionFor({line:17,column:7}),
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
        this.expected = fs.readFileSync('test/expected/with-sourcemap.js', 'utf8');
    });

    it('should return a string', function() {
        assert.equal(typeof this.output, 'string');
    });

    it('should transform source', function() {
        assert.equal(this.output, this.expected);
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
            assert.equal(this.map.mappings, 'AAAA,IAAA,MAAA,EAAA,MAAA;AAAA,MAAA,GAAS,OAAA,CAAQ,cAAR,CAAT,CAAA;AAAA,MAAA,GAAA,YAAA;AAAA,IAGe,SAAA,MAAA,CAAC,IAAD,EAAO,GAAP,EAAA;AAAA,QACX,KAAC,IAAD,GAAQ,IAAR,CADW;AAAA,QAEX,KAAC,GAAD,GAAO,GAAP,CAFW;AAAA,KAHf;AAAA,kBAAA;AAAA,CAAA,EAAA,CAAA;AAAA,QAAA,CAOS,eAPT,EAO0B,YAAA;AAAA,IACxB,UAAA,CAAW,YAAA;AAAA,eACT,KAAC,KAAD,GAAS;AAAA,YACP,QADO;AAAA,YAEP,IAFO;AAAA,YAGP,IAHO;AAAA,YAIP,KAJO;AAAA,YAKP,IALO;AAAA,YAMP,SANO;AAAA,YAOP;AAAA,gBACE,QADF;AAAA,gBAEE,OAFF;AAAA,aAPO;AAAA,YAWP,EACE,MAAA,EAAQ,IADV,EAXO;AAAA,YAcP,GAdO;AAAA,YAeP,QAfO;AAAA,YAgBP,MAhBO;AAAA,YAiBH,IAAA,MAAA,CAAO,OAAP,EAAgB,CAAhB,CAjBG;AAAA,UADA;AAAA,KAAX,EADwB;AAAA,WAsBxB,EAAA,CAAG,MAAH,EAAW,YAAA;AAAA,QACT,IAAA,GAAA,EAAA,KAAA,CADS;AAAA,QACT,KAAA,GAAQ,KAAC,KAAD,CAAO,MAAP,GAAgB,CAAxB,CADS;AAAA,QAET,GAAA,GAAU,IAAA,MAAA,CAAO,KAAP,EAAc,CAAd,CAAV,CAFS;AAAA,eAGT,MAAA,CAAO,MAAA,CAAA,KAAA,CAAA,MAAA,CAAA,KAAA,CAAA,MAAA,CAAA,KAAA,CAAA,MAAA,CAAA,KAAA,CAAA,MAAA,CAAA,KAAA,MAAC,KAAD,oCAAO,MAAA,CAAA,KAAA,CAAA,KAAA,qCAAP,8BAAc,IAAd,0BAAsB,MAAA,CAAA,KAAA,CAAA,MAAA,CAAA,KAAA,CAAA,GAAA,8BAAI,IAAJ,sBAAtB;AAAA,YAAA,OAAA;AAAA,YAAA,QAAA;AAAA,YAAA,IAAA;AAAA,UAAP,EAHS;AAAA,KAAX,EAtBwB;AAAA,CAP1B');
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
            assert.equal(this.mappings.length, 223);
        });
        it('mapping with names', function () {
            var withNames = this.mappings.filter(function (mapping) { return mapping.name; });
            assert.equal(withNames.length, 0);
        });
        it('originalPosition', function () {

            assert.deepEqual(this.consumer.generatedPositionFor({
                source:'/absolute/path/to/coffee_script_test.coffee',
                line:4,
                column:16
            }), {
                line:4,
                column:20
            });

            assert.deepEqual(this.consumer.originalPositionFor({line:4,column:4}),
                             {source:'/absolute/path/to/coffee_script_test.coffee',line:4,column:15,name:null});

            assert.deepEqual(this.consumer.originalPositionFor({line:32,column:8}),
                             {source:'/absolute/path/to/coffee_script_test.coffee',line:31,column:4,name:null});

            assert.deepEqual(this.consumer.originalPositionFor({line:34,column:15}),
                             {source:'/absolute/path/to/coffee_script_test.coffee',line:33,column:4,name:null});
        });
    });
});

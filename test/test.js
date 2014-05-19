var sourceToSource = require('..'),
    convert = require('convert-source-map'),
    fs = require('fs'),
    assert = require('assert');

describe('with default options', function() {
    beforeEach(function () {
        this.path = 'test/fixtures/example.js';
        this.input = fs.readFileSync(this.path, 'utf8'),
        this.output = sourceToSource(this.input, this.path);
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
});

describe('with customized options', function() {
    beforeEach(function () {
        this.path = 'test/fixtures/customized.js';
        this.input = fs.readFileSync(this.path, 'utf8'),
        this.output = sourceToSource(this.input, this.path, {
            powerAssertVariableName: 'refute',
            targetMethods: {
                oneArg: [
                    'isNull'
                ],
                twoArgs: [
                    'same'
                ]
            }
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

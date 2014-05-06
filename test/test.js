var sourceToSource = require('..'),
    fs = require('fs'),
    assert = require('assert');

describe('with default options', function() {
    beforeEach(function () {
        var path = 'test/fixtures/example.js',
            jsCode = fs.readFileSync(path, 'utf8');
        this.output = sourceToSource(jsCode, path);
    });
    
    it('should return a string', function() {
        assert.equal(typeof this.output, 'string');
    });
    
    it('should transform source', function() {
        var expected = fs.readFileSync('test/expected/example.js', 'utf8');
        assert.equal(this.output, expected);
    });
});

describe('with customized options', function() {
    beforeEach(function () {
        var path = 'test/fixtures/customized.js',
            jsCode = fs.readFileSync(path, 'utf8');
        this.output = sourceToSource(jsCode, path, {
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
    });
    
    it('should return a string', function() {
        assert.equal(typeof this.output, 'string');
    });
    
    it('should transform source', function() {
        var expected = fs.readFileSync('test/expected/customized.js', 'utf8');
        assert.equal(this.output, expected);
    });
});

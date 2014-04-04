var sourceToSource = require('..'),
    fs = require('fs'),
    expect = require('expect.js');

describe('with default options', function() {
    beforeEach(function () {
        var path = 'test/fixtures/example.js',
            jsCode = fs.readFileSync(path, 'utf8');
        this.output = sourceToSource(jsCode, path);
    });
    
    it('should return a string', function() {
        expect(this.output).to.be.a('string');
    });
    
    it('should transform source', function() {
        var expected = fs.readFileSync('test/expected/example.js', 'utf8');
        expect(this.output).to.be(expected);
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
        expect(this.output).to.be.a('string');
    });
    
    it('should transform source', function() {
        var expected = fs.readFileSync('test/expected/customized.js', 'utf8');
        expect(this.output).to.be(expected);
    });
});

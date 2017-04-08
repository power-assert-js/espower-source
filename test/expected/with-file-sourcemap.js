var _PowerAssertRecorder1 = function () {
    function PowerAssertRecorder() {
        this.captured = [];
    }
    PowerAssertRecorder.prototype._capt = function _capt(value, espath) {
        this.captured.push({
            value: value,
            espath: espath
        });
        return value;
    };
    PowerAssertRecorder.prototype._expr = function _expr(value, source) {
        var capturedValues = this.captured;
        this.captured = [];
        return {
            powerAssertContext: {
                value: value,
                events: capturedValues
            },
            source: source
        };
    };
    return PowerAssertRecorder;
}();
var Person, assert;
assert = require('power-assert');
Person = function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    return Person;
}();
describe('various types', function () {
    beforeEach(function () {
        return this.types = [
            'string',
            98.6,
            true,
            false,
            null,
            undefined,
            [
                'nested',
                'array'
            ],
            { object: true },
            NaN,
            Infinity,
            /^not/,
            new Person('alice', 3)
        ];
    });
    return it('demo', function () {
        var _rec1 = new _PowerAssertRecorder1();
        var bob, index;
        index = this.types.length - 1;
        bob = new Person('bob', 5);
        return assert(_rec1._expr(_rec1._capt(_rec1._capt(_rec1._capt(_rec1._capt(this.types, 'arguments/0/left/object/object')[_rec1._capt(index, 'arguments/0/left/object/property')], 'arguments/0/left/object').name, 'arguments/0/left') === _rec1._capt(_rec1._capt(bob, 'arguments/0/right/object').name, 'arguments/0/right'), 'arguments/0'), {
            content: 'assert(this.types[index].name === bob.name)',
            filepath: 'with-file-sourcemap.coffee',
            line: 33
        }));
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpdGgtZmlsZS1zb3VyY2VtYXAuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEscUJBQUE7QUFBQSxhQUFBLG1CQUFBO0FBQUEsYUFBQSxRQUFBO0FBQUE7QUFBQSxJQUFBLG1CQUFBLENBQUEsU0FBQSxDQUFBLEtBQUEsWUFBQSxLQUFBLENBQUEsS0FBQSxFQUFBLE1BQUE7QUFBQSxhQUFBLFFBQUEsQ0FBQSxJQUFBO0FBQUEsWUFBQSxLQUFBLEVBQUEsS0FBQTtBQUFBLFlBQUEsTUFBQSxFQUFBLE1BQUE7QUFBQTtBQUFBLGVBQUEsS0FBQTtBQUFBO0FBQUEsSUFBQSxtQkFBQSxDQUFBLFNBQUEsQ0FBQSxLQUFBLFlBQUEsS0FBQSxDQUFBLEtBQUEsRUFBQSxNQUFBO0FBQUEsWUFBQSxjQUFBLFFBQUEsUUFBQTtBQUFBLGFBQUEsUUFBQTtBQUFBO0FBQUEsWUFBQSxrQkFBQTtBQUFBLGdCQUFBLEtBQUEsRUFBQSxLQUFBO0FBQUEsZ0JBQUEsTUFBQSxFQUFBLGNBQUE7QUFBQTtBQUFBLFlBQUEsTUFBQSxFQUFBLE1BQUE7QUFBQTtBQUFBO0FBQUEsV0FBQSxtQkFBQTtBQUFBO0FBQUEsSUFBQSxNQUFBLEVBQUEsTUFBQTtBQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsY0FBUixDQUFULENBQUE7QUFBQSxNQUFBLEdBQUEsWUFBQTtBQUFBLElBR2UsU0FBQSxNQUFBLENBQUMsSUFBRCxFQUFPLEdBQVAsRUFBQTtBQUFBLFFBQ1gsS0FBQyxJQUFELEdBQVEsSUFBUixDQURXO0FBQUEsUUFFWCxLQUFDLEdBQUQsR0FBTyxHQUFQLENBRlc7QUFBQSxLQUhmO0FBQUEsa0JBQUE7QUFBQSxDQUFBLEVBQUEsQ0FBQTtBQUFBLFFBQUEsQ0FPUyxlQVBULEVBTzBCLFlBQUE7QUFBQSxJQUN4QixVQUFBLENBQVcsWUFBQTtBQUFBLGVBQ1QsS0FBQyxLQUFELEdBQVM7QUFBQSxZQUNQLFFBRE87QUFBQSxZQUVQLElBRk87QUFBQSxZQUdQLElBSE87QUFBQSxZQUlQLEtBSk87QUFBQSxZQUtQLElBTE87QUFBQSxZQU1QLFNBTk87QUFBQSxZQU9QO0FBQUEsZ0JBQ0UsUUFERjtBQUFBLGdCQUVFLE9BRkY7QUFBQSxhQVBPO0FBQUEsWUFXUCxFQUNFLE1BQUEsRUFBUSxJQURWLEVBWE87QUFBQSxZQWNQLEdBZE87QUFBQSxZQWVQLFFBZk87QUFBQSxZQWdCUCxNQWhCTztBQUFBLFlBaUJILElBQUEsTUFBQSxDQUFPLE9BQVAsRUFBZ0IsQ0FBaEIsQ0FqQkc7QUFBQSxVQURBO0FBQUEsS0FBWCxFQUR3QjtBQUFBLFdBc0J4QixFQUFBLENBQUcsTUFBSCxFQUFXLFlBQUE7QUFBQSxRQUdGLElBQUEsS0FBQSxPQUFBLHFCQUFBLEdBSEU7QUFBQSxRQUNULElBQUEsR0FBQSxFQUFBLEtBQUEsQ0FEUztBQUFBLFFBQ1QsS0FBQSxHQUFRLEtBQUMsS0FBRCxDQUFPLE1BQVAsR0FBZ0IsQ0FBeEIsQ0FEUztBQUFBLFFBRVQsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUFPLEtBQVAsRUFBYyxDQUFkLENBQVYsQ0FGUztBQUFBLGVBR1QsTUFBQSxDQUFPLEtBQUEsQ0FBQSxLQUFBLENBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsS0FBQSxDQUFBLEtBQUEsTUFBQyxLQUFELG9DQUFBLEtBQU8sQ0FBQSxLQUFBLENBQUEsS0FBQSxxQ0FBUCw4QkFBYyxJQUFkLDBCQUFBLEtBQXNCLENBQUEsS0FBQSxDQUF0QixLQUFzQixDQUFBLEtBQUEsQ0FBQSxHQUFBLDhCQUFJLElBQUosc0JBQXRCO0FBQUEsWUFBQSxPQUFBO0FBQUEsWUFBQSxRQUFBO0FBQUEsWUFBQSxJQUFBO0FBQUEsVUFBUCxFQUhTO0FBQUEsS0FBWCxFQXRCd0I7QUFBQSxDQVAxQiIsInNvdXJjZXNDb250ZW50IjpbImFzc2VydCA9IHJlcXVpcmUgJ3Bvd2VyLWFzc2VydCdcblxuY2xhc3MgUGVyc29uXG4gIGNvbnN0cnVjdG9yOiAobmFtZSwgYWdlKSAtPlxuICAgIEBuYW1lID0gbmFtZVxuICAgIEBhZ2UgPSBhZ2VcblxuZGVzY3JpYmUgXCJ2YXJpb3VzIHR5cGVzXCIsIC0+XG4gIGJlZm9yZUVhY2ggLT5cbiAgICBAdHlwZXMgPSBbXG4gICAgICBcInN0cmluZ1wiXG4gICAgICA5OC42XG4gICAgICB0cnVlXG4gICAgICBmYWxzZVxuICAgICAgbnVsbFxuICAgICAgYHVuZGVmaW5lZGBcbiAgICAgIFtcbiAgICAgICAgXCJuZXN0ZWRcIlxuICAgICAgICBcImFycmF5XCJcbiAgICAgIF1cbiAgICAgIHtcbiAgICAgICAgb2JqZWN0OiB0cnVlXG4gICAgICB9XG4gICAgICBOYU5cbiAgICAgIEluZmluaXR5XG4gICAgICAvXm5vdC9cbiAgICAgIG5ldyBQZXJzb24oXCJhbGljZVwiLCAzKVxuICAgIF1cblxuICBpdCBcImRlbW9cIiwgLT5cbiAgICBpbmRleCA9IEB0eXBlcy5sZW5ndGggLSAxXG4gICAgYm9iID0gbmV3IFBlcnNvbihcImJvYlwiLCA1KVxuICAgIGFzc2VydCBAdHlwZXNbaW5kZXhdLm5hbWUgaXMgYm9iLm5hbWVcbiJdfQ==

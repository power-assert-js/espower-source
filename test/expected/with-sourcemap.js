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
            filepath: 'coffee_script_test.coffee',
            line: 33
        }));
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9hYnNvbHV0ZS9wYXRoL3RvL2NvZmZlZV9zY3JpcHRfdGVzdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxxQkFBQTtBQUFBLGFBQUEsbUJBQUE7QUFBQSxhQUFBLFFBQUE7QUFBQTtBQUFBLElBQUEsbUJBQUEsQ0FBQSxTQUFBLENBQUEsS0FBQSxZQUFBLEtBQUEsQ0FBQSxLQUFBLEVBQUEsTUFBQTtBQUFBLGFBQUEsUUFBQSxDQUFBLElBQUE7QUFBQSxZQUFBLEtBQUEsRUFBQSxLQUFBO0FBQUEsWUFBQSxNQUFBLEVBQUEsTUFBQTtBQUFBO0FBQUEsZUFBQSxLQUFBO0FBQUE7QUFBQSxJQUFBLG1CQUFBLENBQUEsU0FBQSxDQUFBLEtBQUEsWUFBQSxLQUFBLENBQUEsS0FBQSxFQUFBLE1BQUE7QUFBQSxZQUFBLGNBQUEsUUFBQSxRQUFBO0FBQUEsYUFBQSxRQUFBO0FBQUE7QUFBQSxZQUFBLGtCQUFBO0FBQUEsZ0JBQUEsS0FBQSxFQUFBLEtBQUE7QUFBQSxnQkFBQSxNQUFBLEVBQUEsY0FBQTtBQUFBO0FBQUEsWUFBQSxNQUFBLEVBQUEsTUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFBLG1CQUFBO0FBQUE7QUFBQSxJQUFBLE1BQUEsRUFBQSxNQUFBO0FBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxjQUFSLENBQVQsQ0FBQTtBQUFBLE1BQUEsR0FBQSxZQUFBO0FBQUEsSUFHZSxTQUFBLE1BQUEsQ0FBQyxJQUFELEVBQU8sR0FBUCxFQUFBO0FBQUEsUUFDWCxLQUFDLElBQUQsR0FBUSxJQUFSLENBRFc7QUFBQSxRQUVYLEtBQUMsR0FBRCxHQUFPLEdBQVAsQ0FGVztBQUFBLEtBSGY7QUFBQSxrQkFBQTtBQUFBLENBQUEsRUFBQSxDQUFBO0FBQUEsUUFBQSxDQU9TLGVBUFQsRUFPMEIsWUFBQTtBQUFBLElBQ3hCLFVBQUEsQ0FBVyxZQUFBO0FBQUEsZUFDVCxLQUFDLEtBQUQsR0FBUztBQUFBLFlBQ1AsUUFETztBQUFBLFlBRVAsSUFGTztBQUFBLFlBR1AsSUFITztBQUFBLFlBSVAsS0FKTztBQUFBLFlBS1AsSUFMTztBQUFBLFlBTVAsU0FOTztBQUFBLFlBT1A7QUFBQSxnQkFDRSxRQURGO0FBQUEsZ0JBRUUsT0FGRjtBQUFBLGFBUE87QUFBQSxZQVdQLEVBQ0UsTUFBQSxFQUFRLElBRFYsRUFYTztBQUFBLFlBY1AsR0FkTztBQUFBLFlBZVAsUUFmTztBQUFBLFlBZ0JQLE1BaEJPO0FBQUEsWUFpQkgsSUFBQSxNQUFBLENBQU8sT0FBUCxFQUFnQixDQUFoQixDQWpCRztBQUFBLFVBREE7QUFBQSxLQUFYLEVBRHdCO0FBQUEsV0FzQnhCLEVBQUEsQ0FBRyxNQUFILEVBQVcsWUFBQTtBQUFBLFFBR0YsSUFBQSxLQUFBLE9BQUEscUJBQUEsR0FIRTtBQUFBLFFBQ1QsSUFBQSxHQUFBLEVBQUEsS0FBQSxDQURTO0FBQUEsUUFDVCxLQUFBLEdBQVEsS0FBQyxLQUFELENBQU8sTUFBUCxHQUFnQixDQUF4QixDQURTO0FBQUEsUUFFVCxHQUFBLEdBQVUsSUFBQSxNQUFBLENBQU8sS0FBUCxFQUFjLENBQWQsQ0FBVixDQUZTO0FBQUEsZUFHVCxNQUFBLENBQU8sS0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBLENBQUEsS0FBQSxNQUFDLEtBQUQsb0NBQUEsS0FBTyxDQUFBLEtBQUEsQ0FBQSxLQUFBLHFDQUFQLDhCQUFjLElBQWQsMEJBQUEsS0FBc0IsQ0FBQSxLQUFBLENBQXRCLEtBQXNCLENBQUEsS0FBQSxDQUFBLEdBQUEsOEJBQUksSUFBSixzQkFBdEI7QUFBQSxZQUFBLE9BQUE7QUFBQSxZQUFBLFFBQUE7QUFBQSxZQUFBLElBQUE7QUFBQSxVQUFQLEVBSFM7QUFBQSxLQUFYLEVBdEJ3QjtBQUFBLENBUDFCIiwic291cmNlc0NvbnRlbnQiOlsiYXNzZXJ0ID0gcmVxdWlyZSAncG93ZXItYXNzZXJ0J1xuXG5jbGFzcyBQZXJzb25cbiAgY29uc3RydWN0b3I6IChuYW1lLCBhZ2UpIC0+XG4gICAgQG5hbWUgPSBuYW1lXG4gICAgQGFnZSA9IGFnZVxuXG5kZXNjcmliZSBcInZhcmlvdXMgdHlwZXNcIiwgLT5cbiAgYmVmb3JlRWFjaCAtPlxuICAgIEB0eXBlcyA9IFtcbiAgICAgIFwic3RyaW5nXCJcbiAgICAgIDk4LjZcbiAgICAgIHRydWVcbiAgICAgIGZhbHNlXG4gICAgICBudWxsXG4gICAgICBgdW5kZWZpbmVkYFxuICAgICAgW1xuICAgICAgICBcIm5lc3RlZFwiXG4gICAgICAgIFwiYXJyYXlcIlxuICAgICAgXVxuICAgICAge1xuICAgICAgICBvYmplY3Q6IHRydWVcbiAgICAgIH1cbiAgICAgIE5hTlxuICAgICAgSW5maW5pdHlcbiAgICAgIC9ebm90L1xuICAgICAgbmV3IFBlcnNvbihcImFsaWNlXCIsIDMpXG4gICAgXVxuXG4gIGl0IFwiZGVtb1wiLCAtPlxuICAgIGluZGV4ID0gQHR5cGVzLmxlbmd0aCAtIDFcbiAgICBib2IgPSBuZXcgUGVyc29uKFwiYm9iXCIsIDUpXG4gICAgYXNzZXJ0IEB0eXBlc1tpbmRleF0ubmFtZSBpcyBib2IubmFtZVxuIl19

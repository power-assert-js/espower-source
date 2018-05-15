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
var _rec2 = new _PowerAssertRecorder1();
var _rec3 = new _PowerAssertRecorder1();
import assert from 'power-assert';
const urls = [
    'https://github.com/tc39/proposal-object-rest-spread',
    'https://github.com/tc39/proposal-regexp-lookbehind',
    'https://github.com/tc39/proposal-regexp-unicode-property-escapes',
    'https://github.com/tc39/proposal-promise-finally',
    'https://github.com/tc39/proposal-async-iteration'
];
async function* ait() {
    for (const url of urls) {
        console.log(`Fetching: ${ url }`);
        const response = await fetch(url);
        const iterable = response.text();
        yield iterable;
    }
}
async function b() {
    var _rec1 = new _PowerAssertRecorder1();
    for await (const x of ait()) {
        const title = x.match(/<title>(.+)<\/title>/)[1];
        assert(_rec1._expr(_rec1._capt(title, 'arguments/0'), {
            content: 'assert(title)',
            filepath: 'test/fixtures/es2018.js',
            line: 23,
            async: true
        }));
    }
}
b();
const obj = {
    a: 1,
    b: 2
};
assert.deepStrictEqual(_rec2._expr(_rec2._capt({
    ..._rec2._capt(obj, 'arguments/0/properties/0/argument'),
    c: 3
}, 'arguments/0'), {
    content: 'assert.deepStrictEqual({...obj,c: 3}, {a: 1,b: 2,c: 3})',
    filepath: 'test/fixtures/es2018.js',
    line: 30
}), _rec3._expr(_rec3._capt({
    a: 1,
    b: 2,
    c: 3
}, 'arguments/1'), {
    content: 'assert.deepStrictEqual({...obj,c: 3}, {a: 1,b: 2,c: 3})',
    filepath: 'test/fixtures/es2018.js',
    line: 30
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZml4dHVyZXMvZXMyMDE4LmpzIl0sIm5hbWVzIjpbIl9Qb3dlckFzc2VydFJlY29yZGVyMSIsIlBvd2VyQXNzZXJ0UmVjb3JkZXIiLCJjYXB0dXJlZCIsInByb3RvdHlwZSIsIl9jYXB0IiwidmFsdWUiLCJlc3BhdGgiLCJwdXNoIiwiX2V4cHIiLCJzb3VyY2UiLCJjYXB0dXJlZFZhbHVlcyIsInBvd2VyQXNzZXJ0Q29udGV4dCIsImV2ZW50cyIsIl9yZWMyIiwiX3JlYzMiLCJhc3NlcnQiLCJ1cmxzIiwiYWl0IiwidXJsIiwiY29uc29sZSIsImxvZyIsInJlc3BvbnNlIiwiZmV0Y2giLCJpdGVyYWJsZSIsInRleHQiLCJiIiwiX3JlYzEiLCJ4IiwidGl0bGUiLCJtYXRjaCIsImNvbnRlbnQiLCJmaWxlcGF0aCIsImxpbmUiLCJhc3luYyIsIm9iaiIsImEiLCJkZWVwU3RyaWN0RXF1YWwiLCJjIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFBQSxxQkFBQTtBQUFBLGFBQUFDLG1CQUFBO0FBQUEsYUFBQUMsUUFBQTtBQUFBO0FBQUEsSUFBQUQsbUJBQUEsQ0FBQUUsU0FBQSxDQUFBQyxLQUFBLFlBQUFBLEtBQUEsQ0FBQUMsS0FBQSxFQUFBQyxNQUFBO0FBQUEsYUFBQUosUUFBQSxDQUFBSyxJQUFBO0FBQUEsWUFBQUYsS0FBQSxFQUFBQSxLQUFBO0FBQUEsWUFBQUMsTUFBQSxFQUFBQSxNQUFBO0FBQUE7QUFBQSxlQUFBRCxLQUFBO0FBQUE7QUFBQSxJQUFBSixtQkFBQSxDQUFBRSxTQUFBLENBQUFLLEtBQUEsWUFBQUEsS0FBQSxDQUFBSCxLQUFBLEVBQUFJLE1BQUE7QUFBQSxZQUFBQyxjQUFBLFFBQUFSLFFBQUE7QUFBQSxhQUFBQSxRQUFBO0FBQUE7QUFBQSxZQUFBUyxrQkFBQTtBQUFBLGdCQUFBTixLQUFBLEVBQUFBLEtBQUE7QUFBQSxnQkFBQU8sTUFBQSxFQUFBRixjQUFBO0FBQUE7QUFBQSxZQUFBRCxNQUFBLEVBQUFBLE1BQUE7QUFBQTtBQUFBO0FBQUEsV0FBQVIsbUJBQUE7QUFBQTtBQTZCdUIsSUFBQVksS0FBQSxPQUFBYixxQkFBQSxHQTdCdkI7QUE2QnlDLElBQUFjLEtBQUEsT0FBQWQscUJBQUEsR0E3QnpDO0FBQUEsT0FBT2UsTUFBUCxNQUFtQixjQUFuQjtBQUVBLE1BQU1DLElBQUEsR0FBTztBQUFBLElBQ1QscURBRFM7QUFBQSxJQUVULG9EQUZTO0FBQUEsSUFHVCxrRUFIUztBQUFBLElBSVQsa0RBSlM7QUFBQSxJQUtULGtEQUxTO0FBQUEsQ0FBYixDQUZBO0FBVUEsZ0JBQWlCQyxHQUFqQixHQUF3QjtBQUFBLElBQ3BCLFdBQVdDLEdBQVgsSUFBa0JGLElBQWxCLEVBQXdCO0FBQUEsUUFDcEJHLE9BQUEsQ0FBUUMsR0FBUixDQUFZLENBQUMsVUFBRCxHQUFhRixHQUFiLEdBQVosRUFEb0I7QUFBQSxRQUVwQixNQUFNRyxRQUFBLEdBQVcsTUFBTUMsS0FBQSxDQUFNSixHQUFOLENBQXZCLENBRm9CO0FBQUEsUUFHcEIsTUFBTUssUUFBQSxHQUFXRixRQUFBLENBQVNHLElBQVQsRUFBakIsQ0FIb0I7QUFBQSxRQUlwQixNQUFNRCxRQUFOLENBSm9CO0FBQUEsS0FESjtBQUFBLENBVnhCO0FBbUJBLGVBQWVFLENBQWYsR0FBb0I7QUFBQSxJQUdMLElBQUFDLEtBQUEsT0FBQTFCLHFCQUFBLEdBSEs7QUFBQSxJQUNoQixXQUFpQjJCLENBQWpCLElBQXNCVixHQUFBLEVBQXRCLEVBQTZCO0FBQUEsUUFDekIsTUFBTVcsS0FBQSxHQUFRRCxDQUFBLENBQUVFLEtBQUYsQ0FBUSxzQkFBUixFQUFnQyxDQUFoQyxDQUFkLENBRHlCO0FBQUEsUUFFekJkLE1BQUEsQ0FBT1csS0FBQSxDQUFBbEIsS0FBQSxDQUFBa0IsS0FBQSxDQUFBdEIsS0FBQSxDQUFBd0IsS0FBQTtBQUFBLFlBQUFFLE9BQUE7QUFBQSxZQUFBQyxRQUFBO0FBQUEsWUFBQUMsSUFBQTtBQUFBLFlBQUFDLEtBQUE7QUFBQSxVQUFQLEVBRnlCO0FBQUEsS0FEYjtBQUFBLENBbkJwQjtBQTBCQVIsQ0FBQSxHQTFCQTtBQTRCQSxNQUFNUyxHQUFBLEdBQU07QUFBQSxJQUFFQyxDQUFBLEVBQUcsQ0FBTDtBQUFBLElBQVFWLENBQUEsRUFBRyxDQUFYO0FBQUEsQ0FBWixDQTVCQTtBQTZCQVYsTUFBQSxDQUFPcUIsZUFBUCxDQUF1QnZCLEtBQUEsQ0FBQUwsS0FBQSxDQUFBSyxLQUFBLENBQUFULEtBQUE7QUFBQSxJQUFFLEdBQUZTLEtBQUssQ0FBQVQsS0FBQSxDQUFBOEIsR0FBQSxzQ0FBTDtBQUFBLElBQVVHLENBQUEsRUFBRyxDQUFiO0FBQUE7QUFBQSxJQUFBUCxPQUFBO0FBQUEsSUFBQUMsUUFBQTtBQUFBLElBQUFDLElBQUE7QUFBQSxFQUF2QixFQUF5Q2xCLEtBQUEsQ0FBQU4sS0FBQSxDQUFBTSxLQUFBLENBQUFWLEtBQUE7QUFBQSxJQUFFK0IsQ0FBQSxFQUFHLENBQUw7QUFBQSxJQUFRVixDQUFBLEVBQUcsQ0FBWDtBQUFBLElBQWNZLENBQUEsRUFBRyxDQUFqQjtBQUFBO0FBQUEsSUFBQVAsT0FBQTtBQUFBLElBQUFDLFFBQUE7QUFBQSxJQUFBQyxJQUFBO0FBQUEsRUFBekMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5cbmNvbnN0IHVybHMgPSBbXG4gICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9iamVjdC1yZXN0LXNwcmVhZCcsXG4gICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXJlZ2V4cC1sb29rYmVoaW5kJyxcbiAgICAnaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcmVnZXhwLXVuaWNvZGUtcHJvcGVydHktZXNjYXBlcycsXG4gICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtZmluYWxseScsXG4gICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWFzeW5jLWl0ZXJhdGlvbidcbl07XG5cbmFzeW5jIGZ1bmN0aW9uICogYWl0ICgpIHtcbiAgICBmb3IgKGNvbnN0IHVybCBvZiB1cmxzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGluZzogJHt1cmx9YCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgICAgY29uc3QgaXRlcmFibGUgPSByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIHlpZWxkIGl0ZXJhYmxlO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gYiAoKSB7XG4gICAgZm9yIGF3YWl0IChjb25zdCB4IG9mIGFpdCgpKSB7XG4gICAgICAgIGNvbnN0IHRpdGxlID0geC5tYXRjaCgvPHRpdGxlPiguKyk8XFwvdGl0bGU+LylbMV07XG4gICAgICAgIGFzc2VydCh0aXRsZSk7XG4gICAgfVxufVxuXG5iKCk7XG5cbmNvbnN0IG9iaiA9IHsgYTogMSwgYjogMiB9O1xuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCh7IC4uLm9iaiwgYzogMyB9LCB7IGE6IDEsIGI6IDIsIGM6IDMgfSk7XG4iXX0=

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZml4dHVyZXMvZXMyMDE4LmpzIl0sIm5hbWVzIjpbIl9Qb3dlckFzc2VydFJlY29yZGVyMSIsIlBvd2VyQXNzZXJ0UmVjb3JkZXIiLCJjYXB0dXJlZCIsInByb3RvdHlwZSIsIl9jYXB0IiwidmFsdWUiLCJlc3BhdGgiLCJwdXNoIiwiX2V4cHIiLCJzb3VyY2UiLCJjYXB0dXJlZFZhbHVlcyIsInBvd2VyQXNzZXJ0Q29udGV4dCIsImV2ZW50cyIsIl9yZWMyIiwiX3JlYzMiLCJhc3NlcnQiLCJ1cmxzIiwiYWl0IiwidXJsIiwiY29uc29sZSIsImxvZyIsInJlc3BvbnNlIiwiZmV0Y2giLCJpdGVyYWJsZSIsInRleHQiLCJiIiwiX3JlYzEiLCJ4IiwidGl0bGUiLCJtYXRjaCIsImNvbnRlbnQiLCJmaWxlcGF0aCIsImxpbmUiLCJhc3luYyIsIm9iaiIsImEiLCJkZWVwU3RyaWN0RXF1YWwiLCJjIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFBQSxxQkFBQTtBQUFBLGFBQUFDLG1CQUFBO0FBQUEsYUFBQUMsUUFBQTtBQUFBO0FBQUEsSUFBQUQsbUJBQUEsQ0FBQUUsU0FBQSxDQUFBQyxLQUFBLFlBQUFBLEtBQUEsQ0FBQUMsS0FBQSxFQUFBQyxNQUFBO0FBQUEsYUFBQUosUUFBQSxDQUFBSyxJQUFBO0FBQUEsWUFBQUYsS0FBQSxFQUFBQSxLQUFBO0FBQUEsWUFBQUMsTUFBQSxFQUFBQSxNQUFBO0FBQUE7QUFBQSxlQUFBRCxLQUFBO0FBQUE7QUFBQSxJQUFBSixtQkFBQSxDQUFBRSxTQUFBLENBQUFLLEtBQUEsWUFBQUEsS0FBQSxDQUFBSCxLQUFBLEVBQUFJLE1BQUE7QUFBQSxZQUFBQyxjQUFBLFFBQUFSLFFBQUE7QUFBQSxhQUFBQSxRQUFBO0FBQUE7QUFBQSxZQUFBUyxrQkFBQTtBQUFBLGdCQUFBTixLQUFBLEVBQUFBLEtBQUE7QUFBQSxnQkFBQU8sTUFBQSxFQUFBRixjQUFBO0FBQUE7QUFBQSxZQUFBRCxNQUFBLEVBQUFBLE1BQUE7QUFBQTtBQUFBO0FBQUEsV0FBQVIsbUJBQUE7QUFBQTtBQTZCdUIsSUFBQVksS0FBQSxPQUFBYixxQkFBQSxHQTdCdkI7QUE2QnlDLElBQUFjLEtBQUEsT0FBQWQscUJBQUEsR0E3QnpDO0FBQUEsT0FBT2UsTUFBUCxNQUFtQixjQUFuQjtBQUVBLE1BQU1DLElBQUEsR0FBTztBQUFBLElBQ1QscURBRFM7QUFBQSxJQUVULG9EQUZTO0FBQUEsSUFHVCxrRUFIUztBQUFBLElBSVQsa0RBSlM7QUFBQSxJQUtULGtEQUxTO0FBQUEsQ0FBYixDQUZBO0FBVUEsZ0JBQWlCQyxHQUFqQixHQUF3QjtBQUFBLElBQ3BCLFdBQVdDLEdBQVgsSUFBa0JGLElBQWxCLEVBQXdCO0FBQUEsUUFDcEJHLE9BQUEsQ0FBUUMsR0FBUixDQUFZLENBQUMsVUFBRCxHQUFhRixHQUFiLEdBQVosRUFEb0I7QUFBQSxRQUVwQixNQUFNRyxRQUFBLEdBQVcsTUFBTUMsS0FBQSxDQUFNSixHQUFOLENBQXZCLENBRm9CO0FBQUEsUUFHcEIsTUFBTUssUUFBQSxHQUFXRixRQUFBLENBQVNHLElBQVQsRUFBakIsQ0FIb0I7QUFBQSxRQUlwQixNQUFNRCxRQUFOLENBSm9CO0FBQUEsS0FESjtBQUFBLENBVnhCO0FBbUJBLGVBQWVFLENBQWYsR0FBb0I7QUFBQSxJQUdMLElBQUFDLEtBQUEsT0FBQTFCLHFCQUFBLEdBSEs7QUFBQSxJQUNoQixpQkFBaUIyQixDQUFqQixJQUFzQlYsR0FBQSxFQUF0QixFQUE2QjtBQUFBLFFBQ3pCLE1BQU1XLEtBQUEsR0FBUUQsQ0FBQSxDQUFFRSxLQUFGLENBQVEsc0JBQVIsRUFBZ0MsQ0FBaEMsQ0FBZCxDQUR5QjtBQUFBLFFBRXpCZCxNQUFBLENBQU9XLEtBQUEsQ0FBQWxCLEtBQUEsQ0FBQWtCLEtBQUEsQ0FBQXRCLEtBQUEsQ0FBQXdCLEtBQUE7QUFBQSxZQUFBRSxPQUFBO0FBQUEsWUFBQUMsUUFBQTtBQUFBLFlBQUFDLElBQUE7QUFBQSxZQUFBQyxLQUFBO0FBQUEsVUFBUCxFQUZ5QjtBQUFBLEtBRGI7QUFBQSxDQW5CcEI7QUEwQkFSLENBQUEsR0ExQkE7QUE0QkEsTUFBTVMsR0FBQSxHQUFNO0FBQUEsSUFBRUMsQ0FBQSxFQUFHLENBQUw7QUFBQSxJQUFRVixDQUFBLEVBQUcsQ0FBWDtBQUFBLENBQVosQ0E1QkE7QUE2QkFWLE1BQUEsQ0FBT3FCLGVBQVAsQ0FBdUJ2QixLQUFBLENBQUFMLEtBQUEsQ0FBQUssS0FBQSxDQUFBVCxLQUFBO0FBQUEsSUFBRSxHQUFGUyxLQUFLLENBQUFULEtBQUEsQ0FBQThCLEdBQUEsc0NBQUw7QUFBQSxJQUFVRyxDQUFBLEVBQUcsQ0FBYjtBQUFBO0FBQUEsSUFBQVAsT0FBQTtBQUFBLElBQUFDLFFBQUE7QUFBQSxJQUFBQyxJQUFBO0FBQUEsRUFBdkIsRUFBeUNsQixLQUFBLENBQUFOLEtBQUEsQ0FBQU0sS0FBQSxDQUFBVixLQUFBO0FBQUEsSUFBRStCLENBQUEsRUFBRyxDQUFMO0FBQUEsSUFBUVYsQ0FBQSxFQUFHLENBQVg7QUFBQSxJQUFjWSxDQUFBLEVBQUcsQ0FBakI7QUFBQTtBQUFBLElBQUFQLE9BQUE7QUFBQSxJQUFBQyxRQUFBO0FBQUEsSUFBQUMsSUFBQTtBQUFBLEVBQXpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuXG5jb25zdCB1cmxzID0gW1xuICAgICdodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtcmVzdC1zcHJlYWQnLFxuICAgICdodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1yZWdleHAtbG9va2JlaGluZCcsXG4gICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXJlZ2V4cC11bmljb2RlLXByb3BlcnR5LWVzY2FwZXMnLFxuICAgICdodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLWZpbmFsbHknLFxuICAgICdodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1hc3luYy1pdGVyYXRpb24nXG5dO1xuXG5hc3luYyBmdW5jdGlvbiAqIGFpdCAoKSB7XG4gICAgZm9yIChjb25zdCB1cmwgb2YgdXJscykge1xuICAgICAgICBjb25zb2xlLmxvZyhgRmV0Y2hpbmc6ICR7dXJsfWApO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICAgIGNvbnN0IGl0ZXJhYmxlID0gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICB5aWVsZCBpdGVyYWJsZTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGIgKCkge1xuICAgIGZvciBhd2FpdCAoY29uc3QgeCBvZiBhaXQoKSkge1xuICAgICAgICBjb25zdCB0aXRsZSA9IHgubWF0Y2goLzx0aXRsZT4oLispPFxcL3RpdGxlPi8pWzFdO1xuICAgICAgICBhc3NlcnQodGl0bGUpO1xuICAgIH1cbn1cblxuYigpO1xuXG5jb25zdCBvYmogPSB7IGE6IDEsIGI6IDIgfTtcbmFzc2VydC5kZWVwU3RyaWN0RXF1YWwoeyAuLi5vYmosIGM6IDMgfSwgeyBhOiAxLCBiOiAyLCBjOiAzIH0pO1xuIl19

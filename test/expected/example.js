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
var _rec1 = new _PowerAssertRecorder1();
var _rec2 = new _PowerAssertRecorder1();
var _rec3 = new _PowerAssertRecorder1();
var assert = require('power-assert'), truthy = 'true', falsy = 'false';
assert(_rec1._expr(_rec1._capt(falsy, 'arguments/0'), {
    content: 'assert(falsy)',
    filepath: 'test/fixtures/example.js',
    line: 4
}));
assert.equal(_rec2._expr(_rec2._capt(truthy, 'arguments/0'), {
    content: 'assert.equal(truthy, falsy)',
    filepath: 'test/fixtures/example.js',
    line: 5
}), _rec3._expr(_rec3._capt(falsy, 'arguments/1'), {
    content: 'assert.equal(truthy, falsy)',
    filepath: 'test/fixtures/example.js',
    line: 5
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZml4dHVyZXMvZXhhbXBsZS5qcyJdLCJuYW1lcyI6WyJfUG93ZXJBc3NlcnRSZWNvcmRlcjEiLCJQb3dlckFzc2VydFJlY29yZGVyIiwiY2FwdHVyZWQiLCJwcm90b3R5cGUiLCJfY2FwdCIsInZhbHVlIiwiZXNwYXRoIiwicHVzaCIsIl9leHByIiwic291cmNlIiwiY2FwdHVyZWRWYWx1ZXMiLCJwb3dlckFzc2VydENvbnRleHQiLCJldmVudHMiLCJfcmVjMSIsIl9yZWMyIiwiX3JlYzMiLCJhc3NlcnQiLCJyZXF1aXJlIiwidHJ1dGh5IiwiZmFsc3kiLCJjb250ZW50IiwiZmlsZXBhdGgiLCJsaW5lIiwiZXF1YWwiXSwibWFwcGluZ3MiOiJBQUFBLElBQUFBLHFCQUFBO0FBQUEsYUFBQUMsbUJBQUE7QUFBQSxhQUFBQyxRQUFBO0FBQUE7QUFBQSxJQUFBRCxtQkFBQSxDQUFBRSxTQUFBLENBQUFDLEtBQUEsWUFBQUEsS0FBQSxDQUFBQyxLQUFBLEVBQUFDLE1BQUE7QUFBQSxhQUFBSixRQUFBLENBQUFLLElBQUE7QUFBQSxZQUFBRixLQUFBLEVBQUFBLEtBQUE7QUFBQSxZQUFBQyxNQUFBLEVBQUFBLE1BQUE7QUFBQTtBQUFBLGVBQUFELEtBQUE7QUFBQTtBQUFBLElBQUFKLG1CQUFBLENBQUFFLFNBQUEsQ0FBQUssS0FBQSxZQUFBQSxLQUFBLENBQUFILEtBQUEsRUFBQUksTUFBQTtBQUFBLFlBQUFDLGNBQUEsUUFBQVIsUUFBQTtBQUFBLGFBQUFBLFFBQUE7QUFBQTtBQUFBLFlBQUFTLGtCQUFBO0FBQUEsZ0JBQUFOLEtBQUEsRUFBQUEsS0FBQTtBQUFBLGdCQUFBTyxNQUFBLEVBQUFGLGNBQUE7QUFBQTtBQUFBLFlBQUFELE1BQUEsRUFBQUEsTUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFBUixtQkFBQTtBQUFBO0FBR08sSUFBQVksS0FBQSxPQUFBYixxQkFBQSxHQUhQO0FBSWEsSUFBQWMsS0FBQSxPQUFBZCxxQkFBQSxHQUpiO0FBSXFCLElBQUFlLEtBQUEsT0FBQWYscUJBQUEsR0FKckI7QUFBQSxJQUFJZ0IsTUFBQSxHQUFTQyxPQUFBLENBQVEsY0FBUixDQUFiLEVBQ0lDLE1BQUEsR0FBUyxNQURiLEVBRUlDLEtBQUEsR0FBUSxPQUZaO0FBR0FILE1BQUEsQ0FBT0gsS0FBQSxDQUFBTCxLQUFBLENBQUFLLEtBQUEsQ0FBQVQsS0FBQSxDQUFBZSxLQUFBO0FBQUEsSUFBQUMsT0FBQTtBQUFBLElBQUFDLFFBQUE7QUFBQSxJQUFBQyxJQUFBO0FBQUEsRUFBUCxFQUhBO0FBSUFOLE1BQUEsQ0FBT08sS0FBUCxDQUFhVCxLQUFBLENBQUFOLEtBQUEsQ0FBQU0sS0FBQSxDQUFBVixLQUFBLENBQUFjLE1BQUE7QUFBQSxJQUFBRSxPQUFBO0FBQUEsSUFBQUMsUUFBQTtBQUFBLElBQUFDLElBQUE7QUFBQSxFQUFiLEVBQXFCUCxLQUFBLENBQUFQLEtBQUEsQ0FBQU8sS0FBQSxDQUFBWCxLQUFBLENBQUFlLEtBQUE7QUFBQSxJQUFBQyxPQUFBO0FBQUEsSUFBQUMsUUFBQTtBQUFBLElBQUFDLElBQUE7QUFBQSxFQUFyQiIsInNvdXJjZXNDb250ZW50IjpbInZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKSxcbiAgICB0cnV0aHkgPSAndHJ1ZScsXG4gICAgZmFsc3kgPSAnZmFsc2UnO1xuYXNzZXJ0KGZhbHN5KTtcbmFzc2VydC5lcXVhbCh0cnV0aHksIGZhbHN5KTtcbiJdfQ==

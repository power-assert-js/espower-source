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
var _rec4 = new _PowerAssertRecorder1();
var empower = require('empower'), formatter = require('power-assert-formatter'), busterAssertions = require('buster-assertions'), refute = empower(busterAssertions.refute, formatter(), {
        targetMethods: {
            oneArg: ['isNull'],
            twoArgs: ['same']
        }
    }), truthy = 'true', falsy = 'false';
refute(_rec1._expr(_rec1._capt(truthy, 'arguments/0'), {
    content: 'refute(truthy)',
    filepath: 'test/fixtures/customized.js',
    line: 7
}));
refute.isNull(_rec2._expr(_rec2._capt(falsy, 'arguments/0'), {
    content: 'refute.isNull(falsy)',
    filepath: 'test/fixtures/customized.js',
    line: 8
}));
refute.same(_rec3._expr(_rec3._capt(truthy, 'arguments/0'), {
    content: 'refute.same(truthy, falsy)',
    filepath: 'test/fixtures/customized.js',
    line: 9
}), _rec4._expr(_rec4._capt(falsy, 'arguments/1'), {
    content: 'refute.same(truthy, falsy)',
    filepath: 'test/fixtures/customized.js',
    line: 9
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZml4dHVyZXMvY3VzdG9taXplZC5qcyJdLCJuYW1lcyI6WyJfUG93ZXJBc3NlcnRSZWNvcmRlcjEiLCJQb3dlckFzc2VydFJlY29yZGVyIiwiY2FwdHVyZWQiLCJwcm90b3R5cGUiLCJfY2FwdCIsInZhbHVlIiwiZXNwYXRoIiwicHVzaCIsIl9leHByIiwic291cmNlIiwiY2FwdHVyZWRWYWx1ZXMiLCJwb3dlckFzc2VydENvbnRleHQiLCJldmVudHMiLCJfcmVjMSIsIl9yZWMyIiwiX3JlYzMiLCJfcmVjNCIsImVtcG93ZXIiLCJyZXF1aXJlIiwiZm9ybWF0dGVyIiwiYnVzdGVyQXNzZXJ0aW9ucyIsInJlZnV0ZSIsInRhcmdldE1ldGhvZHMiLCJvbmVBcmciLCJ0d29BcmdzIiwidHJ1dGh5IiwiZmFsc3kiLCJjb250ZW50IiwiZmlsZXBhdGgiLCJsaW5lIiwiaXNOdWxsIiwic2FtZSJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQUEscUJBQUE7QUFBQSxhQUFBQyxtQkFBQTtBQUFBLGFBQUFDLFFBQUE7QUFBQTtBQUFBLElBQUFELG1CQUFBLENBQUFFLFNBQUEsQ0FBQUMsS0FBQSxZQUFBQSxLQUFBLENBQUFDLEtBQUEsRUFBQUMsTUFBQTtBQUFBLGFBQUFKLFFBQUEsQ0FBQUssSUFBQTtBQUFBLFlBQUFGLEtBQUEsRUFBQUEsS0FBQTtBQUFBLFlBQUFDLE1BQUEsRUFBQUEsTUFBQTtBQUFBO0FBQUEsZUFBQUQsS0FBQTtBQUFBO0FBQUEsSUFBQUosbUJBQUEsQ0FBQUUsU0FBQSxDQUFBSyxLQUFBLFlBQUFBLEtBQUEsQ0FBQUgsS0FBQSxFQUFBSSxNQUFBO0FBQUEsWUFBQUMsY0FBQSxRQUFBUixRQUFBO0FBQUEsYUFBQUEsUUFBQTtBQUFBO0FBQUEsWUFBQVMsa0JBQUE7QUFBQSxnQkFBQU4sS0FBQSxFQUFBQSxLQUFBO0FBQUEsZ0JBQUFPLE1BQUEsRUFBQUYsY0FBQTtBQUFBO0FBQUEsWUFBQUQsTUFBQSxFQUFBQSxNQUFBO0FBQUE7QUFBQTtBQUFBLFdBQUFSLG1CQUFBO0FBQUE7QUFNTyxJQUFBWSxLQUFBLE9BQUFiLHFCQUFBLEdBTlA7QUFPYyxJQUFBYyxLQUFBLE9BQUFkLHFCQUFBLEdBUGQ7QUFRWSxJQUFBZSxLQUFBLE9BQUFmLHFCQUFBLEdBUlo7QUFRb0IsSUFBQWdCLEtBQUEsT0FBQWhCLHFCQUFBLEdBUnBCO0FBQUEsSUFBSWlCLE9BQUEsR0FBVUMsT0FBQSxDQUFRLFNBQVIsQ0FBZCxFQUNJQyxTQUFBLEdBQVlELE9BQUEsQ0FBUSx3QkFBUixDQURoQixFQUVJRSxnQkFBQSxHQUFtQkYsT0FBQSxDQUFRLG1CQUFSLENBRnZCLEVBR0lHLE1BQUEsR0FBU0osT0FBQSxDQUFRRyxnQkFBQSxDQUFpQkMsTUFBekIsRUFBaUNGLFNBQUEsRUFBakMsRUFBOEM7QUFBQSxRQUFFRyxhQUFBLEVBQWU7QUFBQSxZQUFFQyxNQUFBLEVBQVEsQ0FBQyxRQUFELENBQVY7QUFBQSxZQUFzQkMsT0FBQSxFQUFTLENBQUMsTUFBRCxDQUEvQjtBQUFBLFNBQWpCO0FBQUEsS0FBOUMsQ0FIYixFQUlJQyxNQUFBLEdBQVMsTUFKYixFQUtJQyxLQUFBLEdBQVEsT0FMWjtBQU1BTCxNQUFBLENBQU9SLEtBQUEsQ0FBQUwsS0FBQSxDQUFBSyxLQUFBLENBQUFULEtBQUEsQ0FBQXFCLE1BQUE7QUFBQSxJQUFBRSxPQUFBO0FBQUEsSUFBQUMsUUFBQTtBQUFBLElBQUFDLElBQUE7QUFBQSxFQUFQLEVBTkE7QUFPQVIsTUFBQSxDQUFPUyxNQUFQLENBQWNoQixLQUFBLENBQUFOLEtBQUEsQ0FBQU0sS0FBQSxDQUFBVixLQUFBLENBQUFzQixLQUFBO0FBQUEsSUFBQUMsT0FBQTtBQUFBLElBQUFDLFFBQUE7QUFBQSxJQUFBQyxJQUFBO0FBQUEsRUFBZCxFQVBBO0FBUUFSLE1BQUEsQ0FBT1UsSUFBUCxDQUFZaEIsS0FBQSxDQUFBUCxLQUFBLENBQUFPLEtBQUEsQ0FBQVgsS0FBQSxDQUFBcUIsTUFBQTtBQUFBLElBQUFFLE9BQUE7QUFBQSxJQUFBQyxRQUFBO0FBQUEsSUFBQUMsSUFBQTtBQUFBLEVBQVosRUFBb0JiLEtBQUEsQ0FBQVIsS0FBQSxDQUFBUSxLQUFBLENBQUFaLEtBQUEsQ0FBQXNCLEtBQUE7QUFBQSxJQUFBQyxPQUFBO0FBQUEsSUFBQUMsUUFBQTtBQUFBLElBQUFDLElBQUE7QUFBQSxFQUFwQiIsInNvdXJjZXNDb250ZW50IjpbInZhciBlbXBvd2VyID0gcmVxdWlyZSgnZW1wb3dlcicpLFxuICAgIGZvcm1hdHRlciA9IHJlcXVpcmUoJ3Bvd2VyLWFzc2VydC1mb3JtYXR0ZXInKSxcbiAgICBidXN0ZXJBc3NlcnRpb25zID0gcmVxdWlyZShcImJ1c3Rlci1hc3NlcnRpb25zXCIpLFxuICAgIHJlZnV0ZSA9IGVtcG93ZXIoYnVzdGVyQXNzZXJ0aW9ucy5yZWZ1dGUsIGZvcm1hdHRlcigpLCB7IHRhcmdldE1ldGhvZHM6IHsgb25lQXJnOiBbJ2lzTnVsbCddLCB0d29BcmdzOiBbJ3NhbWUnXSB9IH0pLFxuICAgIHRydXRoeSA9ICd0cnVlJyxcbiAgICBmYWxzeSA9ICdmYWxzZSc7XG5yZWZ1dGUodHJ1dGh5KTtcbnJlZnV0ZS5pc051bGwoZmFsc3kpO1xucmVmdXRlLnNhbWUodHJ1dGh5LCBmYWxzeSk7XG4iXX0=

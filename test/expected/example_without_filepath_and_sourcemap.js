var assert = require('power-assert'), truthy = 'true', falsy = 'false';
assert(assert._expr(assert._capt(falsy, 'arguments/0'), {
    content: 'assert(falsy)',
    line: 4
}));
assert.equal(assert._expr(assert._capt(truthy, 'arguments/0'), {
    content: 'assert.equal(truthy, falsy)',
    line: 5
}), assert._expr(assert._capt(falsy, 'arguments/1'), {
    content: 'assert.equal(truthy, falsy)',
    line: 5
}));

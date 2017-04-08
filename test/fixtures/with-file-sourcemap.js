var Person, assert;

assert = require('power-assert');

Person = (function() {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  return Person;

})();

describe("various types", function() {
  beforeEach(function() {
    return this.types = [
      "string", 98.6, true, false, null, undefined, ["nested", "array"], {
        object: true
      }, NaN, Infinity, /^not/, new Person("alice", 3)
    ];
  });
  return it("demo", function() {
    var bob, index;
    index = this.types.length - 1;
    bob = new Person("bob", 5);
    return assert(this.types[index].name === bob.name);
  });
});

//# sourceMappingURL=with-file-sourcemap.js.map

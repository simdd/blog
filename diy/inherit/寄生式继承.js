function createObj(o) {
  var clone = Object.create(o);
  clone.sayName = function() {
    console.log("hi");
  };
  return clone;
}

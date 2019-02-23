/**
 * mock Object.create
 **/

Object.prototype.mockCreate = function(Parent) {
  let obj = {};
  obj.__proto__ = Parent;
  return obj;
};

var Parent = {
  name: "this is obj",
  age: 1
};

let obj = Object.mockCreate(Parent);

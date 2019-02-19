function mockNew() {
  let Fn = Array.prototype.shift.call(arguments);
  let args = arguments;

  let obj = Object.create({});
  obj.fn = Fn;
  obj.__proto__ = Fn.prototype;
  let res = obj.fn(args);
  delete obj.fn;

  return typeof res === "object" ? res : obj;
}

function Fn() {
  this.name = "this is Fn name";
}

Fn.prototype.getName = function() {
  console.log(this.name);
};

let obj = mockNew(Fn);

obj.getName();
console.log(obj.name);

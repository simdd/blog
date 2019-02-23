/**
 * mock call
 **/

a = 0;

var obj = {
  a: 1
};

function fn(a, b) {
  console.log(this.a);
  console.log(a);
  console.log(b);
  return a + b;
}

Function.prototype.mockCall = function(context) {
  let arg = Array.prototype.slice.call(arguments, 1);

  context.fn = this;
  let res = context.fn(...arg);
  delete context.fn;
  return res;
};

let res = fn.mockCall(obj, "haha", "hoho");
console.log(res);

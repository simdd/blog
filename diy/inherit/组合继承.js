function Parent() {
  this.name = "parent name";
}

Parent.prototype.getName = function() {
  console.log(this.name);
};

function Child() {
  Parent.call(this);
}

Child.prototype = new Parent();
// 修改原型的构造函数为Child
Child.prototype.constructor = Child;

var obj = new Child();

obj.getName();
console.log(obj.name);

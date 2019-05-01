function Parent() {
  this.name = "parent name";
}

Parent.prototype.getName = function() {
  console.log(this.name);
};

function Child() {}

Child.prototype = new Parent();

var obj = new Child();

console.log(obj.getName());

function Parent() {
  this.name = "parent name";
}

Parent.prototype.getName = function() {
  console.log(this.name);
};

function Child() {
  Parent.call(this);
}

var obj = new Child();

console.log(obj.name);

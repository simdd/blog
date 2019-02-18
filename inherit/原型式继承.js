Object.prototype.create = function(o) {
  function F() {}
  F.prototype = o;
  return new F();
};

var Animal = {
  age: 0,
  getAge: function() {
    console.log(this.age);
  }
};

let dog = Object.create(Animal);

console.log(dog.getAge());

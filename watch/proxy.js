var handler = {
  get: function(obj, prop) {
    return obj[prop];
  },
  set: function(obj, prop, value) {
    obj[prop] = value;
  }
};

function watch(obj, key, callback) {
  new Proxy(obj, handler);
}

// test
let obj = {
  name: "a",
  age: 12
};

watch(obj, "age", function(newValue) {
  console.log("obj age change to : ", newValue);
});

obj.name = "b";
obj.age = 13;
console.log(obj.age);

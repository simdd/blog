/**
 * 为对象添加可遍历属性
 **/

// 1
function* mockIterator(obj) {
  let keys = Reflect.ownKeys(obj);

  for (let key of keys) {
    yield [key, obj[key]];
  }
}

// 2
Object.prototype[Symbol.iterator] = function*() {
  let keys = Reflect.ownKeys(this);

  for (let key of keys) {
    yield [key, this[key]];
  }
};

// test
let obj1 = {
  name: "不可迭代的对象",
  age: 10
};

for (let [key, value] of mockIterator(obj1)) {
  console.log(`${key}: ${value}`);
}

let obj2 = new Object({
  name: "不可迭代的对象",
  age: 10
});

for (let [key, value] of obj2) {
  console.log(`${key}: ${value}`);
}

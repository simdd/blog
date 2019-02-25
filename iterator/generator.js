function iterator(arr) {
  var idx = 0;
  return {
    next: function() {
      return idx < arr.length
        ? {
            value: arr[idx++],
            done: false
          }
        : {
            value: "",
            done: true
          };
    }
  };
}

let arr = [1, 2];
let iterator1 = iterator(arr);
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());

// { value: 1, done: false }
// { value: 2, done: false }
// { value: '', done: true }

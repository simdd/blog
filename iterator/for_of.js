let arr = [1, 2, 3];
let obj = {
  a: 1,
  b: 2
};
arr.name = "arr1";

for (let i in arr) {
  console.log(arr[i]);
}

// 1
// 2
// 3
// arr1

for (let i of arr) {
  console.log(i);
}

// 1
// 2
// 3

for (let i in obj) {
  console.log(obj[i]);
}

// obj is not iterable
for (let i of obj) {
  console.log(i);
}

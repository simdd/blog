function watch(obj, key, callback) {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    get() {
      return value
    },

    set(newValue) {
      value = newValue
      callback(newValue)
    }
  })
}

// test
let obj = {
  name: 'a',
  age: 12
}

watch(obj, 'age', function(newValue) {
  console.log('obj age change to : ', newValue)
})

obj.name = 'b'
obj.age = 12
console.log(obj.age)

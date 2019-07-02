var readFileThunk = function(fileName) {
  return function(callback) {
    return fs.readFile(fileName, callback)
  }
}

var g = function*() {
  var f1 = yield readFileThunk('fileA')
  var f2 = yield readFileThunk('fileB')
  var fn = yield readFileThunk('fileN')
}

function run(fn) {
  var gen = fn()

  function next(err, data) {
    var result = gen.next(data)
    if (result.done) return
    result.value(next)
  }

  next()
}

run(g)

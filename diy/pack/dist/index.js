(function(modules) {
  function require(id) {
    const [fn, mapping] = modules[id];

    function localRequire(name) {
      return require(mapping[name]);
    }

    const module = { exports: {} };

    fn(localRequire, module, module.exports);

    return module.exports;
  }

  require(0);
})({
  0: [
    function(require, module, exports) {
      "use strict";

      var _a = require("./a.js");

      var a = _interopRequireWildcard(_a);

      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key))
                newObj[key] = obj[key];
            }
          }
          newObj.default = obj;
          return newObj;
        }
      }

      console.log("---------index start import a.js");

      console.log("---------index start");
      console.log(a);
      console.log("---------index end");
    },
    { "./a.js": 1 }
  ],
  1: [
    function(require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _b = require("./b.js");

      console.log("---------a start");
      console.log(_b.BNAME);
      console.log("---------a end");

      exports.default = "this is a default module of 'a' file";
    },
    { "./b.js": 2 }
  ],
  2: [
    function(require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var BNAME = "mock pack";
      exports.BNAME = BNAME;
    },
    {}
  ]
});

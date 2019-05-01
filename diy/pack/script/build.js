const fs = require("fs");
const vm = require("vm");
const path = require("path");
const pack = require("./../src");

const output = pack(path.resolve(process.cwd(), "./test/index.js"));
const dist = path.resolve(process.cwd(), "./dist/index.js");
fs.writeFileSync(dist, output);
vm.runInThisContext(output);

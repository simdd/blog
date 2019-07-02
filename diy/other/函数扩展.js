let log = console.log;

console.log = function() {
  // dosomething
  log("pre log...");
  log.apply(this, arguments);
  log("end log...");
};

console.log("hi");

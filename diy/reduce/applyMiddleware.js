const middleware = [
  function() {
    console.log("middleware1, async");
  },
  async function() {
    await new Promise(res => {
      res();
    }).then(res => {
      console.log("middleware2, sync");
    });
  },
  function() {
    console.log("middleware3, async");
  }
];

middleware.reduce((a, b) => async (...args) => await a(await b(...args)))();

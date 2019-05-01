const fs = require("fs");
const path = require("path");
const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const { transformFromAst } = require("babel-core");

let ID = 0;

/**
 * 解析文件依赖
 * params: (filename)
 * return:
 *  {
 *    id,
 *    filename,
 *    dependencies,
 *    dist
 * }
 **/
function parseDepend(filename) {
  let id = ID++;
  let dependencies = [];

  let code = fs.readFileSync(path.resolve(process.cwd(), filename), "utf-8");

  const ast = babylon.parse(code, {
    sourceType: "module"
  });

  traverse(ast, {
    ImportDeclaration: function({ node }) {
      dependencies.push(node.source.value);
    }
  });

  const { code: dist } = transformFromAst(ast, null, {
    presets: ["env"]
  });

  return {
    id,
    filename,
    dependencies,
    dist
  };
}

/**
 * 生成依赖图
 * params: (entryFile)
 * return:
 *  [{
 *    id,
 *    filename,
 *    dependencies,
 *    dist,
 *    mapping
 *  }]
 **/
function parseGraph(entryFile) {
  const entryAsset = parseDepend(entryFile);
  const graph = [entryAsset];

  for (const asset of graph) {
    asset.mapping = {};
    const dir = path.dirname(asset.filename);

    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.resolve(dir, relativePath);
      const child = parseDepend(absolutePath);
      asset.mapping[relativePath] = child.id;
      graph.push(child);
    });
  }

  return graph;
}

// 运行
function bundle(entryFile) {
  const graph = parseGraph(entryFile);
  let modules = "";

  graph.forEach(module => {
    modules += `${module.id}: [
      function(require, module, exports){
        ${module.dist}
      },
      ${JSON.stringify(module.mapping)}
    ],`;
  });

  const result = `(function(modules) {
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
  })({${modules}})`;

  return result;
}

module.exports = bundle;

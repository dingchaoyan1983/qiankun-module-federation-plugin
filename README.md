# qiankun-module-federation-plugin

[![NPM version](https://img.shields.io/npm/v/qiankun-mf-plugin1.svg?style=flat)](https://npmjs.com/package/qiankun-module-federation-plugin)
[![NPM downloads](http://img.shields.io/npm/dm/qiankun-mf-plugin1.svg?style=flat)](https://npmjs.com/package/qiankun-module-federation-plugin)

## Install

```bash
$ pnpm install
```

```bash
$ npm run build
```

## Options

This plugin options are same as [module federation plugin](https://webpack.js.org/plugins/module-federation-plugin/). but it support using module federation in qiankun.

example

```js
// module-federation.config.js
const packageJson = require("./package.json")

exports.default = {
  name: packageJson.name,
  remotes: [{
    // remote app name
    name: "subapp2",
    // remote app alias name, default same as remote app name
    alias: "subapp2",
    //remote pahtname, default "/"
    publicPath: "/",
    // remote origin url
    origin: "http://localhost:3002"
  }, {
    name: "hostapp",
    origin: "http://localhost:3000"
  }],
  exposes: {
    "./Subapp1SharedComp": "./src/Shared.tsx",
    "./Subapp1Button": "./src/Button.tsx"
  },
  shareStrategy: "loaded-first",
  shared: {
    react: {
      singleton: true,
    },
    'react-dom': {
      singleton: true,
    },
  },
  // remote dts type urls options
  remoteDtsTypeUrls: [{
    name: "subapp2",
    publicPath: "http://localhost:3002"
  }, {
    name: "hostapp",
    publicPath: "http://localhost:3000"
  }],
};
```

## LICENSE

MIT

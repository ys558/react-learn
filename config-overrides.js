/**
 * 使用装饰器,须安装:
 * 1. npm install react-app-rewired customize-cra babel-plugin-import -D
 * 2. npm install -D @babel/plugin-proposal-decorators
 */
// 装饰器,方法1: addBabelPlugins
const { override, fixBabelImports, addBabelPlugins, disableEsLint } = require('customize-cra');

// 装饰器,方法2: addBabelPlugin
const { addDecoratorsLegacy } = require("customize-cra");

module.exports = override(
  // 使用antd：
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
  
  // 装饰器：方法1:
  // https://github.com/arackaf/customize-cra/blob/HEAD/api.md#addexternalbabelpluginsplugins
  // ...addBabelPlugins(
  //   ["@babel/plugin-proposal-decorators",{"legacy": true}]
  // ),

  // 装饰器: 方法2:
  addDecoratorsLegacy(),

  // 禁用Eslint提示：
  disableEsLint(),
);
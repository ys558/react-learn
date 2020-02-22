const { override, fixBabelImports, addBabelPlugins, disableEsLint } = require('customize-cra');

module.exports = override(
  // 使用antd：
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
  
  // 使用装饰器：
  // https://github.com/arackaf/customize-cra/blob/HEAD/api.md#addexternalbabelpluginsplugins
  ...addBabelPlugins(
      ["@babel/plugin-proposal-decorators",{"legacy": true}]
  ),

  // 禁用Eslint提示：
  disableEsLint(),
);
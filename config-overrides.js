const { override, fixBabelImports, addBabelPlugins, disableEsLint } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
    }),
  // https://github.com/arackaf/customize-cra/blob/HEAD/api.md#addexternalbabelpluginsplugins
  ...addBabelPlugins(
      ["@babel/plugin-proposal-decorators",{"legacy": true}]
  ),
  disableEsLint(),
);
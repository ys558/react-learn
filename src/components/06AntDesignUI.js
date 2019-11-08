/**
 * 使用方法：https://ant.design/docs/react/use-with-create-react-app-cn
 * 1. npm i antd --save
 * 
 * 2. 实现按需加载，具体在上面的官方文档也可以查看
 *  npm i react-app-rewired customize-cra --save
 * 
 * 3. package.json脚本改变：
    "scripts": {
    -   "start": "react-scripts start",
    +   "start": "react-app-rewired start",
    -   "build": "react-scripts build",
    +   "build": "react-app-rewired build",
    -   "test": "react-scripts test",
    +   "test": "react-app-rewired test",
    }

    4. 项目根目录创建一个 config-overrides.js 用于修改默认配置。使用 babel-plugin-import
    const { override, fixBabelImports } = require('customize-cra');
    
    module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    );

    5. 然后移除前面在 src/App.css 里全量添加的 @import '~antd/dist/antd.css'; 样式代码，并且按下面的格式引入模块。


 */
import React, { Component } from 'react'
import { Button } from 'antd'

export default class AntDesignUI extends Component {
    render() {
        return (
            <div>
                <Button type="primary">按钮</Button>
            </div>
        )
    }
}

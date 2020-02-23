import React, { PureComponent } from 'react'
/**
 * 利用hoc达到Composition一样的效果：但语法比起Composition较难理解：
 * @渲染劫持
 * 1. hoc中，Hoc = (parentComponent) => ... 的parentComponent即为传入的父组件
 * 2. 在装饰器中@xxx(config)
 * @反向继承
 * super.render()
 */
const parentCompInputComp = parentComponent => class extends parentComponent {
  render() {
    const parentComp = super.render()
    // console.log('xxx', xxx)
    // xxx {$$typeof: Symbol(react.element), type: "div", key: null, ref: null, props: {…}, …}
    return <div>
      {parentComp}
      <h3>我是子组件内容</h3>
      <input type="text"/>
    </div>
  }
}

// hijack(劫持)渲染劫持高阶组件: (config)当做要传入的参数, 特意用括号括起; 
const parentCompStyle = (config) => parentComponent => class extends parentComponent {
  render() {
    const { style = {} } = config;
    const parentComp = super.render()
    return config.type === 'add-style' ? 
    <div style={{ ...style }}>{parentComp}</div> : parentComp
  }
}

@parentCompInputComp
@parentCompStyle({ type: 'add-style', style: { backgroundColor: 'green' } })
export default class parentComponent extends PureComponent {
  render() {
  return <div>
    <h2>反向继承{' '}Inheritance{' '}Inversion, 我是父组件的内容</h2>
  </div>
  }
}
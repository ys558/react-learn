import React, { PureComponent } from 'react'

// iiHoc return的组件通过继承，拥有了Usual的生命周期及属性，所以didMount会打印，state也通过constructor执行
// 基本功能 super.render(),
// Comp为父组件, 即要强化的那个组件的意思:
const iiHoc = Comp => class extends Comp {
  render() {
    const parentComponent = super.render()
    // console.log('xxx', xxx)
    // xxx {$$typeof: Symbol(react.element), type: "div", key: null, ref: null, props: {…}, …}
    return <div>
      {parentComponent}
      <h3>我是子组件内容</h3>
    </div>
  }

}

// hijack(劫持)渲染劫持高阶组件:
// (config)当做要传入的参数, 特意用括号括起; 
const hijackRederHOC = (config) => Comp => class extends Comp {
  render() {
    const { style = {} } = config;
    const parentComponent = super.render()
    if (config.type == 'add-style') {
      return <div style={{...style}}>
        {parentComponent}
      </div>;
    }
    return parentComponent
  }
}

@iiHoc
@hijackRederHOC({ type: 'add-style', style: {backgroundColor: 'green'} })
export default class IIandHijack extends PureComponent {
  constructor() {
    super();
    this.state = {
      usual: 'usual',
    }
  }

  render() {
    return (
      <div>
        <h2>反向继承{' '}Inheritance{' '}Inversion, 我是父组件的内容</h2>
      </div>
    )
  }
}

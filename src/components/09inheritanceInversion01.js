import React, { Component } from 'react'

// iiHoc return的组件通过继承，拥有了Usual的生命周期及属性，所以didMount会打印，state也通过constructor执行
// 
const iiHoc = Comp => class extends Comp {
  render() {
    console.log(this.state, 'state');
    const ele = super.render()
    return <div>
      {ele}
      <h3>我是子组件内容</h3>
    </div>
  }
}

@iiHoc
export default class InheritanceInversion extends Component {
  constructor() {
    super();
    this.state = {
      usual: 'usual',
    }
  }

  componentDidMount() {
    console.log('didMount')
  }

  render() {
    return (
      <div>
        <h2>反向继承{' '}Inheritance{' '}Inversion, 我是父组件的内容</h2>
      </div>
    )
  }
}

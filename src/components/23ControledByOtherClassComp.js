/**
 * @ 将某个类里的函数提出到别的组件用
 * ? 1. ref，父控制子的动作
 * ? 2. EventEmitter，事件派发，派发出去的事件任何组件都能用addListener接收后控制他，详见 src\components\21EventEmitterDemo.js
 * ? 3. props this，从父组件把整个this传给子组件，用父组件控制子组件state，作用类似HOC
 */

import React, { Component } from 'react'

// ? 1. ref
export class ByRef extends Component {
  testFunc = null
  // 自动去寻找 ChildToPlus里的 plus() 函数执行：
  handleChildPlus = () => this.testFunc.plus()

  render(){
    return <>
      <button onClick={this.handleChildPlus}>plus fr father</button>
      {/* 整个ChildToPlus都被打上ref标记 */}
      <ClickToPlus ref={ ref => this.testFunc = ref } />
    </>
  }
}

class ClickToPlus extends Component {
  constructor(props){
    super(props)
    this.state = {count : 0}
  }
  plus = () => this.setState(({ count }) => ({ count:  count + 1 }))
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.plus}>child +</button>
      </div>
    )
  }
}

// ? 3. 子组件控制父组件
export class ByPropsThis extends Component {
  state = { count: 0}

  render(){
    return <>
      Father count: {this.state.count}
      <Child thisFrFather={this} />
    </>
  }
}

class Child extends Component {
  render(){
    console.log(this.props.thisFrFather.state)
    return <div>
      <p>{this.props.count}</p>
      <button onClick={()=> this.props.thisFrFather.setState(({count}) => ({count: count + 1}))}>
        child +
      </button>
    </div>
  }
}

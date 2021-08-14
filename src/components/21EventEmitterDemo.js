import React, { Component } from 'react'
import { EventEmitter } from 'fbemitter'

export default class EventEmitterDemo extends Component {
  render() {
    // 0. 可用于无层级关系组件传值：
    return <>
        <Child1 />
        <Child2 />
      </>
  }
}

// 1. 初始化
const emitter = new EventEmitter()

class Child1 extends Component {
  state = { show:　'' }
  componentDidMount() {
    // 2. 定义
    this.eventEmitter = emitter.addListener(
      'event', (x,y)=> this.setState({ show: <>{x},{y}</> })
    )
  }
  componentWillUnmount(){
    // 3. 当组件卸载时要将其删除
    this.eventEmitter.remove();
  }
  render(){
    return <div>
      {this.state.show}
    </div>
  }
}

class Child2 extends Component {
  // 3. 发出事件名称及参数： 
  render(){
    return <div>
      <button onClick={()=> emitter.emit('event', 12, 22)}>eventEmitter发出，见控制台</button>
    </div>
  }
}
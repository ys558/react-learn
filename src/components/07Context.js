import React, { Component } from 'react'
/**
 * @跨代传参Context
 */

// 1. 创建上下文
const Context = React.createContext()
// 2. 获取Provider和Consumer
const Provider = Context.Provider
const Consumer = Context.Consumer

export default class ProviderConsumer extends Component {
  state = { counter: 0 }
  plus =()=> this.setState({ counter: this.state.counter + 1 })
  render() {
    return (
      <Provider value={{ counter: this.state.counter, plus: this.plus }}>
        <Consumer>{value => <Child {...value}/>}</Consumer>
      </Provider>
    )
  }
}

const Child = ({plus, counter})=> <div onClick={()=>plus()}>{counter}</div>
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
        {/* 写法1: Consumer未封装, 直接使用 */}
        {/* <Consumer>{value => <Child {...value}/>}</Consumer> */}
        {/* 写法2: 将Consumer做进一步封装进Child里: */}
        <Child/>
      </Provider>
    )
  }
}
// 写法1:
// const Child = ({plus, counter})=> <div onClick={()=>plus()}>{counter}</div>

// 写法2: 用withConsumer强化Child组件
const withConsumer = (Consumer) => 
  Comp =>  props => <Consumer>{value => <Comp {...value}></Comp>}</Consumer>


// 如果是遇到需要强化<>{xxx}</>类型的组件,
const Child = withConsumer(Consumer)(
  // 这里相当于传进来的组件,即withConsumer(Consumer)中的Consumer
  ({plus, counter})=> <div onClick={()=>plus()}>{counter}</div>
)

/**
 * @ 将某个类里的函数提出到别的组件用
 * ? 1. ref，但这种的缺点是父组件控制子组件的动作
 * ? 2. HOC, 
 */

import React, { Component } from 'react'

export class FuncOutOfClassByRef extends Component {
  testFunc = null
  handlePlay = () => this.testFunc.plus()

  render(){
    return <>
      <button onClick={this.handlePlay}>plus fr father</button>
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
        <button onClick={this.plus}>+</button>
      </div>
    )
  }
}

const Temp = ClickToPlus => {
  return class Text extends Component {
    plus = () => this.props.plus()
    render(){
      return <ClickToPlus {...this.props} plus={this.plus}/>
    }
  }
}

export const FuncOutOfClassByHOC = Temp(ClickToPlus)
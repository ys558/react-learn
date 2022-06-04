import React, {Component, PureComponent} from 'react'

export default class Parent extends Component {
  constructor (props) {
    super(props)
    this.state = { count: 1 }
  }
  hanldeClick = () => this.setState({ count: this.state.count + 1 })

  render(){
    console.log(this.props.children)
    return <>
      <button onClick={this.hanldeClick}>click to Plus: {this.state.count}</button>
      <Son />
    </>
  }
}

// 最常规的优化办法1: PureCompnent：
class Son extends PureComponent {
  render(){
    // 只在第一次渲染，如果父组件点击均不会再次渲染：
    console.log('re-render in Son Component')
    return <div>
      子组件
    </div>
  }
}

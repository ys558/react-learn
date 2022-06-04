import React, {Component, PureComponent} from 'react'


export default class Parent extends Component {
  render(){
    // 优化办法2: Son2为非状态组建，抽离非状态组建进行
    return <div>
      <Son1 />
      <Son2 />
    </div>
  }
}

class Son1 extends Component {
  constructor (props) { 
    super(props)
    this.state = { count: 1 }
  }
  hanldeClick = () => this.setState({ count: this.state.count + 1 })

  render(){
    console.log(this.props.children)
    return <div>
      <button onClick={this.hanldeClick}>zclick to Plus: {this.state.count}</button>
    </div>
  }
}

class Son2 extends Component {
  render(){
    console.log('re-render in Son2')
    return <div>
      
    </div>
  }
}

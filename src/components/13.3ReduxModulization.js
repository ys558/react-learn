import React from 'react'
import { connect } from 'react-redux'
import { plus, minus, syncPlus } from '../store/13.3counter'


@connect(
  state => ({num: state}),
  {plus, minus, syncPlus}
)
class ReduxMiddleWare extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.num}</div>
        <button onClick={()=> this.props.plus(2)}>+2</button>
        <button onClick={()=> this.props.minus()}>-</button>
        <button onClick={this.props.syncPlus}>Sync +</button>
      </div>
    )
  }
}

export default ReduxMiddleWare

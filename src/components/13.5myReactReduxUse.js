import React, { Component } from 'react'
import {connect, bindActionCreators } from '../store/13.5myReactRedux'

// 这部分可以独立出去成为一个文件: 这里为了方便,暂时这么写:
const plus = num => ({ type: "PLUS", payload: num });
const minus = num => ({ type: "MINUS", payload: num });
const syncPlus = () => dispatch => setTimeout(()=> dispatch({type: 'PLUS'}), 1000)

export default connect(
  state => ({num: state}),
  {plus, minus, syncPlus}
)(class MyReactRedux extends Component {
  render() {
    const {num, plus, minus, syncPlus} = this.props
    return (
      <div>
        <div>{num}</div>
        <button onClick={()=> plus(2)}>+2</button>
        <button onClick={()=> minus() }>-</button>
        <button onClick={()=> syncPlus()}>async +</button>
      </div>
    )
  }
})


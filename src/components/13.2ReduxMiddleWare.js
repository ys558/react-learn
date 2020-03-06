import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({num: state})
const mapDispatchToProps = {
  plus: num => ({type: 'PLUS', payload: num }),
  minus: () => ({type:'MINUS'}),
  syncPlus: () => dispatch => setTimeout(()=> dispatch({type: 'PLUS'}), 1000)
}


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

export default connect(mapStateToProps, mapDispatchToProps)(ReduxMiddleWare)

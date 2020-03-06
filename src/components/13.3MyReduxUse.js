import React from 'react'
import store from '../store/13.3myStore'

export default class MyRedux extends React.Component {
  render() {
    return (
      <div>
        <div>{store.getState()}</div>
        <button onClick={()=> store.dispatch({type: 'PLUS', payload: 2})}>+2</button>
        <button onClick={()=> store.dispatch({type: 'MINUS'})}>-</button>
        <button onClick={()=> store.dispatch(()=> setTimeout(()=> store.dispatch({type: 'PLUS'}), 1000))}>async +</button>
      </div>
    )
  }
}

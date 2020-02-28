// 自行实现Redux:
import React, { Component } from 'react'
import {createStore, applyMiddleware, logger} from './redux-source-code-learn/yredux'

const counterReducer = (state=0, action) =>{
  const num = action.payload || 1;
  switch (action.type) {
    case 'plus':
      return state + num
    case 'minus':
      return state - num
    default:
      return state
  }
}
const store = createStore(counterReducer, applyMiddleware(logger))

export default class MyReduxTest extends Component {
  componentDidMount(){
    store.subscribe(()=> this.forceUpdate())
  }

  render() {
    return (
      <div>
        {store.getState()}
        <div>
          <button onClick={()=>store.dispatch({type: 'plus'})}>+</button>
          <button onClick={()=>store.dispatch({type: 'minus'})}>-</button>
        </div>
      </div>
    )
  }
}


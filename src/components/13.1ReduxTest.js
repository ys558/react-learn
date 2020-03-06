import React from 'react'
import store from '../store/13.1store'

export default function ReduxTest() {
  return (
    <div>
      <div>{store.getState()}</div>
      <button onClick={()=> store.dispatch({type: 'PLUS'})}>+</button>
      <button onClick={()=> store.dispatch({type: 'MINUS'})}>-</button>
    </div>
  )
}

/**
 * 原始的redux api
 * 13.1 createStore
 *  查看src\components\13-01store.jsx
 * 13.2 reducer
 *  查看 src\components\13-01store.jsx
 * 13.3 getState
 *  查看下面演示
 * 13.4 dispatch
 *  查看下面演示
 * 13.5 subscribe
 *  查看 src\index.js
 */
import React from 'react'
import store from './13-01store'

// 对应src\components\13-01store.jsx
export default function SimpleRedux() {
  return (
    <div>
      <p>{store.getState()}</p>
      <div>
        <button onClick={()=>store.dispatch({type: 'plus'})}>+</button>
        <button onClick={()=>store.dispatch({type: 'minus'})}>-</button>
      </div>
    </div>
  )
}


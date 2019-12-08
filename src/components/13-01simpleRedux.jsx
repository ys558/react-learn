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


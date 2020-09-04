import React,{useState} from 'react'

function HookA(){
  const [count, setCount] = useState(0)
  return <div>
    <p>{count}</p>
    <button onClick={()=> setCount(prevCount => prevCount + 1)}>+</button>
    <button onClick={()=> setCount(prevCount => prevCount - 1)}>-</button>
  </div>
}
export default HookA
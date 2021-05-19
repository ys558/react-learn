import React, {useState, useRef, useEffect, useLayoutEffect, forwardRef, useImperativeHandle} from 'react'

function UseLayoutEffectHook() {
  let [color, setColor] = useState('red')

  useLayoutEffect(() => console.log("useLayoutEffect", document.getElementById('myDiv').style.backgroundColor))
  useEffect(() => console.log("useEffect", document.getElementById('myDiv').style.backgroundColor))

  return <>
    <div id="myDiv" style={{ backgroundColor: color }}>颜色</div>
    <button onClick={() => setColor('red')}>红</button>
    <button onClick={() => setColor('yellow')}>黄</button>
    <button onClick={() => setColor('blue')}>蓝</button>
  </>
}

export default UseLayoutEffectHook
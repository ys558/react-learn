/**
 * @useRef
 * useRef结合useImperativeHandle可以通过父组件获取子组件的方法
 */
import React, {useState, useRef, useEffect, useLayoutEffect, forwardRef, useImperativeHandle} from 'react'

// 例1:
const UseRef_UseImperativeHandle2 = () => {
  let parentRef = useRef()
  const getFocus = () => {
    parentRef.current.focus()
    parentRef.current.setValue('something')
  }
  return <>
    <ForwardedChild ref={parentRef} />
    <button onClick={getFocus}>获得焦点</button>
  </>
}

const A = (props, parentRef) => {
  let inputRef = useRef()
  useImperativeHandle(parentRef, () => ({
    focus: () => inputRef.current.focus(),
    setValue: newVal =>  inputRef.current.value = newVal
  }));
  return <input type="text" ref={inputRef} />
}

const ForwardedChild = forwardRef(A);

export default UseRef_UseImperativeHandle2

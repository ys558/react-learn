/**
 * @useImperativeHandle
 * @forwardRef
 * 如果是非DOM节点，则用useRef 结合 forwardRef
  useImperativeHandle 获取子组件里真实的DOM节点的function在父组件里使用
 */
import React, { useRef, forwardRef, useImperativeHandle } from 'react'

const UseRef_UseImperativeHandle2 = () => {
  let parentRef = useRef()
  const getFocus = () => {
    parentRef.current.focus()
    parentRef.current.setValue('something')
  }
  return <>
    <Child ref={parentRef} />
    <button onClick={getFocus}>获得焦点, 并填充something</button>
  </>
}

const Child = forwardRef((props, parentRef) => {
  let inputRef = useRef()
  useImperativeHandle(parentRef, () => ({
    focus: () => inputRef.current.focus(),
    setValue: newVal =>  inputRef.current.value = newVal
  }));
  return <input type="text" ref={inputRef} />
})

export default UseRef_UseImperativeHandle2

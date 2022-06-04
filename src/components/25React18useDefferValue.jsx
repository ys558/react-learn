import React, { useState, useDeferredValue, useMemo, useEffect } from "react";

const LIST_SIZE = 30000;

// 0. 不用useDefferedValue函数，页面渲染极其缓慢：
// const List = ({ input }) => {
//   const defferedValue = useDeferredValue(input)
//   const list = useMemo(() => {
//     const l = []
//     for (let i = 0; i < LIST_SIZE; i++) {
//       l.push(<div key={i}>{input}</div>)
//     }
//     return l
//   }, [input])
//   return list
// }

const List = ({ input }) => {
  // 1. 用useDeferredValue接口，把大列表input放进去进行渲染,
  // 好处是父组件的input框可以实时输入了，渲染的页面会延迟一些，提升体验
  const defferedValue = useDeferredValue(input)

  useEffect(() => {
    // 2. useDeferredValue 和useTransition一样，执行优先级很低
    // 此处验证useDeferredValue的执行情况：nDeferred总是会等到整个input框输入完成才执行
    // 不会输入一个字符执行一次：
    console.log(`Input: ${input}\nDeferred: ${defferedValue}`)
  },[input, defferedValue])

  const list = useMemo(() => {
    const l = []
    for (let i = 0; i < LIST_SIZE; i++) {
      l.push(<div key={i}>{defferedValue}</div>)
    }
    return l
  }, [defferedValue])
  return list
}



export default () => {
  const [input, setInput] = useState('')

  const handleChange = e => setInput(e.target.value)
  
  return <div>
    <input type="text" onChange={handleChange} value={input} />
    <List input={input} />
  </div>
}
import React, { useState, 
  // 3. 利用18新的钩子函数进行优化：
  useTransition } from "react";

// 0. 规定循环次数：20000
const LIST_SIZE = 30000;

export default () => {
  const [input, setInput] = useState('')
  const [list, setList] = useState([])

  // 4. useTransition钩子函数的优先级是比较低的，会执行完其他钩子函数后，最后才执行useTransition钩子
  const [isPending, startTransition] = useTransition()

  const handleChange = e => {
    setInput(e.target.value)

    // const l = []
    // // 1. 直接实时渲染大列表后直接推进
    // for (let i = 0; i < LIST_SIZE; i++) {
    //   l.push(e.target.value)
    // }
    // setList(l)
    
    startTransition(()=> {
      // 5. 直接将大列表渲染的操作放在useTransition函数内进行：
      const l = []
      for (let i = 0; i < LIST_SIZE; i++) {
        l.push(e.target.value)
      }
      setList(l)
    })
  }


  return <div>
    <input type="text" onChange={handleChange} value={input} />
    {/* 2. 直接将大列表渲染, 效率低下：在input框输入至少过2秒，页面才会展示： */}
    {/* {list.map((item, index) => {
      return <div key={index}>{item}</div>
    })} */}
    {/* 6. 必须配合 isPending使用，输入框才能流畅输入： */}
    { isPending ? 'loading...' : list.map((item, index) => {
      return <div key={index}>{item}</div>
    })}
  </div>
}
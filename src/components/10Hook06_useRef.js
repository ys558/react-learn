/**
 * @useRef
 * 主要作用是创建一个数据的引用，并让这个数据在 render 过程中始终保持不变。
 * 
 */
import React, { useRef } from 'react'

const UseRefHook = () => {
  const inputRef = useRef(null)

  return <div>
    <button onClick={() => inputRef.current.value ='' }>清空输入框</button>
    <br/>
    <input ref={ inputRef } />
  </div>
}

export default UseRefHook

// export function ReactEcharts(props) {
//   const {option, loading} = props
//   const container = useRef(null)
//   const chart = useRef(null)
  
//   useEffect(() => {
//     const width = document.documentElement.clientWidth
//     const c = container.current
//     console.log(c)
//     c.style.width = `${width - 20}px`
//     c.style.height = `${(width - 20) * 1.2}px`
//     chart.current = echarts.init(c, 'dark')
//   }, []) // [] - mounted on first time

//   useEffect(() => {
//     chart.current.setOption(option)
//   }, [option]) // when option change 类似 vue 的 watch

//   useEffect(() => {
//     if (loading) chart.current.showLoading()
//     else chart.current.hideLoading()
//   }, [loading])

//   return (
//     <div ref={container}/>
//   )
// }

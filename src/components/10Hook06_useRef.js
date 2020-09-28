/**
 * @useRef
 * 主要作用是创建一个数据的引用，并让这个数据在 render 过程中始终保持不变。
 * 基本语法：const count = useRef(0)，
 * 读取用 count.current
 */
import React, {useRef, useEffect} from 'react'

// export function UseRefHook(props) {
//   const {option, loading} = props
//   const container = useRef(null)
//   const chart = useRef(null)
  
//   useEffect(() => {
//       const width = document.documentElement.clientWidth
//       const c = container.current
//       console.log(c)
//       c.style.width = `${width - 20}px`
//       c.style.height = `${(width - 20) * 1.2}px`
//       chart.current = echarts.init(c, 'dark')
//   }, []) // [] - mounted on first time

//   useEffect(() => {
//       chart.current.setOption(option)
//     }, [option]) // when option change 类似 vue 的 watch
  
//   useEffect(() => {
//     if (loading) chart.current.showLoading()
//     else chart.current.hideLoading()
//   }, [loading])
  
//     return <div ref={container}/>
// }


// export default UseRefHook

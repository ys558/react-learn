/**
 * v16.8新增项，状态钩子 Hook
 * 官方希望尽量少些class组件，多用fn组件，且用上该新特性替代
 */
import React, { useState, useEffect } from 'react'

// 4. 自定义钩子，
// 自定义钩子是一个函数，名称用use开头即可，函数内部还可以调用其他钩子
const useNum = () => {
    const [num, setNum] = useState('')
    // 还 调用了副作用钩子：
    useEffect(()=>{
        // 模仿异步调用：
        setTimeout(()=>{
            setNum(20)
        },2000)
    })
    return num
}

export default function Hook() {

    // const [state, setstate] = useState(initialState)
    // 1. 这里解构的[state, setstate]第一个参数相当于class里的state，第二个参数相当于class里的setState方法
    // initialState相当于class里的state的初始状态

    // 计数器：
    // useState(0)表示声明了初始状态值，返回的是数组，该数组有两种状态，[count, setCount]为的两种状态
    const [count, setCount] = useState(0)

    // 3. 副作用钩子useEffect(), 相当于函数组件的生命周期, 替代了componentDidMount、componentDidUpdate、componentWillUnmount生命周期的功能，合并成了一个API
    // 另外，第二个参数[count]表明可以设置依赖，[count]表示：只有当count变时，useEffect()才发生调用，如果不设置的话，页面里其他功能状态发生变化了，useEffect()都会发生变化，影响性能。因为[]其为数组，所以可以设置多个变量依赖，例如[count, fruit]
    useEffect(()=> {
        document.title = `点击${count}次`
    },[count])
    // useEffect会在每次渲染时都执行，如果仅打算执行一次，传递第二个参数为[]，如下：
    // 这种作用类似于componentDidMount
    useEffect(()=>{
        // 模拟异步api调用：
        console.log('api被调用了')
    },[])


    // 2. 多个状态：
    const [age] = useState([20])
    const [fruit, setFruit] = useState('banana')
    const [fruits, setFruits] = useState(['apple', 'kiwi'])
    const [newInputFruit, setNewInputFruit] = useState('')
    
    // 4. 自定义钩子
    const num = useNum()

    // 5. 其他钩子：
    // useContext、useReducer、useCallback、useMemo


    return (
        <div>
            {/* 2. 多个状态： */}
            <p>点击了{count}次</p>
            <button onClick={() => setCount(count + 1)}>点击</button>
            <p>年龄：{age}</p>
            <p>被点击的水果：{fruit}</p>
            <p>
                <input type="text"
                    value={newInputFruit}
                    onChange={e => setNewInputFruit(e.target.value)} />
                <button onClick={() => {setFruits( [newInputFruit, ...fruits] )}}>
                    新增水果
                </button>
            </p>
            <ul>
                {fruits.map(f =>(
                    <li key={f} onClick={() => setFruit(f)} >
                        {f}
                    </li>)
                )}
            </ul>

            {/* 4. 自定义钩子 */}
            <h2>Num为：{num?num: `加载中，请稍等...`}</h2>
        </div>
    )
}

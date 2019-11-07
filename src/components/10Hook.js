/**
 * v16.8新增项，Hook
 * 官方希望尽量少些class组件，多用fn组件，且用上该新特性替代
 */
import React, { useState } from 'react'

export default function Hook() {

    // const [state, setstate] = useState(initialState)
    // 1. 这里解构的[state, setstate]第一个参数相当于class里的state，第二个参数相当于class里的setState方法
    // initialState相当于class里的state的初始状态
    // 计数器：
    // useState(0)表示声明了初始状态值，返回的是数组，该数组有两种状态，[count, setCount]为的两种状态
    const [count, setCount] = useState(0)

    // 2. 多个状态：
    const [age] = useState([20, 30])
    const [fruit, setFruit] = useState('banana')
    const [fruits, setFruits] = useState(['apple', 'kiwi'])
    const [newInputFruit, setNewInputFruit] = useState('')
    

    return (
        <div>
            <p>点击了{count}次</p>
            <button onClick={() => setCount(count + 1)}>点击</button>
            <p>年龄：{age}</p>
            <p>被点击的水果：{fruit}</p>
            <p>
                <input type="text"
                    value={newInputFruit}
                    onChange={e => setNewInputFruit(e.target.value)} />
                <button onClick={() => setFruits( [newInputFruit, ...fruits] )}>
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
        </div>
    )
}

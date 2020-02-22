
import React, { useState, useEffect } from 'react'


const useNum = () => {
    const [num, setNum] = useState('')

    useEffect(()=>{

        setTimeout(()=>{
            setNum(20)
        },2000)
    })
    return num
}

export default function Hook() {
    const [count, setCount] = useState(0)


    useEffect(()=> {
        document.title = `点击${count}次`
    },[count])

    useEffect(()=>{
        console.log('api被调用了')
    },[])

    const [age] = useState([20])
    const [fruit, setFruit] = useState('banana')
    const [fruits, setFruits] = useState(['apple', 'kiwi'])
    const [newInputFruit, setNewInputFruit] = useState('')
    const num = useNum()


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

            <h2>Num为：{num?num: `加载中，请稍等...`}</h2>
        </div>
    )
}

/**
 * @Hook
 * 钩子函数是令函数型组件取代传统class组件的一些函数的方法，须要更新到v16.8.6后才能使用
 * @useState钩子
 * 不编写class的情况下使用state及React的其他特性
 */
import React, { useState, useEffect }from 'react'
// 展示水果列表
const FruitList = ({fruits, onSetFruit}) => <ul>
	{fruits.map(fruit => <li key={fruit} onClick={()=> onSetFruit(fruit)}>
		{fruit}
	</li>)}
</ul>

// 添加水果
const AddFruitList = (props) => {
	const [pname, setPname] = useState('')
	const onAddFruit = e => {
		if (e.key === 'Enter'&& pname !== '') {
			props.onAddFruit(pname)
			setPname('')
	}};
	return <input type='text' value={pname}
		onChange={e => setPname(e.target.value)} 
		onKeyDown={onAddFruit} />
}

export default function HookUseState () {
	const [fruit, setFruit] = useState('')
	// const [fruits, setFruits] = useState(['apple','banana','durain'])

	// 模拟异步调用：
	const [fruits, setFruits] = useState([])
	useEffect(
		()=>{setTimeout(() => {setFruits(['🍎','🍉'])}, 1000)}
	,
	[]) // 依赖为空表示只执行一次

	// 设置页面标题副作用：
	useEffect(() => { document.title = fruit }, [fruit]);
	useEffect(()=> {
		const timer = setInterval(() => {
			console.log('msg')
		}, 1000)
		return () => { clearInterval(timer) }
	},[])

	return (
		<div>
			<p>{fruit === ''? 'choose fruit u like:': `u choose: ${fruit}`}</p>
			{/* 水果显示列表： */}
			<FruitList fruits={fruits} onSetFruit={setFruit} ></FruitList>
			<AddFruitList onAddFruit={pname => setFruits([...fruits, pname ])}/>
		</div>
	)
}


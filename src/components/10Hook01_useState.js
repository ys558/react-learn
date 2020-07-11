/**
 * @Hook
 * 钩子函数是令函数型组件取代传统class组件的一些函数的方法，须要更新到v16.8.6后才能使用
 * @useState钩子
 * 不编写class的情况下使用state及React的其他特性
 */
import React, { useState, useEffect } from 'react'

// 展示水果列表
const FruitList = ({ fruitsList, chooseFruit }) => {
	return <ul>
		{fruitsList.map((f, index) =><div key={index} >
			<li onClick={() => chooseFruit(f)}>{f}</li>
		</div>
		)}
	</ul>
}
// 添加水果列表：
const AddFruitList = ({ onAddFruit }) => {
	const [newFruit, addFruit] = useState('')
	return <input 
		// 1.1 <input type="text"/>先实现内部的双向数据绑定：value onChange
		type="text" value={newFruit} onChange={e => addFruit(e.target.value)}
		// 1.2 按下回车，触发水果列表改变, 移动端可以换成按钮
		onKeyDown={ e => {
			if (e.key === 'Enter' && newFruit !== '') {
				onAddFruit(newFruit)
				addFruit('')
			}
		}}
	/>
}

const HookUseState = () => {
	// 2. 展示所选的水果的钩子
	const [fruit, chooseFruit] = useState('')
	// 1. 展示及删除水果列表的钩子
	const [fruitsList, addFruit] = useState(['🍎', '🍇'])

	return (
		<div>
			{/* 2. 展示所选的水果的钩子  */}
			<p>click fruit to choose : {fruit}</p>
			{/* 1. 展示及删除水果列表的钩子 */}
			<FruitList 
				fruitsList={fruitsList} 
				chooseFruit={chooseFruit}
				// 3.
				fruit={fruit}
			/>
			<AddFruitList 
				fruitsList={fruitsList}
				onAddFruit={i => addFruit([...fruitsList, i])} 
			/>
		</div>
	)
}

export default HookUseState
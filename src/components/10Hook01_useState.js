/**
 * @Hook
 * 钩子函数是令函数型组件取代传统class组件的一些函数的方法，须要更新到v16.8.6后才能使用
 * @useState钩子
 * 不编写class的情况下使用state及React的其他特性
 */
import React, { useState } from 'react'

// 展示水果列表
export const FruitList = ({ fruits, chooseFruit, setFruits }) => {
	const delFruit = index => {
		const temp = [...fruits]
		temp.splice(index, 1)
		setFruits(temp)
	}
	return <ul>
		{fruits.map((f, index) =><div key={index} >
			<li onClick={() => chooseFruit(f)}>{f}</li>
			<button onClick={()=> delFruit(index)}>delete</button>
		</div>
		)}
	</ul>
}
// 添加水果列表：
const AddFruit = ({ onAddFruit }) => {
	const [newFruit, setFruits] = useState('')
	return <input 
		type="text" value={newFruit} onChange={e => setFruits(e.target.value)}
		onKeyDown={ e => {
			if (e.key === 'Enter' && newFruit !== '') {
				onAddFruit(newFruit)
				setFruits('')
			}
		}}
	/>
}

const HookUseState = () => {
	const [fruit, chooseFruit] = useState('')
	const [fruits, setFruits] = useState(['🍎', '🍇','🍉','🍈'])

	return (
		<div>
			<p>click fruit to choose : {fruit}</p>
			<FruitList 
				fruits={fruits} 
				chooseFruit={chooseFruit}
				setFruits={setFruits}
				// 3.
				fruit={fruit}
			/>
			<AddFruit 
				fruits={fruits}
				onAddFruit={i => setFruits([...fruits, i])} 
			/>
		</div>
	)
}

export default HookUseState
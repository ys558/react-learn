import React, { useState, useEffect, useReducer }from 'react'
/**
 * @useReducer
 * useReducer是useState的可选项，常用于组件有复杂状态逻辑时抽离成独立函数，类似于redux中reducer概念。
 */

const fruitReducer = (state, action) => {
	switch (action.type) {
		case "init":
			return action.payload;
		case 'remove':
			return state.filter(i => i !== action.payload )
		case 'add':
			return [...state, action.payload]
		default:
			return state;
	}
}

const UseReducer = () => {
	const [fruits, dispatchFruits] = useReducer(fruitReducer, [])

	useEffect(()=> {
		// 模拟异步获取数据：
		setTimeout(()=> dispatchFruits({type: 'init', payload: ['🍌', '🍉','🍎', '🥝']}),800)
		// setTimeout func must be cleared when Component will unMount:
		return () => {}
	}, [])

	return (
		<div>
			<h1>UseReducer</h1>
			<h2>click fruit to delete:</h2>
			<FruitList fruits={fruits}
				onRemoveFruit={pname => dispatchFruits({ type: 'remove', payload: pname})}
			/>
			<AddFruite fruits={fruits} 
				onAddFruit={pname => dispatchFruits({ type: 'add', payload: pname}) }
			/>
		</div>
	)
}

const FruitList = ({fruits, onRemoveFruit}) => <>
	{fruits.map(fruit => 
	<div key={fruit}>
		<span onClick={()=> onRemoveFruit(fruit)} style={{'cursor': 'pointer'}}>{fruit}</span>
	</div>)}
</>

const AddFruite = ({onAddFruit}) => {
	const [newFruite, setNewFruite] = useState('')
	const addFruit = e => {
		if (e.key === 'Enter' && newFruite !== '') {
			onAddFruit(newFruite)
			setNewFruite('')
	}};
	return <>
	<input type="text" value={newFruite} 
		onChange={e=> setNewFruite(e.target.value) }
		onKeyDown={addFruit}
	/>
</>}

export default UseReducer
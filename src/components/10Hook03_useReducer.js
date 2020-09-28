import React, { useState, useEffect, useReducer }from 'react'
/**
 * @useReducer
 * useReducer是useState的可选项，常用于组件有复杂状态逻辑时抽离成独立函数，类似于redux中reducer概念。
 * 如果要一句话解释 useReducer 的话，它是用来代替 Redux 的，或者说，是一个加强版的 useState。
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
		setTimeout(()=> dispatchFruits({type: 'init', payload: ['🍌', '🍉','🍎', '🥝']}),500)
	}, [])

	return (
		<div>
			<h1>UseReducer</h1>
			<h2>click fruit to delete:</h2>
			<FruitList fruits={fruits} onRemoveFruit={pname => dispatchFruits({ type: 'remove', payload: pname})} />
			<AddFruite onAddFruit={pname => dispatchFruits({ type: 'add', payload: pname}) } />
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
	const addFruit = e => (e.key === 'Enter' && newFruite !== '') ? (onAddFruit(newFruite), setNewFruite('')) : null

	return <>
	<input type="text" value={newFruite} onChange={e=> setNewFruite(e.target.value) } onKeyDown={addFruit} />
</>}

export default UseReducer
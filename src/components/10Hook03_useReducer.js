import React, { useState, useEffect, useReducer }from 'react'
/**
 * @useReducer
 * useReducer是useState的可选项，常用于组件有复杂状态逻辑时抽离成独立函数，类似于redux中reducer概念。
 */

  
const FruitList = ({fruits, onSetFruit, onRemoveFruit}) => <>
	{fruits.map(fruit => 
	<div key={fruit}>
		<span onClick={()=> onSetFruit(fruit)}>{fruit}</span>
		<button onClick={()=> onRemoveFruit(fruit)}>x</button>
	</div>)}
</>

const FruitListAdd = (props) => {
	const [pname, setPname] = useState('')
	const onAddFruit = e => {
		if (e.key === 'Enter' && pname !== '') {
			props.onAddFruit(pname)
			setPname('')
	}};
	return <input type='text' value={pname} onChange={e => setPname(e.target.value)} 
		onKeyDown={onAddFruit} />
}


const fruitReducer = (state, action) => {
	switch (action.type) {
		case "init":
			return action.payload;
		case "add":
			return [...state, action.payload];
		case 'remove':
			return state.filter(i => i !== action.payload )
		default:
			return state;
	}
}

export default function HookUseReducer () {
	const [fruit, setFruit] = useState('')
	// const [fruits, setFruits] = useState([])
	// useEffect(()=>{setTimeout(() => {setFruits(['香蕉','西瓜'])}, 1000)} ,[])
	
	// 参数1是reducer
	// 参数2是初始值[]
	const [fruits, dispatchFruits] = useReducer(fruitReducer, [])
	useEffect(()=>{
		dispatchFruits({type: 'init', payload: ['🍌', '🍉','🍎', '🥝']})
	},[])

	return (
		<div>
			<p>{fruit === ''? 'choose fruit u like:': `u choose: ${fruit}`}</p>
			<FruitList fruits={fruits} onSetFruit={setFruit} 
				onRemoveFruit={pname => dispatchFruits({ type: 'remove', payload: pname})}
			/>
			<FruitListAdd onAddFruit={pname => dispatchFruits({ type: 'add', payload: pname})}/>
		</div>
	)
}



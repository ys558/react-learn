import React, { useState, useEffect, useReducer, useContext }from 'react'
/**
 * @useContext
 * 在函数组件中导入上下文。
 */
//1. 创建上下文：
const Context = React.createContext();
const Provider = Context.Provider

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

const UseContext = () => {
	const [fruits, dispatchFruits] = useReducer(fruitReducer, [])

	useEffect(()=> {
		setTimeout(()=> dispatchFruits({type: 'init', payload: ['🍌', '🍉','🍎', '🥝']}),800)
		return () => {}
	}, [])

	return (
		// 2. Provider这里提供值：
		<Provider value={{fruits, dispatchFruits}}>
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
		</Provider>
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
	const {dispatchFruits} = useContext(Context)
	const addFruit = e => {
		if (e.key === 'Enter' && newFruite !== '') {
			// onAddFruit(newFruite)

			// 4. 用dispatchFruits直接派发动作，不需要props传过来的动作进行更改：
			dispatchFruits({type: 'add', payload: newFruite})
			setNewFruite('')
	}};
	return <>
	<input type="text" value={newFruite} 
		onChange={e=> setNewFruite(e.target.value) }
		onKeyDown={addFruit}
	/>
</>}


export default UseContext

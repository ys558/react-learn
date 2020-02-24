import React, { useState, useEffect, useReducer, useContext }from 'react'
/**
 * @useContext
 * 在函数组件中导入上下文。
 * @自定义钩子
 * https://zh-hans.reactjs.org/docs/hooks-custom.html
 */
//1. 创建上下文：
const Context = React.createContext();

const FruitList = ({fruits, onSetFruit, onRemoveFruit}) => <>
	{fruits.map(fruit => 
	<div key={fruit}>
		<span onClick={()=> onSetFruit(fruit)}>{fruit}</span>
		<button onClick={()=> onRemoveFruit(fruit)}>x</button>
	</div>)}
</>

const FruitListAdd = (props) => {
	const [pname, setPname] = useState('')
	// 3. 直接解构出dispatch
	const {dispatchFruits} = useContext(Context)
	const onAddFruit = e => {
		if (e.key === 'Enter' && pname !== '') {
			// props.onAddFruit(pname)

			// 4. 用dispatchFruits直接派发动作，不需要props传过来的动作进行更改：
			dispatchFruits({type:'add', payload: pname})
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
	const [fruits, dispatchFruits] = useReducer(fruitReducer, [])
	useEffect(()=>{
		dispatchFruits({type: 'init', payload: ['🍌', '🍉','🍎', '🥝']})
	},[])

	return (
	// 2.这里放置Provider, 提供值
	<Context.Provider value={{fruits, dispatchFruits}}>
		<div>
			<p>{fruit === ''? 'choose fruit u like:': `u choose: ${fruit}`}</p>
			<FruitList fruits={fruits} onSetFruit={setFruit} 
				onRemoveFruit={pname => dispatchFruits({ type: 'remove', payload: pname})}
			/>
			{/* <FruitListAdd onAddFruit={pname => dispatchFruits({ type: 'add', payload: pname})}/> */}
			{/* 这里不再需要给FruitAdd传递状态mutation函数，实现了解耦 */}
			<FruitListAdd />
		</div>
	</Context.Provider>
	)
}



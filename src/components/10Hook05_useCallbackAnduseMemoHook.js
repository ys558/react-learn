/**
 * @自定义Hook
 * 自定义 Hook 必须以 “use” 开头。这个约定非常重要。不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 Hook 的规则。
 * 在两个组件中使用相同的 Hook 不共享state。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。
 */
import React, {useEffect,useState, useCallback, useMemo} from 'react'


export const HookUseMemo = () => {
	const [count, setCount] = useState(0)
	const [val, setVal] = useState('')

	// 1. 问题所在:
	// const expensive = () => {
	// /*即使input改变和count无关,但他们处于同一个界面, input输入值时也会触发console.log('computed')*/
	// 	console.log('computed')
	// 	let sum = 0;
	// 	for (let i = 0; i < count*100; i++) {
	// 		sum +=1
	// 	}
	// 	return sum
	// }

	// 2. 使用useMemo进行优化:
	const expensive = useMemo(() => {
		console.log('compute')
		let sum = 0;
		for (let i = 0; i < count*100; i++) {
			sum +=1
		}
		return sum
	}, [count])

	return <div>
	{/* 1.问题所在:  */}
	{/* <h3>{count}, {expensive()}</h3>
		<h3>input输入时, 也会触发expensive()函数执行console.log('computed'):&nbsp;{val}</h3> */}

	{/* 2. 使用useMemo进行优化: */}
	<h3>{count}, {expensive}</h3>
	<h3>input输入时,再不会影响+1的执行,页面只会局部刷新,不再打印console.log('compute'):{val}</h3>
		<div>
			<button onClick={()=> setCount(count + 1)}>+1</button>
			<input onChange={e=> setVal(e.target.value)} value={val}/>
		</div>
	</div>
}


export const HookUseCallback = () => {
	const [count, setCount] = useState(0)

	// 可将callback作为返回值: 绑定父组件的count
	const callback = useCallback(() => count, [count])

	return <div>
	<h3>{count}</h3>
	<Child callback={callback} />
		<div>
			<button onClick={()=> setCount(count + 1)}>+1</button>
		</div>
	</div>
}

const Child = ({callback}) =>{
	// 将callback作为初始值: 
	const [count, setCount] = useState(()=> callback())
	useEffect(() => setCount(callback()), [callback])
	
	return <div onClick={()=> setCount(callback())}>
		Child count: {count}
	</div>
}
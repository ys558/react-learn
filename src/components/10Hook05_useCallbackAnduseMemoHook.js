/**
 * @UseMeno
 * @UseCallback
类似与 Vue 的计算属性 computed，useMemo 具有缓存，依赖改变才重新渲染的功能。
跟它的小弟 useCallback 的唯一区别是：useMemo可以缓存所有对象，useCallback只能缓存函数。
useCallback(x => log(x), [m]) 等价于 useMemo(() => x => log(x), [m])
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

	// 2. 使用useMemo进行优化: useMemo 具有缓存，依赖改变才重新渲染的功能。
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
		<span>
			父组件计数:: {count}
			<button onClick={()=> setCount(count + 1)}>parent count +1</button>
		</span>
		<ChildOfCallback callback={callback} />
	</div>
}

const ChildOfCallback = ({callback}) =>{
	// 将callback作为初始值: 
	const [count, setCount] = useState(()=> callback())
	useEffect(() => setCount(callback()), [callback])
	
	return <div>
		子组件计数:: {count}
	</div>
}
/**
 * @UseMeno
 * @UseCallback
类似与 Vue 的计算属性 computed，useMemo 具有缓存，依赖改变才重新渲染的功能。
跟它的小弟 useCallback 的唯一区别是：useMemo可以缓存所有对象，useCallback只能缓存函数。
useCallback(x => log(x), [m]) 等价于 useMemo(() => x => log(x), [m])
 */
// import React, {useEffect,useState, useCallback, useMemo} from 'react'


import React, { FC, useCallback, useMemo, useState } from 'react';
// export const HookUseMemo = () => {
// 	const [count, setCount] = useState(0)
// 	const [inputVal, setInputVal] = useState('')

// 	// 2. 使用useMemo进行优化: useMemo 具有缓存，依赖改变才重新渲染的功能。
// 	const expensive = useMemo(() => {
// 		console.log('compute')
// 		let sum = 0;
// 		return sum
// 	}, [count])

// 	return <div>
// 	{/* 2. 使用useMemo进行优化: */}
// 	<h3>{count}, {expensive}</h3>

// 	<h3>input输入的指:{inputVal}</h3>
// 		<div>
// 			<button onClick={()=> setCount(count + 1)}>+1</button><br/>
// 			<input onChange={e=> setInputVal(e.target.value)} value={inputVal}/>
// 		</div>
// 	</div>
// }


// export const HookUseCallback = () => {
// 	const [count, setCount] = useState(0)

// 	// 可将callback作为返回值: 绑定父组件的count
// 	const callback = useCallback(() => count, [])

// 	return <div>
// 		<span>
// 			父组件计数:: {count}
// 			<button onClick={()=> setCount(count + 1)}>parent count +1</button>
// 		</span>
// 		<ChildOfCallback callback={callback} />
// 	</div>
// }

// const ChildOfCallback = ({callback}) =>{
// 	// 将callback作为初始值: 
// 	const [count, setCount] = useState(()=> callback())
// 	useEffect(() => setCount(callback()), [callback])
	
// 	return <div>
// 		子组件计数:: {count}
// 	</div>
// }

export const CallBackAndMeno = (props) => {
  const [count, setCount] = useState(0);

  const isEvenNumber = useMemo(() => {
		// 用于缓存除了useState函数之外的东西：
    return count % 2 === 0;
  }, [count]);

  const onClick = useCallback(() => {
		// 用于缓存useState函数：
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <div>{count} is {isEvenNumber ? 'even':'odd'} number</div>
      <button onClick={onClick}>+</button>
    </div>
  );
};

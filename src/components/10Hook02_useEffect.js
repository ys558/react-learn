import React, { useState, useEffect }from 'react'
/**
 * @useEffect副作用钩子
 * 数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。
 * ！！使用注意点
 * 函数式组件中异步操作，定时器，dom操作等需要用到副作用钩子
 */
	
// 展示水果列表
const FruitList = ({fruits, onSetFruit}) => <ul>
	{fruits.map(fruit => <li key={fruit} onClick={()=> onSetFruit(fruit)}>
		{fruit}
	</li>)}
</ul>

// 添加水果
const AddFruitList = (props) => {
	const [pname, setPname] = useState('')
	const onAddFruit = e => {
		if (e.key === 'Enter'&& pname !== '') {
			props.onAddFruit(pname)
			setPname('')
	}};
	return <input type='text' value={pname}
		onChange={e => setPname(e.target.value)} 
		onKeyDown={onAddFruit} />
}

export default function HookUseEffect () {
	const [fruit, setFruit] = useState('')

	// 模拟异步调用：
	const [fruits, setFruits] = useState([])
		// ！useEffect的回调函数不能是异步的函数，而且也不能return一个异步函数，因为异步函数本质上是一个promise，得用.then()获得，如果是使用了异步，会报错如下两则：
	// Warning: An effect function must not return anything besides a function, which is used for clean-up. 
	/**
	index.js:1406 Warning: An effect function must not return anything besides a function, which is used for clean-up.
	It looks like you wrote useEffect(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:
	useEffect(() => {
		async function fetchData() {
			// You can await here
			const response = await MyAPI.getData(someId);
			// ...
		}
		fetchData();
	}, [someId]); // Or [] if effect doesn't need props or state
	*/ 	
	useEffect(
		()=>{setTimeout(() => {setFruits(['香蕉','西瓜'])}, 1000)}
	,
	[]) // 依赖为空表示只执行一次

	// 设置页面标题副作用：
	useEffect(() => { document.title = fruit }, [fruit]);
	useEffect(()=> {
		const timer = setInterval(() => {
			console.log('msg')
		}, 1000)
		return () => { clearInterval(timer) }
	},[])

	return (<div>
		<p>{fruit === ''? 'choose fruit u like:': `u choose: ${fruit}`}</p>
		{/* 水果显示列表： */}
		<FruitList fruits={fruits} onSetFruit={setFruit} ></FruitList>
		<AddFruitList onAddFruit={pname => setFruits([...fruits, pname ])}/>
	</div>)
}



// 模拟取接口：
function FetchData() { 
	const [data, dataSet] = useState(false)

	const fetchMyAPI = async () => {
		try{
			let response = await fetch('api/data')
			response = await response.json()
			dataSet(response)
		}catch (e){
			console.log(e)
		}
	}

	useEffect(() => {fetchMyAPI()}, []);
	return <div>{data}</div>
}

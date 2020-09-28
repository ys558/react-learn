import React, { useState, useEffect }from 'react'
/**
 * @useEffect副作用钩子
 * 1. 作为 componentDidMount 使用，第二个参数为空数组 []
	 2. 作为 componentDidUpdate 使用，第二个参数为指定依赖
   3. 作为 componentWillUnmount 使用，通过 return
 */
	
// 展示水果列表
const FruitList = ({fruits, onSetFruit}) => <ul>
	{fruits.map(fruit => <li key={fruit} onClick={()=> onSetFruit(fruit)}>
		{fruit}
	</li>)}
</ul>

export default function HookUseEffect () {
	const [fruit, setFruit] = useState('')
	// const [fruits, setFruits] = useState(['apple','banana','durain'])

	const [fruits, setFruits] = useState([])
	
	// 1. 作为 componentDidMount 使用，第二个参数为空数组 [], 表示只执行一次
	useEffect( ()=>{setTimeout(() => {setFruits(['香蕉','西瓜'])}, 2000)}, [])

	// 2. 作为 componentDidUpdate 使用，第二个参数为指定依赖
	useEffect(() => { document.title = fruit }, [fruit]);

	// 3. 作为 componentWillUnmount 使用，通过 return
	useEffect(()=> {
		const timer = setInterval(() => {
			console.log('msg')
		}, 1000)
		return () => { clearInterval(timer) }
	})

	return (<div>
		<p>{fruit === ''? 'choose fruit u like:': `u choose: ${fruit}`}</p>
		{/* 水果显示列表： */}
		<FruitList fruits={fruits} onSetFruit={setFruit} ></FruitList>
	</div>)
}


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


// // 模拟取接口：
// function FetchData() { 
// 	const [data, dataSet] = useState(false)

// 	const fetchMyAPI = async () => {
// 		try{
// 			let response = await fetch('api/data')
// 			response = await response.json()
// 			dataSet(response)
// 		}catch (e){
// 			console.log(e)
// 		}
// 	}

// 	useEffect(() => {fetchMyAPI()}, []);
// 	return <div>{data}</div>
// }

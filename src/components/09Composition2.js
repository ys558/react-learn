import React from 'react'
/**
 * @Children可以是任意的js对象也可以当做函数执行
 */
const api = {
	getUser() {
		return { name: 'hehe', age: 20 }
	}
}

const Fetcher = props => {
	// 1. 利用props.apiName键值选择器[]拿到api里函数的名字
	const user = api[props.apiName]();
	// 2.返回的children()对应变成函数
	return props.children(user)
}

export default class Composition2 extends React.Component {
	render() {
		return <div>
			{/* 2. <Fetcher></Fetcher>包的children是一个函数 */}
			<Fetcher apiName='getUser'>
				{({ name, age })=> (
					<p>
						{name}--{age}
					</p>
				)}
			</Fetcher>
		</div>
	}
}
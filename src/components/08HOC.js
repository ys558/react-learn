import React, { Component } from 'react'

/**
 * @高阶组件的作用
 */
export default class HOC extends Component {
	render() {
		return (
			<div>
				{/* 0. 自定义组件<Kkb></Kkb>的首字母必须大写，要不会报错： */}
				{/* <Kkb stage='React'></Kkb> */}

				{/* 4. 将上面<Kkb></Kkb>换为包装后的<NewKkb></NewKkb> */}
				<NewKkb stage='React'></NewKkb>
			</div>
		)
	}
}

// 1. 从父组件传来的props只有state属性，而name属性必须从外部api接口获得，此时须要对Kkb组件进行扩展
const Kkb = props => <div>{props.stage}--{props.name}</div>

// 2. 对上面的Kkb组件扩展：接收Comp后返回<Comp></Comp>, 
const KkbWithName = Comp => {
	const api = 'HOC课程'
	// Kkb为上面的Kkb组件, 将整个组件解构{...Kkb}放在Comp里；而name属性这里为新定义属性，从api处获得：
	return Kkb => <Comp {...Kkb} name={api}></Comp>
}

// 3. 包装使用：
const NewKkb=KkbWithName(Kkb)
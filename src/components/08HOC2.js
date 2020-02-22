import React, { Component } from 'react'

/**
 * @高阶组件的扩展和链式调用
 * @组件里返回class组件_重写生命周期函数
 * @链式调用
 * @装饰器的使用
 * npm install --save-dev babel-plugin-transform-decorators-legacy
 * config-overrides.js
 */
export default class HOC2 extends Component {
	render() {
		return (
			<div>
				<NewKkb stage='React2'></NewKkb>
			</div>
		)
	}
}

const Kkb = props => <div>{props.stage}--{props.name}</div>

const KkbWithName = Comp => {
	const api = 'HOC课程2'
	return class extends React.Component{
		// 重写生命周期函数：

		componentDidMount(){ console.log('do sth.') }
		render(){
			// {...this.props}相当于上面的Kkb组件：把整个Kkb解构并放进<comp></comp>里：
			return <Comp {...this.props} name={api} ></Comp>
		}
	}
}

const withLog = Comp => {
	console.log(`${Comp.name}渲染了`)
	// props相当于传进来要强化的组件：
	return props => <Comp {...props}></Comp>
}

// 链式调用：可以多次调用：
const NewKkb=withLog(KkbWithName(withLog(Kkb)))
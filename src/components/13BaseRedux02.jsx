/**
 * 三、Redux中间件的使用：
 * 12. 中间件使用，这里介绍两个中间件redux-thunk处理异步操作，redux=logger
 * 	12.1 npm i --save redux-thunk redux-logger
 *  12.2 见src\components\13BaseRedux02.jsx注释
 *  12.3 做异步操作：
 *  12.4 
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
// 12.4 改写原来的mapDispatchToProps
import {plus, minus, asyncPlus} from '../store/counter.redux'

const mapStateToProps = state => ({num: state})
// 12.4 改写原来的mapDispatchToProps
const mapDispatchToProps = { plus, minus, asyncPlus }

// connect(映射state状态，映射dispatch方法)(要执行的函数或类组件)
@connect( mapStateToProps, mapDispatchToProps )
class BaseRedux02 extends Component {
	render(){
		const { num, minus, plus, asyncPlus} = this.props
		return ( 
			<div>
				<p>{num}</p>
				<button onClick={plus}>+</button>
				<button onClick={minus}>-</button>
				<button onClick={asyncPlus}>async+</button>
			</div>
		)
	}
}
export default BaseRedux02
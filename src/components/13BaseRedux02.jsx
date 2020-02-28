/**
 * 三、Redux中间件的使用：
 * 12. 中间件使用，这里介绍两个中间件redux-thunk处理异步操作，redux=logger
 * 	12.1 npm i --save redux-thunk redux-logger
 *  12.2 见src\components\13BaseRedux02.jsx注释
 *  12.3 做异步操作：
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

// 12.4 改写原来的mapDispatchToProps
const mapStateToProps = state => ({num: state})
// 12.4 改写原来的mapDispatchToProps
const mapDispatchToProps = {
	// 12.3 同步action返回对象
	plus: (num) =>({ type: 'plus', payload: num }),
	minus: () => ({ type: 'minus' }),
	// 12.3 引入redux-thunk后, 异步action返回函数
	syncPlus: () => dispatch => setTimeout(()=> dispatch({type: 'plus'}),1000)
}

// connect(映射state状态，映射dispatch方法)(要执行的函数或类组件)
@connect( mapStateToProps, mapDispatchToProps )
class BaseRedux02 extends Component {
	render(){
		return ( 
			<div>
				<p>{this.props.num}</p>
				<button onClick={()=>this.props.plus(2)}>+2</button>
				<button onClick={this.props.minus}>-</button>
				<button onClick={this.props.syncPlus}>async+</button>
			</div>
		)
	}
}
export default BaseRedux02
/**
 * 三、Redux中间件的使用：
 * 12. 中间件使用，这里介绍两个中间件redux-thunk处理异步操作，redux=logger
 * 	12.1 npm i --save redux-thunk redux-logger
 *  12.2 见src\components\13BaseRedux02.jsx注释
 *  12.3 做异步操作：
 * 
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({num: state})
const mapDispatchToProps = {
	plus: () => ({ type: 'plus'}),
    minus: () => ({ type: 'minus'}),
    asyncPlus: () => dispatch => {
        // 12.3 模拟异步调用：
        setTimeout(()=>{
            dispatch({type: 'plus'})
        },900)
    }
}
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
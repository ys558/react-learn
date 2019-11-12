/**
 * 四、Redux模块化操作：
 * 13. 新建src\store\index.js
 * 14. 见src\store\index.js src\store\counter.redux.js注释
 * 15. 从外部导入并应用
 * 16. 多个reducers应用：combineReducers
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
// 15. 
import { plus, minus, asyncPlus } from '../store/index'

// const mapStateToProps = state => ({num: state})
// 16.3 
const mapStateToProps = state => ({num: state.counter})
// 15.
const mapDispatchToProps = { plus, minus, asyncPlus }
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

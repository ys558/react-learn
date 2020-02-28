/**
	* react和React进一步紧密结合的使用：
		7. npm i react-redux --save
		这个库只有两个api：
		Provider, 顶级组件，提供数据
		connect，高阶组件，提供数据和方法
 * 8. App.js里全局使用<Provider store={store}></Provider>包住组件, 或者直接在index.js用Provider包住<App />
 * 9. 定义mapStateToProps，mapDispatchToProps。将组件里耦合的方法剥离，将抽离的东西解构放入组件
 * 10. 这里不再需要4.1逐个文件里导入import store from '../store/store'，取而代之的是{connect}
 * 11. 另一种：装饰器写法
 * 12. action添加payload
 */
import React, { Component } from 'react'
// 10. 这里不再需要4.1逐个导入import store from '../store/store'，取而代之的是{connect}
// import store from './13BaseReduxStore'
import { connect } from 'react-redux'

// 9、 如不写mapDispatchToProps定义action, reudx会自动创建dispatch 
const mapStateToProps = state => ({num: state})
// 完整写法:
// const mapDispatchToProps = dispatch => ({
// 	plus: () => dispatch({ type: 'plus'}),
// 	minus: () => dispatch({ type: 'minus'})
// })
// 简略写法:
// const mapDispatchToProps = {
// 	plus: ({ type: 'plus' }),
// 	minus: ({ type: 'minus' })
// }
// 12. 添加payload:
const mapDispatchToProps = {
	plus: (num) =>({ type: 'plus', payload: num }),
	minus: () => ({ type: 'minus' })
}

// 11、 装饰器写法：
@connect( mapStateToProps, mapDispatchToProps )
// 11. 这里改为class，用connect进行注入
class BaseRedux extends Component {
	render(){
		const { num, minus, plus, dispatch } = this.props
		// 如不写mapDispatchToProps定义action, reudx会自动创建dispatch:  
		// console.log(this.props)
		// {num: 0, dispatch: ƒ}

		return ( 
			<div>
				<p>{num}</p>
				{/* 9、 如不写mapDispatchToProps定义action, reudx会自动创建dispatch, 但这样这里就须要这么写: */}
				{/* <button onClick={()=> dispatch({type: 'plus'})}>+</button>
				<button onClick={()=> dispatch({type: 'minus'})}>-</button> */}
				<button onClick={ () => plus() }>+</button>
				<button onClick={ () => minus() }>-</button>
				{/* 12. 添加payload: */}
				<button onClick={ () => plus(2) }>+2</button>
			</div>
		)
	}
}

export default BaseRedux
// 非装饰器写法:
// export default connect(mapStateToProps, mapDispatchToProps)(BaseRedux)
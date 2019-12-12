/**
 * 一、Redux基础使用步骤：
		以下要注意几个重要api：
		reduer
		createStore()
		getState()
		dispatch
		subscribe()
 * 1. npm i redux --save
 * 2. 新建文件：13BaseReduxStore.js
 * 3. store.js里的内容见该文件：xxxReducer createStore() 
 * 4. 应用的地方引用，如下: store.getStore(), store.dispatch({type: 'yyy'})
 * 5. 让其生效需更改./index.js,  store.subscribe()
store.subscribe(()=>ReactDOM.render(<App />, document.getElementById('root')))
 * 6. 页面生效

	二、* 和React进一步紧密结合的使用：
		以下要注意几个重要api：
		Provider, 顶级组件，提供数据
		connect，高阶组件，提供数据和方法
 * 7. npm i react-redux --save
 * 8. App.js里全局使用<Provider store={store}></Provider>包住组件
 * 9. 定义mapStateToProps，mapDispatchToProps。将组件里耦合的方法剥离，将抽离的东西解构放入组件
 * 10. 这里不再需要4.1逐个文件里导入import store from '../store/store'，取而代之的是{connect}
 * 11. 另一种：装饰器写法
 */
import React, { Component } from 'react'
// 10. 这里不再需要4.1逐个导入import store from '../store/store'，取而代之的是{connect}
// import store from './13BaseReduxStore'
import { connect } from 'react-redux'

// export default function BaseRedux (){
// 	return (
// 		<div>
// 			{/* 4. 应用的地方引用，如下: store.getStore(), store.dispatch({type: 'yyy'}) */}
// 			<p>{store.getState()}</p>
// 			<button onClick={() => store.dispatch({type: 'minus'})}>-</button>
// 			<button onClick={() => store.dispatch({type: 'plus'})}>+</button>
// 		</div>
// 	)
// }

// 9、 
const mapStateToProps = state => ({num: state})
const mapDispatchToProps = {
	plus: () => ({ type: 'plus'}),
	minus: () => ({ type: 'minus'})
}
// // 9.将抽离的东西解构放入组件
// const BaseRedux = ({num, plus, minus}) => {
// 	return ( 
// 		<div>
// 			{/* 9. 在组件中使用： */}
// 			<p>{num}</p>
// 			<button onClick={plus}>+</button>
// 			<button onClick={minus}>-</button>
// 		</div>
// 	)
// }
// // 10. 这里使用connect：连接
// export default connect( mapStateToProps, mapDispatchToProps )(BaseRedux)



// 11、 装饰器写法：
@connect( mapStateToProps, mapDispatchToProps )
// 11. 这里改为class，用connect进行注入
class BaseRedux extends Component {
	render(){
		const { num, minus, plus} = this.props
		return ( 
			<div>
				<p>{num}</p>
				<button onClick={plus}>+</button>
				<button onClick={minus}>-</button>
			</div>
		)
	}
}
export default BaseRedux
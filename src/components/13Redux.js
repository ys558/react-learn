/**
 * vuex和redux:
 * 1. mutation和reducers
 * 2. redux只有一个action， dispatch
 * 
 * 基础使用步骤：
 * 1. npm i redux --save
 * 2. 新建目录和文件：/src/store/store.js
 * 3. store.js里的内容见该文件：xxxReducer createStore() 
 * 4. 应用的地方引用，如下: store.getStore(), store.dispatch({type: 'yyy'})
store.subscribe(()=>ReactDOM.render(<App />, document.getElementById('root')))
 * 5. 让其生效需更改./index.js,  store.subscribe()
 * 6. 页面生效
 * 
 * 和React进一步紧密结合的使用：
 * 7. npm i react-redux --save
 * 8. App.js里全局使用<Provider store={store}>
 * 9. 这里不再需要4.1逐个导入import store from '../store/store'
 * 10. 解构并使用
 * 11. 装饰器写法
 * 12. 中间件使用，这里介绍两个中间件redux-thunk处理异步操作，redux=logger
 * 	12.1 npm i --save redux-thunk redux-logger  
 * 	12.2 见store.js	
 * 13. 重构异步redux状态管理
 * 	13.1 新建'../store/index.js', 将'../store/store.js'里的counterReducer剥离
 * 	13.2 新建'src/store/count.redux.js', 将counterReducer写入并exports导出
 * 	13.3 剥离action creator,写到src\store\count.redux.js里，并在这里导入
 * 14. combineReducers，将多个reduer合成一个
 * 	14.1 src\store\store.js里，导入，并将counterReducer加入，可重命名counterReducer为counter
 * 	14.2 
 */

import React, { Component } from 'react'
// 4.1 导入store.js
// import store from '../store/store'

// * 	13.3 剥离action creator,写到src\store\count.redux.js里，并在这里导入
import {plus, minus, asyncAdd} from '../store/count.redux'


// 9.1 
import {connect} from 'react-redux'
// 9.2 映射函数：
// 9.2.1 将store.js里的状态state映射到属性中：
// const mapStateToProps = state => ({ num: state })

// 14.2 这里的state改为state.counter
const mapStateToProps = state => ({ num: state.counter })


// 9.2.2 将store.js里的动作action映射到属性中：
// const mapDispatchToProps = {
//     plus: () => ({type: 'plus'}),
// 		minus: () => ({type: 'minus'}),
// 		// 12.3 异步操作：
// 		asyncAdd: () => dispatch => {
// 			setTimeout(()=>{dispatch({type:'plus'}, 1000)})
// 		}
// }

// * 	13.3 剥离action creator,写到src\store\count.redux.js里，并在这里导入
const mapDispatchToProps = {plus, minus, asyncAdd}



// export default ReduxDemo = ({num, plus, minus}) => {
//     return (
//         <div>
//             {/* 4.2 用getState()获得state的数据 */}
//             <p>{store.getState()}</p>
//             <div>
//                 {/* 4.3 store.dispatch()更改数据，并且传入动作type：必须为sotre.js里定义好的type名字 */}
//                 <button onClick={()=> store.dispatch({type:'minus'})}>-</button>
//                 <button onClick={()=> store.dispatch({type:'plus'})}>+</button>
//             </div>
//         </div>
//     )
// }


// 9.4 将上面的映射解构传入({num, plus, minus})
// const ReduxDemo = ({num, plus, minus}) => {
//     return (
//         <div>
//             {/* 10. 直接在组件中应用： */}
//             <p>{num}</p>
//             <div>
//                 <button onClick={plus}>+</button>
//                 <button onClick={minus}>-</button>
//             </div>
//         </div>
//     )
// }
// // 9.3 利用connect()()这个工厂函数，将上面的两个映射函数mapStateToProps，mapDispatchToProps传入，和组件ReduxDemo传入一并进行处理：
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(ReduxDemo)


// 10. 装饰器写法：
@connect(mapStateToProps, mapDispatchToProps)
class ReduxDemo extends Component {
	render() {
		const {num, minus, plus, asyncAdd} = this.props
			return (
				<div>
					<p>{num}</p>
					<div>
						<button onClick={plus}>+</button>
						<button onClick={minus}>-</button>
						{/* 12.4 */}
						<button onClick={asyncAdd}>Asycn+</button>
					</div>
				</div>
			)
	}
}
export default ReduxDemo

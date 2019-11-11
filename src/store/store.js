// * 	14.1 src\store\store.js里，导入，
import { createStore, applyMiddleware, combineReducers } from 'redux'
// 12.2 导入中间件
import logger from 'redux-logger'
import thunk from 'redux-thunk'
// 13.1 新建'../store/index.js', 将'../store/store.js'里的counterReducer剥离
import { counterReducer } from './count.redux'

// 3.1 创建一个reducer：switch，外部传入两个参数，state和action
// const counterReducer = (state = 0, action) => {
//     switch(action.type) {
//         case 'plus':
//             return state + 1
//         case 'minus':
//             return state - 1
//         default:
//             return state
//     }
// }


// 13.1 新建'../store/index.js', 将'../store/store.js'里的counterReducer剥离



// 3.2 导入sotre并把上面的reducer放入：
// 12.2 使用中间件：注意，需要按照顺序，例如想先打印日志再使用异步，则logger, thunk
// const store = createStore(counterReducer, applyMiddleware(logger, thunk));

// 14.1 src\store\store.js里，导入，并将counterReducer加入，可重命名counterReducer为counter
const store = createStore(
    combineReducers({counter: counterReducer}), 
    applyMiddleware(logger, thunk)
);

export default store;
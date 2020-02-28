import {createStore } from 'redux'
// 12. 中间件的使用, thunk 异步中间件
import { applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'


// 对应src\components\13-01simpleRedux.jsx
const counterReducer = (state=0, action) => {
  const num = action.payload || 1;
  // 13.2 reducer 这里的switch函数,就是reducer的体现:
  switch (action.type) {
    case 'plus':
      return state + num;
    case 'minus':
      return state - num;
    default:
      return state
  }
}

// 12. 中间件的使用applyMiddleware(logger, thunk)
// 13.1 createStore
const store = createStore(counterReducer, applyMiddleware(logger, thunk))

export default store
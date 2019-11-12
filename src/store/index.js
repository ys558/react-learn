// 16. combineReducers
import {createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// 14. counterReducer剥离成独立模块，新建src\store\counter.redux.js
import { counterReducer } from './counter.redux'

// 11.
import {user} from './user.redux'

// const store02 = createStore(counterReducer, applyMiddleware(logger, thunk))
// 16.1 将多个reducers用combineReducers改造：
const store02 = createStore(
  // 16.2 这里可以加上命名空间：取个别名counter
  // 11.
  combineReducers({ counter: counterReducer, user }),
  applyMiddleware(logger, thunk)
)

export default store02
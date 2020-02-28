// 13 redux模块化 导入combineReducers
import {createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
// 13 redux模块化 把counterReducer独立出去导入:
import counterReducer from '../store/13counter.reducer'

// 13 redux模块化 combineReducers绑定导入的counterReducer, 可以指定一个简单些的名字counter:
const store = createStore(combineReducers({counter: counterReducer}), applyMiddleware(logger, thunk))

export default store
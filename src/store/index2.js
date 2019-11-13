import createSagaMiddleware from "redux-saga";
import {createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import { user } from './user.redux2'
// 1. 导入
import mySaga from "./saga";

// 1.1 创建saga中间件并注册：
const sagaMiddleware = createSagaMiddleware();
const storeWithSaga = createStore(
  combineReducers({ user }),
  // 1.1
  applyMiddleware(logger, sagaMiddleware)
);

// 1.2 中间件运行saga
sagaMiddleware.run(mySaga);
export default storeWithSaga;
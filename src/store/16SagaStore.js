import {createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import { user } from './16user.redux2'
// 1. 导入
import createSagaMiddleware from "redux-saga";
import mySagaListener from "./16saga";

// 1.1 创建saga中间件并注册：
const sagaMiddleware = createSagaMiddleware();
const storeWithSaga = createStore(
  combineReducers({ user }),
  // 1.1
  applyMiddleware(logger, sagaMiddleware)
);

// 1.2 中间件运行saga监听
sagaMiddleware.run(mySagaListener);
export default storeWithSaga;
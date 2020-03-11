// 16. combineReducers
import {createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// 11.
import { user } from './15user.redux'

const store15 = createStore(
  // 11.
  combineReducers({ user }),
  applyMiddleware(logger, thunk)
)

export default store15
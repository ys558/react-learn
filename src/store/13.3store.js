import {createStore} from 'redux'
import {applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {counterReducer} from './13.3counter'

const store = createStore(counterReducer, applyMiddleware(logger, thunk))

export default store;
import {createStore} from 'redux'
import {applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const counterReducer = (state=0, action) => {
  const num = action.payload || 1
  switch (action.type){
    case 'PLUS':
      return state + num
    case 'MINUS':
      return state - num
    default:
      return state
  }
}

const store = createStore(counterReducer, applyMiddleware(logger, thunk)) 

export default store;
// 12. 导入中间件：applyMiddleware
import {createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const counterReducer = (state=0, action) =>{
    switch (action.type) {
        case 'plus':
            return state +1
        case 'minus':
            return state -1
        default:
            return state
    }
}

// 12. 使用，注意，有顺序先后：这里先使用logger，再使用thunk
const store02 = createStore(counterReducer, applyMiddleware(logger, thunk))
export default store02
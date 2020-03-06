import { createStore, applyMiddleware, logger, thunk } from './13.3myRedux'

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

const asyncPlus = (dispatch, getState) => dispatch => {
  setTimeout(()=> dispatch({type: 'PLUS'}), 1000)
}
const store = createStore(counterReducer, applyMiddleware(logger, thunk))

export default store;
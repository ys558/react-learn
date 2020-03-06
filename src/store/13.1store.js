import {createStore} from 'redux'

const counterReducer = (state=0, action) => {
  switch (action.type){
    case 'PLUS':
      return state + 1
    case 'MINUS':
      return state - 1
    default:
      return state
  }
}

const store = createStore(counterReducer) 

export default store;
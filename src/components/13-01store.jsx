import {createStore} from 'redux'

// 对应src\components\13-01simpleRedux.jsx
const counterReducer = (state=0, action) => {
  switch (action.type) {
    case 'plus':
      return state + 1;
    case 'minus':
      return state -1;
    default:
      return state
  }
}

const store = createStore(counterReducer)

export default store
import { createStore } from 'redux'
import uuid from 'uuid/v4'

const initialState = {
  todos: [
    { id: uuid(), name: 'Go to the gym', complete: false },
    { id: uuid(), name: 'Do laundry', complete: true },
  ]
}

export const store = createStore(
  reducer,
  initialState,
  window.devToolsExtension && window.devToolsExtension()
)

const reducer = (state, {type, payload }) => {
  switch(action.type){
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload ]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === payload) ? {...todo, complete: !todo.complete } : todo)
      }
  }

}
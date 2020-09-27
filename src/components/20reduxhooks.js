import { createStore } from 'redux'
import { v4 } from 'uuid'

const initialState = {
  todos: [
    { id: v4(), name: 'Go to the gym', complete: false },
    { id: v4(), name: 'Do laundry', complete: true },
  ]
}

const reducer = ( state = initialState, { type, payload } ) => {
  switch(type){
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, payload ]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === payload) ? {...todo, complete: !todo.complete } : todo)
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== payload)
      }
    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  initialState,
  window.devToolsExtension && window.devToolsExtension()
)

export const addTodoAction = (todo) => ({
  type: 'ADD_TODO',
  payload: todo
})

export const toggleTodoAction = todoId => ({
  type: 'TOGGLE_TODO',
  payload: todoId
})

export const deleteTodoAction = todoId => ({
  type: 'DELETE_TODO',
  payload: todo
})
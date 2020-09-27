import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { addTodoAction, store, toggleTodoAction, deleteTodoAction } from './20reduxhooks'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { Checkbox } from 'antd'

const TodoInput = () => {
  const [todo, setTodo] = useState('')
  const dispatch = useDispatch()

  const onChange = e => setTodo(e.target.value)
  const onSubmit = e => {
    e.preventDefault()
    if (todo.trim() === '') return
    dispatch({
      type: 'ADD_TODO',
      payload: { id: v4(), name: todo, complete: false }
    })
    setTodo('')
  }

  return <form onSubmit={onSubmit}>
    <div className="form-div">
      <input type="text" name="todo" value={todo} onChange={onChange} />
      <button type="submit">Add Todo</button>
    </div>
  </form>
}

const TodoList = () => {
  const todos = useSelector(state => state.todos)
  const toggleTodo = useDispatch(todoID => toggleTodoAction(todoID))
  const deleteTodo = useDispatch(todoID => deleteTodoAction(todoID))

  return <ul className="todo-list">
    {todos.map(todo => (
      <div key={todo.id}>
        <input type="checkbox" 
          checked={todo.complete}
          onChange={toggleTodo.bind(null, todo.id)}
        />
        <span className={todo.complete? 'complete': null }>{todo.name}</span>
        <span className='delete-button' onClick={deleteTodo.bind(null, todo.id)}>x</span>
      </div>
    ))}
  </ul>
}



const ReduxwithHooks = props => {
  return (
    <Provider store={store} >   
      <div className='main'>
        <TodoInput/>
        <TodoList />
      </div>
    </Provider>
  )
}

ReduxwithHooks.propTypes = {

}

export default ReduxwithHooks

import React, { useReducer, useState } from 'react';
import './App.css';
import { reducer } from './reducer';
import { initialState } from './initialState';

function App() {
  const [newTodo, setNewTodo] = useState({
    item: '',
    completed: false,
  });

  const handleChange = e => {
    e.preventDefault()
    setNewTodo({ ...newTodo, item: e.target.value, id: Date.now() })
  }

  const deleteTodo = (e, id) => {
    e.preventDefault()
    dispatch({ type: 'DELETE_TODO', payload: id })
  }

  const completeTodo = (e, todo) => {
    e.preventDefault()
    dispatch({ type: 'COMPLETE_TODO', payload: todo})
  }

  const addTodo = (e) => {
    e.preventDefault()
    dispatch({ type: 'ADD_TODO', payload: newTodo })
    setNewTodo({
      item: '', 
      completed: false
    })
    e.target.reset()
  }

  const clearComplete = e => {
    e.preventDefault()
    dispatch({ type: 'CLEAR_COMPLETE' })
  }


  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('60', state)

  const todos = state.map(todo => {
      return (
        <div key={todo.id}>
          <h3>{todo.item}</h3>
          <button onClick={e => completeTodo(e, todo)}>Complete Todo</button>
          <button onClick={(e) => deleteTodo(e, todo.id)}>Delete Todo</button>
        </div>
          )
    })
 

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <form onSubmit={e => addTodo(e)}>
        <label>
          Add Todo   
          <input 
            type="text"
            placeholder="New Todo"
            onChange={handleChange}
          />
        <button type='submit'>Submit</button>
        </label>
      </form>
        {todos}
        <button onClick={e => clearComplete(e)}>Clear Completed</button>      
    </div>
  );
}

export default App;

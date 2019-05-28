import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Loader from './components/Loader/Loader';
import Context from './context/Context';
import Title from './components/Title/Title';
import AddTodo from './components/AddTodo/AddTodo';

import './index.scss';

const FilterTodos = React.lazy(() => import('./components/FilterTodos/FilterTodos'));
const TodoList = React.lazy(() => import('./components/TodoList/TodoList'));
const Nothing = React.lazy(() => import('./components/Nothing/Nothing'));

function App() {
  const [todos, setTodos] = useState([]);

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function addTodo(value) {
    setTodos(
      todos.concat([
        {
          id: 'ID-' + value.replace(/\s/g, ''),
          cls: 'todo-list__todo',
          paragraph: value,
          status: 'active'
        }
      ])
    );
  }

  return (
    <Context.Provider value={{ deleteTodo }}>
      <Title />
      <AddTodo addTodo={addTodo} />
      <React.Suspense fallback={<Loader />}>
        {todos
          ?
            <React.Fragment>
              <FilterTodos />
              <TodoList todos={todos} />
            </React.Fragment>
          : <Nothing cls='paragraph'>No tasks!</Nothing>
        } 
      </React.Suspense>
    </Context.Provider>
  );
}
const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);
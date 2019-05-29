import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Loader from './components/Loader/Loader';
import Context from './context/Context';
import Title from './components/Title/Title';
import AddTodo from './components/AddTodo/AddTodo';

import './index.scss';

const FilterTodos = React.lazy(() => import('./components/FilterTodos/FilterTodos'));
const TodoList = React.lazy(() => import('./components/TodoList/TodoList'));
const Nothing = React.lazy(() => import('./components/Nothing/Nothing'));

let countID = 0;

function App() {
  const [todos, setTodos] = useState([]);
  const [todosDeleted, setTodosDeleted] = useState([]);
  const [filters, setFilters] = useState([]);
  // const [status, setStatus] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch('./filters.json')
      .then(response => response.json())
      .then(filters => {
        setFilters(filters);
      })
  }, []);

  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(todos => {
        countID = todos.length;
        setTodos(todos.filter(item => item.status !== 'deleted'));
        setTodosDeleted(todos.filter(item => item.status === 'deleted'));
        setLoader(false);
      })
  }, []);

  useEffect(() => {
    document.title = todos.length > 1
      ? todos.length + ' tasks'
      : todos.length + ' task'
  }, [todos.length]);

  function handlerDeleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
    setTodosDeleted([...todosDeleted, ...todos.filter(todo => todo.id === id)]);
    console.log(todosDeleted);
  }

  function handlerAddTodo(value) {
    setTodos([
      ...todos,
      {
        id: ++countID,
        cls: 'todo-list__todo',
        paragraph: value.trim(),
        status: 'actived'
      }
    ]);
  }

  function handlerFilter(text) {
    alert(text);
  }

  function handlerSetStatus(st) {
    setTodos(todos.map(todo => todo.status = st));

    console.log(todos);
  }

  return (
    <Context.Provider>
      <Title
        cls='app__title'>
          Todo List with React Hooks
      </Title>
      <AddTodo
        onAddTodo={handlerAddTodo}
      />
      <React.Suspense
        fallback={<Loader />}>
          {todos.length
            ? <React.Fragment>
              <FilterTodos
                filters={filters}
                onFilter={handlerFilter}
              />
              <TodoList
                todos={todos}
                todosDeleted={todosDeleted}
                cls='app__todo-list'
                onDeleteTodo={handlerDeleteTodo}
                onSetStatus={handlerSetStatus}
              />
            </React.Fragment>
            : loader
              ? null
              : <Nothing
                  cls='app__paragraph'>
                    No tasks!
                </Nothing>
          }
      </React.Suspense>
    </Context.Provider>
  );
}
const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);
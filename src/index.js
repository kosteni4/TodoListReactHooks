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
  const [todosVisible, setTodosVisible] = useState([]);
  const [filters, setFilters] = useState([]);
  const [status, setStatus] = useState('all');
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
        setTodosVisible(todos.filter(item => item.status !== 'deleted'));
        setTodosDeleted(todos.filter(item => item.status === 'deleted'));
        setLoader(false);
      })
  }, []);

  useEffect(() => {
    document.title = todos.length > 1
      ? todos.length + ' tasks'
      : todos.length + ' task'
  }, [todos.length]);

  useEffect(() => {
    if (status === 'all') setTodosVisible(todos);
  }, [todos]);

  function handlerDeleteTodo(id, st) {
    handlerSetStatus(id, st);
    setTodos(todos.filter(todo => todo.id !== id));
    setTodosVisible(todosVisible.filter(todo => todo.id !== id));
    setTodosDeleted([
      ...todosDeleted,
      ...todos.filter(todo => todo.id === id)
    ]);
  }

  function handlerAddTodo(value) {
    setTodos([
      {
        id: ++countID,
        cls: 'todo-list__todo',
        paragraph: value.trim(),
        status: 'actived'
      },
      ...todos
    ]);
  }

  function handlerFilter(text) {
    switch (text) {
      case 'all':
        setStatus('all');
        return setTodosVisible(todos);

      case 'actived':
        setStatus('actived');
        return setTodosVisible(todos.filter(todo =>
          todo.status === 'actived'));

      case 'completed':
        setStatus('completed');
        return setTodosVisible(todos.filter(todo =>
          todo.status === 'completed'));

      case 'deleted':
        setStatus('deleted');
        return setTodosVisible(todosDeleted);

      default:
        setStatus('all');
        return setTodosVisible(todos);
    }
  }

  function handlerSetStatus(id, st) {
    setTodos(todos.map(todo => {
      if (todo.id === id) todo.status = st;
      return todo;
    }));
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
                cls='app__filter-todos'
                status={status}
                filters={filters}
                onFilter={handlerFilter}
              />
              <TodoList
                todos={todosVisible}
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
import React, {  useState } from 'react';
import ReactDOM from 'react-dom';
import Title from './components/Title/Title';
import AddTodo from './components/AddTodo/AddTodo';
import FilterTodos from './components/FilterTodos/FilterTodos';
import TodoList from './components/TodoList/TodoList';

import './index.scss';

function App() {
  const todoList = [
    {
      id: '#1',
      className: 'todo-list__todo',
      paragraph: 'task 1',
      status: 'active'
    },
    {
      id: '#2',
      className: 'todo-list__todo',
      paragraph: 'task 2',
      status: 'active'
    },
    {
      id: '#3',
      className: 'todo-list__todo',
      paragraph: 'task complete',
      status: 'complete'
    },
    {
      id: '#4',
      className: 'todo-list__todo',
      paragraph: 'task delete',
      status: 'delete'
    }
  ];

  const [todos, setTodos] = useState(todoList);

  return (
    <React.Fragment>
      <Title />
      <AddTodo addTodo={todoText => {
        const newTask = todoText.trim();
        if (newTask.length > 0) {
          setTodos([...todos, {
            id: '#' + newTask.replace(/\s/g, ''),
            className: 'todo-list__todo',
            paragraph: newTask,
            status: 'active'
          }]);
        }
      }}/>
      <FilterTodos />
      <TodoList
        todoList={todos}
        deleteTodo={todoIndex => {
          const newTodos = todos
            .filter((_, index) => index !== todoIndex);

          setTodos(newTodos);
        }}
      />
    </React.Fragment>
  );
}
const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);
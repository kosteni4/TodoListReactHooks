import React, { useEffect } from 'react';
import Todo from '../Todo/Todo'

import './TodoList.scss';

function TodoList(props) {

  const todos = props.todoList;
  const deleteTodo = props.deleteTodo;

  useEffect(() => {
    document.title = (todos.length > 1) ? todos.length + ' tasks' : todos.length + ' task';
  });

  return (
    <ul className='todo-list'>
      {todos.map((item, index) =>
        <Todo key={item.id}
              className={item.className}
              paragraph={item.paragraph}
              index={index.toString()}
              deleteTodo={deleteTodo}
        />
      )}
    </ul>
  );
}

export default TodoList;
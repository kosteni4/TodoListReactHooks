import React from 'react';
import Todo from '../Todo/Todo';

import './TodoList.scss';

function TodoList(props) {

  const todos = props.todos;
  const cls = props.cls;

  return (
    <ul className={cls + ' todo-list'}>
      {todos.map(item =>
          <Todo
            key={item.id}
            id={item.id}
            cls={item.cls}
            todo={item}
            onDeleteTodo={props.onDeleteTodo}
            onSetStatus={props.onSetStatus}
          />
        )}
    </ul>
  );
}

export default TodoList;
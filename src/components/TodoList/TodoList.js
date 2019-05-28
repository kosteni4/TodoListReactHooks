import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';

import './TodoList.scss';

function TodoList(props) {

  const todos = props.todos || 0;

  useEffect(() => {
    document.title = todos
      ? todos.length > 1
        ? todos.length + ' tasks'
        : todos.length + ' task'
      : '0 task';
  });

  return (
    <ul className='todo-list'>
      {todos.map(item =>
        <Todo
          key={item.id}
          id={item.id}
          cls={item.cls}
          paragraph={item.paragraph}
        />
      )}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object)
};

export default TodoList;
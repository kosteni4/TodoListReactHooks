import React, { useState, useRef, useEffect } from 'react';

import './Todo.scss';

function Todo(props) {
  const [status, setStatus] = useState(props.todo.status);
  const [paragraph, editTodo] = useState(props.todo.paragraph);
  const [isChecked, toggleTodo] = useState(false);
  const [classActive, toggleTodoClass] = useState('');

  useEffect(() => {
    if (status === 'completed') {
      toggleTodo(true);
      toggleTodoClass('js-active');
    }
  }, [status]);

  const inputRef = useRef(null);

  function handlerFocusTodo() {
    inputRef.current.focus();
  }

  function handlerEditTodo() {
    editTodo(inputRef.current.value);
  }

  function handlerBlurTodo(event) {
    if (event.keyCode === 13 || event.keyCode === 27) {
      inputRef.current.blur();
    }
  }

  function handlerToggleTodo() {
    toggleTodo(!isChecked);
    toggleTodoClass(!isChecked ? 'js-active' : '');
    setStatus(!isChecked ? 'completed' : 'actived');
  }

  function handlerDeleteTodo() {
    props.onDeleteTodo(props.id);
  }

  return (
    <li className={props.cls + ' todo ' + classActive}>
      <label className='todo__wrapper-checkbox'>
        <input
          className='todo__checkbox'
          type='checkbox'
          checked={isChecked}
          onChange={handlerToggleTodo}
        />
        <span className='todo__checkmark'></span>
      </label>
      <input
        className='todo__paragraph'
        type='text'
        ref={inputRef}
        value={paragraph}
        onChange={handlerEditTodo}
        onKeyDown={handlerBlurTodo}
      />
      <button
        className='todo__btn btn btn--edit'
        onClick={handlerFocusTodo}>
          Edit
      </button>
      <button
        className='todo__btn btn btn--del'
        onClick={handlerDeleteTodo}>
          Delete
      </button>
    </li>
  );
}

export default Todo;

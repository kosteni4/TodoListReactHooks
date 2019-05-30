import React, { useState } from 'react';

import './AddTodo.scss';

function AddTodo({ onAddTodo }) {
  const [value, setValue] = useState('');

  function handlerChange(event) {
    setValue(event.target.value);
  }

  function handlerSubmit(event) {
    event.preventDefault();

    if (value.trim()) {
      onAddTodo(value);
      setValue('');
    }
  }

  return (
    <form
      className='add-todo'
      onSubmit={handlerSubmit}>
      <input
        type='text'
        className='add-todo__input'
        placeholder='Your task...'
        value={value}
        onChange={handlerChange} />
      <button
        type='submit'
        className='add-todo__btn btn btn--add'>
        Add
      </button>
    </form>
  );
}

export default AddTodo;

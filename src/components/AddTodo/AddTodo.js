import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './AddTodo.scss';

function AddTodo({ addTodo }) {
  const [value, setValue] = useState('');

  function handlerChange(event) {
    setValue(event.target.value);
  }

  function handlerSubmit(event) {
    event.preventDefault();

    if (value.trim()) {
      addTodo(value);
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

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default AddTodo;

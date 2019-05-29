import React from 'react';

import './FilterTodos.scss';

function FilterTodos({ filters, onFilter }) {

  function handlerFilter(event) {
    onFilter(event.target.name)
  }

  return (
    <div className="filter-todos">
      {
        filters.map(btn =>
          <button
            type='text'
            key={btn.id}
            className={btn.cls}
            name={btn.name}
            onClick={handlerFilter}>
              {btn.text}
          </button>
        )
      }
      {/* <a href='/' className='filter-todos__link js-active'>All</a>
      <a href='/active' className='filter-todos__link'>Active</a>
      <a href='/completed' className='filter-todos__link'>Completed</a>
      <a href='/deteted' className='filter-todos__link'>Deleted</a> */}
    </div>
  );
}

export default FilterTodos;
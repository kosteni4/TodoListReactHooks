import React from 'react';

import './FilterTodos.scss';

function FilterTodos() {
  return (
    <div className="filter-todos">
      <a href='/' className='filter-todos__link js-active'>All</a>
      <a href='/active' className='filter-todos__link'>Active</a>
      <a href='/completed' className='filter-todos__link'>Completed</a>
      <a href='/deteted' className='filter-todos__link'>Deleted</a>
    </div>
  );
}

export default FilterTodos;